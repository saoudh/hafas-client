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

	products,
	parseJourney: parseHook(_parseJourney, parseJourneyWithTickets),

	departuresGetPasslist: false,
	departuresStbFltrEquiv: false,
	refreshJourneyUseOutReconL: true,
	trip: true,
	radar: true,
	refreshJourney: true,
	reachableFrom: true,
}

module.exports = hvvProfile
