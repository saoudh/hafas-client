'use strict'

const baseProfile = require('./base.json')
const products = require('./products')
const _parseJourney = require('../../parse/journey')
const { parseHook } = require('../../lib/profile-hooks')

const parseJourneyWithTickets = ({ parsed }, j) => {
	const parsedCpy = { ...parsed, price: j.trfRes?.totalPrice?.amount };

	return parsedCpy;
}

const insaProfile = {
	...baseProfile,
	locale: 'de-DE',
	timezone: 'Europe/Berlin',

	products: products,
	parseJourney: parseHook(_parseJourney, parseJourneyWithTickets),

	departuresGetPasslist: false,
	departuresStbFltrEquiv: false,
	trip: true,
	radar: true,
	refreshJourneyUseOutReconL: true,
	reachableFrom: true,
}

module.exports = insaProfile;
