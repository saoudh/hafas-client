'use strict'

const baseProfile = require('./base.json')
const products = require('./products')
const _parseJourney = require('../../parse/journey')
const { parseHook } = require('../../lib/profile-hooks')

const parseJourneyWithTickets = ({ parsed }, j) => {
	const parsedCpy = { ...parsed, price: j.trfRes?.totalPrice?.amount };

	return parsedCpy;
}

const nvvProfile = {
	...baseProfile,
	locale: 'de-DE',
	timezone: 'Europe/Berlin',

	products: products,
	parseJourney: parseHook(_parseJourney, parseJourneyWithTickets),

	departuresGetPasslist: false,
	departuresStbFltrEquiv: false,
	refreshJourneyUseOutReconL: true,
	trip: true,
	radar: true,
	reachableFrom: true,
}

module.exports = nvvProfile
