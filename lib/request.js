'use strict'

const DEV = process.env.NODE_ENV === 'dev'
const DEBUG = /(^|,)hafas-client(,|$)/.test(process.env.DEBUG || '')

const ProxyAgent = require('http-proxy-agent')
const { isIP } = require('net')
const { Agent: HttpsAgent } = require('http')
const https = require('https')

const roundRobin = require('@derhuerst/round-robin-scheduler')
const { randomBytes } = require('crypto')
const createHash = require('create-hash')
const pick = require('lodash/pick')
const captureStackTrace = DEV ? require('capture-stack-trace') : () => { }
const { stringify } = require('qs')
const Promise = require('pinkie-promise')
const { fetch } = require('fetch-ponyfill')({ Promise })
const { parse: parseContentType } = require('content-type')
const { addErrorInfo } = require('./errors')
const fs = require('fs');

const proxyAddress = process.env.HTTPS_PROXY || process.env.HTTP_PROXY || null
const localAddresses = process.env.LOCAL_ADDRESS || null

const SIMPLE_PROXYING_SERVER_URL = process.env.SIMPLE_PROXYING_SERVER_URL ?  process.env.SIMPLE_PROXYING_SERVER_URL :
"https://cr-proxy.cleverreach.net/simpleProxying";// "http://localhost:5005/geocoding";


if (proxyAddress && localAddresses) {
	console.error('Both env vars HTTPS_PROXY/HTTP_PROXY and LOCAL_ADDRESS are not supported.')
	process.exit(1)
}

const plainAgent = new HttpsAgent({
	keepAlive: true,
})
const plainAgent2 = new https.Agent({
	keepAlive: true,
})
let getAgent = () => plainAgent
let getAgent2 = () => plainAgent2

if (proxyAddress) {
	// todo: this doesn't honor `keepAlive: true`
	// related:
	// - https://github.com/TooTallNate/node-https-proxy-agent/pull/112
	// - https://github.com/TooTallNate/node-agent-base/issues/5
	const agent = new ProxyAgent(proxyAddress)
	getAgent = () => agent
} else if (localAddresses) {
	const agents = process.env.LOCAL_ADDRESS.split(',')
		.map((addr) => {
			const family = isIP(addr)
			if (family === 0) throw new Error('invalid local address:' + addr)
			return new HttpsAgent({
				localAddress: addr, family,
				keepAlive: true,
			})
		})
	const pool = roundRobin(agents)
	getAgent = () => pool.get()
}

const id = randomBytes(3).toString('hex')
const randomizeUserAgent = (userAgent) => {
	let ua = userAgent
	for (
		let i = Math.round(5 + Math.random() * 5);
		i < ua.length;
		i += Math.round(5 + Math.random() * 5)
	) {
		ua = ua.slice(0, i) + id + ua.slice(i)
		i += id.length
	}
	return ua
}

const md5 = input => createHash('md5').update(input).digest()

// var requestCount = 0;

// function readProxyListFromFile() {
// 	let proxies;
// 	try {
// 		proxies = fs.readFileSync(process.cwd() + '/node_modules/hafas-client/lib/proxy.txt').toString().split("\n")
// 	} catch {
// 		console.log('proxy txt file not found');
// 	}
// 	return proxies;
// }

// function addProxyToBlacklistFile(proxy) {
// 	try {
// 		fs.appendFileSync(process.cwd() + '/node_modules/hafas-client/lib/proxy_blacklist.txt', proxy + "\n");
// 	} catch {
// 		console.log('not working proxy couldnt be added to blacklist')
// 	}

// }

// function sendEmailAboutFailedProxyServer(proxy) {
// 	var nodemailer = require('nodemailer');

// 	// var transporter = nodemailer.createTransport({
// 	// 	service: 'gmail',
// 	// 	auth: {
// 	// 		user: 'cleverroutelogger@gmail.com',
// 	// 		pass: 'mycleverroutelogger'
// 	// 	}
// 	// });
// 	let email = "mycleverroutelogger@yahoo.com"
// 	let pass = "k7aTggaWTZbvVvU"
// 	let transporter = nodemailer.createTransport({
// 		service: 'yahoo',
// 		auth: {
// 			user: email,
// 			pass: pass
// 		}
// 	});
// 	var mailOptions = {
// 		from: 'mycleverroutelogger@yahoo.com',
// 		to: 'hussam.saoud@ecolibro.de',
// 		subject: 'Proxy-Server ' + proxy + ' not working',
// 		text: 'Proxy-Server ' + proxy + ' not working'
// 	};

