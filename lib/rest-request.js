'use strict'

const DEV = process.env.NODE_ENV === 'dev'
const DEBUG = /(^|,)hafas-client(,|$)/.test(process.env.DEBUG || '')

const {stringify} = require('qs')
const captureStackTrace = DEV ? require('capture-stack-trace') : () => {}
const fetchFromHafas = require('./fetch')
const {byErrorCode} = require('./rest-exe-errors')
const findInTree = require('./find-in-tree')

const request = async (ctx, userAgent, method, query) => {
	const {profile, opt, token} = ctx

	query = {
		lang: opt.language || 'en',
		...query,
	}
	const req = profile.transformReq(ctx, {
		// todo: CORS? referrer policy?
		body: null,
		query,
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': 'Bearer ' + token,
		},
	})
	if (DEBUG) console.error(JSON.stringify(req.query))

	// Async stack traces are not supported everywhere yet, so we create our own.
	// todo: DRY with ./fetch.js & ./request.js
	const err = new Error()
	err.isHafasError = true // todo [breaking]: rename to `isHafasClientError`
	err.request = req.query
	err.fetchRequest = req // todo [breaking]: rename to `request`
	err.url = profile.endpoint + method + '?' + stringify(req.query)
	captureStackTrace(err)

	const {
		res,
		body,
	} = await fetchFromHafas(ctx, userAgent, profile.endpoint + method, req, {
		throwIfNotOk: false,
	})

	if (!res.ok) {
		if (DEBUG) console.error(JSON.stringify(body))

		// todo: parse HTML error messages
		err.message = res.statusText
		err.statusCode = res.status

		const {errorCode, errorText} = body
		if (errorCode && byErrorCode[errorCode]) {
			Object.assign(err, byErrorCode[errorCode])
			err.hafasErrorCode = errorCode
			if (errorText) err.hafasErrorMessage = errorText
		} else {
			err.message = errorText
			err.code = errorCode
		}

		throw err
	}

	// todo: sometimes it returns a body without any data
	// e.g. `location.nearbystops` with an invalid `type`

	const mapping = {
		'**.Stops.Stop': 'stops',
		'**.Names.Name': 'products',
		'**.Directions.Direction': 'directions',
		'**.JourneyDetailRef.ref': 'ref',
		'**.Notes.Note': 'notes',
		'**.LegList.Leg': 'legs',
		'**.ServiceDays[0]': 'serviceDays',
	}

	const allMatches = findInTree(Object.keys(mapping))(body)
	for (const [needle, matches] of Object.entries(allMatches)) {
		const newKey = mapping[needle]

		for (const [item, parents] of matches) {
			const grandParent = parents[1]
			grandParent[newKey] = item
		}
	}

	if (DEBUG) console.error(JSON.stringify(body))

	return {
		res: body,
	}
}

module.exports = request
