'use strict'

const baseProfile = require('./base.json')
const products = require('./products')
const _parseJourney = require('../../parse/journey')
const { parseHook } = require('../../lib/profile-hooks')

const parseJourneyWithTickets = ({ parsed }, j) => {
	const parsedCpy = { ...parsed, price: j.trfRes?.totalPrice?.amount };
	return parsedCpy;
}
const hvvProfile = {
	...baseProfile,
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	// baseProfile.salt is interpreted as hex by hafas-client
	salt: Buffer.from('pqjM3iKEGOAhYbX76k9R5zutv', 'utf8'),
	addMicMac: true,

	products,
	parseJourney: parseHook(_parseJourney, parseJourneyWithTickets),

	trip: true,
	radar: true,
	refreshJourney: true,
	reachableFrom: true,
	remarksGetPolyline: false,
	lines: false, // fails with `FAIL` "HCI Service: request failed"
}

module.exports = hvvProfile
