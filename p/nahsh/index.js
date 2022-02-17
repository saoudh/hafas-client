'use strict'

const {parseHook} = require('../../lib/profile-hooks')

const _parseLocation = require('../../parse/location')
const _parseJourney = require('../../parse/journey')
const _parseMovement = require('../../parse/movement')
const baseProfile = require('./base.json')
const products = require('./products')

// todo: journey prices

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
		/* there might be always just one element in the fareSetL-Array, which is the SH-Tariff
		retrieving price for the single ticket for basic 2nd class if available, otherwise "undefined"
		*/
		let singleTicket = j.trfRes.fareSetL[0].fareL.find(ticketType => ticketType.name === "Einzelkarte 2.Kl");
		let price = singleTicket?.price?.amount;
		const parsedCpy = { ...parsed, price: price };
		return parsedCpy;

		// parsed.tickets = []

		// for (let t of j.trfRes.fareSetL) {
		// 	const tariff = t.desc
		// 	if (!tariff || !Array.isArray(t.fareL)) continue
		// 	for (let v of t.fareL) {
		// 		const variant = v.name
		// 		if(!variant) continue
		// 		const ticket = {
		// 			name: [tariff, variant].join(' - '),
		// 			tariff,
		// 			variant
		// 		}
		// 		if (v.prc && Number.isInteger(v.prc) && v.cur) {
		// 			ticket.amount = v.prc/100
		// 			ticket.currency = v.cur
		// 		} else {
		// 			ticket.amount = null
		// 			ticket.hint = 'No pricing information available.'
		// 		}
		// 		parsed.tickets.push(ticket)
		// 	}
		// }
	}

	// return parsed
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

	products,

	parseLocation: parseHook(_parseLocation, fixLocation),
	parseJourney: parseHook(_parseJourney, parseJourneyWithTickets),
	parseMovement: parseHook(_parseMovement, fixMovement),

	departuresGetPasslist: false,
	departuresStbFltrEquiv: false,
	refreshJourneyUseOutReconL: true,
	trip: true,
	radar: true,
	reachableFrom: true,
}

module.exports = nahshProfile