// 	transporter.sendMail(mailOptions, function (error, info) {
// 		if (error) {
// 			console.log(error);
// 		} else {
// 			console.log('Email sent: ' + info.response);
// 		}
// 	});
// }

// var proxies = readProxyListFromFile();

// function getNextProxyId() {
// 	const nextProxy = requestCount % proxies.length;
// 	console.log("proxylength=", proxies.length, "nextproxies:", nextProxy)

// 	requestCount = requestCount + 1;
// 	return nextProxy;

// }
// function getNextProxy() {
// 	const id = getNextProxyId();
// 	return proxies[id];
// }

// building a dict with proxy-url as key and the count of its usage
// let proxyUsage = {};
// proxies.forEach(url => proxyUsage[url] = 0);

// todo [breaking]: remove userAgent parameter
const request = (ctx, userAgent, reqData) => {
	const { profile, opt } = ctx

	const body = profile.transformReqBody(ctx, {
		// todo: is it `eng` actually?
		// RSAG has `deu` instead of `de`
		lang: opt.language || profile.defaultLanguage || 'en',
		svcReqL: [reqData]
	})
	Object.assign(body, pick(profile, [
		'client', // client identification
		'ext', // ?
		'ver', // HAFAS protocol version
		'auth', // static authentication
	]))
	// const currentProxyIP = getNextProxy();
	// const proxyAgent = getAgent() //new HttpProxyAgent(currentProxyIP);//getAgent();
	const proxyAgent2 = getAgent2() //new HttpProxyAgent(currentProxyIP);//getAgent();

	const req2 = profile.transformReq(ctx, {
		agent: proxyAgent2,
		method: 'post',
		// todo: CORS? referrer policy?
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			'Accept-Encoding': 'gzip, br, deflate',
			'Accept': 'application/json',
			'user-agent': randomizeUserAgent(userAgent),
			'connection': 'keep-alive', // prevent excessive re-connecting
		},
		redirect: 'follow',
		query: {}
	})
	// const req = currentProxyIP ? profile.transformReq(ctx, {
	// 	agent: proxyAgent,
	// 	method: 'post',
	// 	// todo: CORS? referrer policy?
	// 	body: JSON.stringify(body),
	// 	headers: {
	// 		'Authorization': 'cleverroute',
	// 		'Content-Type': 'application/json',
	// 		'Accept-Encoding': 'gzip, br, deflate',
	// 		'Accept': 'application/json',
	// 		'user-agent': randomizeUserAgent(userAgent),
	// 		'connection': 'keep-alive', // prevent excessive re-connecting
	// 	},
	// 	redirect: 'follow',
	// 	query: {}
	// }) : req2;
	if (DEBUG) console.error(req2.body)
	// if (profile.addChecksum || profile.addMicMac) {
	// 	if (!Buffer.isBuffer(profile.salt) && 'string' !== typeof profile.salt) {
	// 		throw new TypeError('profile.salt must be a Buffer or a string.')
	// 	}
	// 	// Buffer.from(buf, 'hex') just returns buf
	// 	const salt = Buffer.from(profile.salt, 'hex')

	// 	if (profile.addChecksum) {
	// 		const checksum = md5(Buffer.concat([
	// 			Buffer.from(req.body, 'utf8'),
	// 			salt,
	// 		]))
	// 		req.query.checksum = checksum.toString('hex')
	// 	}
	// 	if (profile.addMicMac) {
	// 		const mic = md5(Buffer.from(req.body, 'utf8'))
	// 		req.query.mic = mic.toString('hex')

	// 		const micAsHex = Buffer.from(mic.toString('hex'), 'utf8')
	// 		const mac = md5(Buffer.concat([micAsHex, salt]))
	// 		req.query.mac = mac.toString('hex')
	// 	}
	// }


	if (profile.addChecksum || profile.addMicMac) {
		if (!Buffer.isBuffer(profile.salt) && 'string' !== typeof profile.salt) {
			throw new TypeError('profile.salt must be a Buffer or a string.')
		}
		// Buffer.from(buf, 'hex') just returns buf
		const salt = Buffer.from(profile.salt, 'hex')

		if (profile.addChecksum) {
			const checksum = md5(Buffer.concat([
				Buffer.from(req2.body, 'utf8'),
				salt,
			]))
			req2.query.checksum = checksum.toString('hex')
		}
		if (profile.addMicMac) {
			const mic = md5(Buffer.from(req2.body, 'utf8'))
			req2.query.mic = mic.toString('hex')

			const micAsHex = Buffer.from(mic.toString('hex'), 'utf8')
			const mac = md5(Buffer.concat([micAsHex, salt]))
			req2.query.mac = mac.toString('hex')
		}
	}
	let url = SIMPLE_PROXYING_SERVER_URL + "?" + new URLSearchParams({ ...req2.query, targetUrl: profile.endpoint }).toString();

	const url2 = profile.endpoint + '?' + stringify(req2.query)
	// url = currentProxyIP ? currentProxyIP + '/' + stringify(req.query) + `?target=${encodeURIComponent(profile.endpoint)}` : url2;
	// }
	// Async stack traces are not supported everywhere yet, so we create our own.
	const err = new Error()
	err.isHafasError = true // todo: rename to `isHafasClientError`
	err.request = req2.body // todo: commit as bugfix
	err.url = url
	captureStackTrace(err)
	const controller = new AbortController()

	// start timer and call handling for unavailablity of the server if it timeouts without response
	const timeoutId = setTimeout(() => {
		controller.abort()
	}, 30000);

	console.log("before fetching simpleProxying...-params=", new URLSearchParams({ ...req2.query, targetUrl: profile.endpoint }))
	return fetch(url, {
		signal: controller.signal,
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	}).then(res => { 
		// console.log("API-fetching-res:", res); return res }).then((res) => {
		return computeJsonOfResponse(res, err);
	})
		.then((b) => {
			clearTimeout(timeoutId);
			return parseJsonResponse(b, err, profile, ctx);
		})
		// for the case of proxy-server-client failure use HAFAS directly
		.catch(err => {
			return undefined;
		});


}

