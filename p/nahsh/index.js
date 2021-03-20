'use strict'

const baseProfile = require('./base.json')
const {parseHook} = require('../../lib/profile-hooks')

const _parseLocation = require('../../parse/location')
const _parseJourney = require('../../parse/journey')
const _parseMovement = require('../../parse/movement')
const products = require('./products')

// todo: journey prices

const transformReqBody = (ctx, body) => {
	body.lang = 'de'

	return body
}

const fixLocation = ({parsed}, l) => {
	// weird fix for empty lines, e.g. IC/EC at Flensburg Hbf
	if (parsed.lines) {
		parsed.lines = parsed.lines.filter(x => x.id && x.name)
	}

	// remove leading zeroes, todo
	if (parsed.id && parsed.id.length > 0) {
		parsed.id = parsed.id.replace(/^0+/, '')
	}

	return parsed
}

const parseJourneyWithTickets = ({parsed}, j) => {
	if (
		j.trfRes &&
		Array.isArray(j.trfRes.fareSetL) &&
		j.trfRes.fareSetL.length > 0
	) {
		parsed.tickets = []

		for (let t of j.trfRes.fareSetL) {
			const tariff = t.desc
			if (!tariff || !Array.isArray(t.fareL)) continue
			for (let v of t.fareL) {
				const variant = v.name
				if(!variant) continue
				const ticket = {
					name: [tariff, variant].join(' - '),
					tariff,
					variant
				}
				if (v.prc && Number.isInteger(v.prc) && v.cur) {
					ticket.amount = v.prc/100
					ticket.currency = v.cur
				} else {
					ticket.amount = null
					ticket.hint = 'No pricing information available.'
				}
				parsed.tickets.push(ticket)
			}
		}
	}

	return parsed
}

const fixMovement = ({parsed}, m) => {
	// filter out empty nextStopovers entries
	parsed.nextStopovers = parsed.nextStopovers.filter((f) => {
		return f.stop !== null || f.arrival !== null || f.departure !== null
	})
	return parsed
}

const nahshProfile = {
	...baseProfile,

	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	transformReqBody,

	products,

	parseLocation: parseHook(_parseLocation, fixLocation),
	parseJourney: parseHook(_parseJourney, parseJourneyWithTickets),
	parseMovement: parseHook(_parseMovement, fixMovement),

	trip: true,
	radar: true, // todo: see #34
	reachableFrom: true,
	remarks: false, // seems like ver >= 1.20 is required
}

module.exports = nahshProfile
