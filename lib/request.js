'use strict'

const DEV = process.env.NODE_ENV === 'dev'
const DEBUG = /(^|,)hafas-client(,|$)/.test(process.env.DEBUG || '')

const createHash = require('create-hash')
const pick = require('lodash/pick')
const {stringify} = require('qs')
const captureStackTrace = DEV ? require('capture-stack-trace') : () => {}
const fetchFromHafas = require('./fetch')
const {addErrorInfo} = require('./errors')

const md5 = input => createHash('md5').update(input).digest()

const request = async (ctx, userAgent, reqData) => {
	const {profile, opt} = ctx

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
	if (DEBUG) console.error(JSON.stringify(body))

	const req = profile.transformReq(ctx, {
		method: 'post',
		// todo: CORS? referrer policy?
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		},
	})

	if (profile.addChecksum || profile.addMicMac) {
		if (!Buffer.isBuffer(profile.salt) && 'string' !== typeof profile.salt) {
			throw new TypeError('profile.salt must be a Buffer or a string.')
		}
		// Buffer.from(buf, 'hex') just returns buf
		const salt = Buffer.from(profile.salt, 'hex')

		if (profile.addChecksum) {
			const checksum = md5(Buffer.concat([
				Buffer.from(req.body, 'utf8'),
				salt,
			]))
			req.query.checksum = checksum.toString('hex')
		}
		if (profile.addMicMac) {
			const mic = md5(Buffer.from(req.body, 'utf8'))
			req.query.mic = mic.toString('hex')

			const micAsHex = Buffer.from(mic.toString('hex'), 'utf8')
			const mac = md5(Buffer.concat([micAsHex, salt]))
			req.query.mac = mac.toString('hex')
		}
	}

	// Async stack traces are not supported everywhere yet, so we create our own.
	// todo: DRY with ./fetch.js
	const err = new Error()
	err.isHafasError = true // todo [breaking]: rename to `isHafasClientError`
	err.request = req.body
	err.fetchRequest = req // todo [breaking]: rename to `request`
	err.url = profile.endpoint + '?' + stringify(req.query)
	captureStackTrace(err)

	const {body: b} = await fetchFromHafas(ctx, userAgent, profile.endpoint, req)

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
		common: profile.parseCommon({...ctx, res})
	}
}

module.exports = request
