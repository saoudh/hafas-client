'use strict'

const baseProfile = require('./base.json')
const products = require('./products')
const _parseJourney = require('../../parse/journey')
const { parseHook } = require('../../lib/profile-hooks')
const parseJourneyWithTickets = require('../../parse/journey-with-price')


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
