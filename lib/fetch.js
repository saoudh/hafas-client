'use strict'

const DEV = process.env.NODE_ENV === 'dev'

const ProxyAgent = require('https-proxy-agent')
const {isIP} = require('net')
const {Agent: HttpsAgent} = require('https')
const roundRobin = require('@derhuerst/round-robin-scheduler')
const captureStackTrace = DEV ? require('capture-stack-trace') : () => {}
const {stringify} = require('qs')
const Promise = require('pinkie-promise')
const {fetch} = require('fetch-ponyfill')({Promise})
const {parse: parseContentType} = require('content-type')
const randomizeUserAgent = require('./randomize-user-agent')

const proxyAddress = process.env.HTTPS_PROXY || process.env.HTTP_PROXY || null
const localAddresses = process.env.LOCAL_ADDRESS || null

if (proxyAddress && localAddresses) {
	console.error('Both env vars HTTPS_PROXY/HTTP_PROXY and LOCAL_ADDRESS are not supported.')
	process.exit(1)
}
let getAgent = () => null
if (proxyAddress) {
	const agent = new ProxyAgent(proxyAddress)
	getAgent = () => agent
} else if (localAddresses) {
	const agents = process.env.LOCAL_ADDRESS.split(',')
	.map((addr) => {
		const family = isIP(addr)
		if (family === 0) throw new Error('invalid local address:' + addr)
		return new HttpsAgent({addr, family})
	})
	const pool = roundRobin(agents)
	getAgent = () => pool.get()
}

const fetchFromHafas = async (ctx, userAgent, resource, req, opt = {}) => {
	const {profile} = ctx
	const {
		throwIfNotOk,
	} = {
		throwIfNotOk: true,
	}

	req = profile.transformReq(ctx, {
		agent: getAgent(),
		redirect: 'follow',
		query: {},
		...req,
		headers: {
			'Accept-Encoding': 'gzip, br, deflate',
			'user-agent': randomizeUserAgent(userAgent),
			...(req.headers || {}),
		},
	})

	const url = resource + '?' + stringify(req.query)
	delete req.query // not part of the fetch() spec

	// Async stack traces are not supported everywhere yet, so we create our own.
	// todo: DRY with ./request.js & ./rest-request.js
	const err = new Error()
	err.isHafasError = true // todo [breaking]: rename to `isHafasClientError`
	err.request = req.body
	err.fetchRequest = req // todo [breaking]: rename to `request`
	err.url = url
	captureStackTrace(err)

	const res = await fetch(url, req)

	err.statusCode = res.status
	err.fetchResponse = res // todo [breaking] rename to `response`

	if (throwIfNotOk && !res.ok) {
		err.message = res.statusText
		throw err
	}

	const cType = res.headers.get('content-type')
	if (cType) {
		const {type} = parseContentType(cType)
		if (type !== 'application/json') {
			err.message = 'invalid response content-type: ' + cType
			err.response = res // todo [breaking]: remove, there is `fetchResponse`
			throw err
		}
	}

	const body = await res.json()
	return {
		res,
		body,
	}
}

module.exports = fetchFromHafas