function handleAvailabilityOfServer(currentProxyIP) {
	const controller = new AbortController()
	let index = proxies.findIndex((ip) => ip === currentProxyIP);

	const timeoutId = setTimeout(() => {
		console.log(' --- ABORTING REQUEST --- ' + currentProxyIP); controller.abort();
		if (index >= 0) {
			let deletedProxy = proxies.splice(index, 1);
			console.log('deleting proxy in timeout: ', deletedProxy, " - resulting proxy-list: ", proxies);

			addProxyToBlacklistFile(currentProxyIP);
			// sendEmailAboutFailedProxyServer(currentProxyIP);
		}

	}, 10000)
	fetch(currentProxyIP, { signal: controller.signal })
		.then((res) => {
			if (!res || String(res.status) !== "403") {
				console.log("Proxy ", currentProxyIP, " is not reachable, code ", res.status)
				let deletedProxy = proxies.splice(index, 1);
				console.log('deleting proxy in fetching: ', deletedProxy, " - resulting proxy-list: ", proxies);
			} else {
				console.log("Proxy ", currentProxyIP, " is reachable, code ", res.status);
				clearTimeout(timeoutId);

			}

			console.log("plain result ", res.status, res.statusText, res.statusCode)

			return res.body;
		})
		.catch(err => console.log("proxy not reachable", err))
}

function computeJsonOfResponse(res, err) {
	err.statusCode = res.status
	if (!res.ok) {
		err.message = res.statusText
		throw err
	}

	let cType = res.headers.get('content-type')
	if (cType) {
		const { type } = parseContentType(cType)
		if (type !== 'application/json') {
			const err = new Error('invalid response content-type: ' + cType)
			err.response = res
			throw err
		}
	}
	return res.json()
}

function parseJsonResponse(b, err, profile, ctx) {
	if (DEBUG) console.error(JSON.stringify(b))

	if (b.err && b.err !== 'OK') {
		addErrorInfo(err, b.err, b.errTxt, b.id)
		throw err
	}
	if (!b.svcResL || !b.svcResL[0]) {
		err.message = 'invalid response'
		throw err
	}
	if (b.svcResL[0].err !== 'OK') {
		addErrorInfo(err, b.svcResL[0].err, b.svcResL[0].errTxt, b.id)
		throw err
	}

	const res = b.svcResL[0].res
	return {
		res,
		common: profile.parseCommon({ ...ctx, res })
	}
}
module.exports = request
