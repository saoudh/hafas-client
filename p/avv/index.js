'use strict'

const baseProfile = require('./base.json')
const _parseJourney = require('../../parse/journey')
const { parseHook } = require('../../lib/profile-hooks')

const parseJourneyWithTickets = ({ parsed }, j) => {
	const parsedCpy = { ...parsed, price: j.trfRes?.totalPrice?.amount };

	return parsedCpy;
}

const products = [{
	id: 'regional-train',
	mode: 'train',
	bitmasks: [1],
	name: 'Regionalzug',
	short: 'Regionalzug',
	default: true,
}, {
	id: 'long-distance-train',
	mode: 'train',
	bitmasks: [2],
	name: 'Fernzug',
	short: 'Fernzug',
	default: true,
}, {
	id: 'express-train',
	mode: 'train',
	bitmasks: [4],
	name: 'ICE/Thalys',
	short: 'ICE/Thalys',
	default: true,
}, {
	id: 'fernbus',
	mode: 'bus',
	bitmasks: [8],
	name: 'Fernbus',
	short: 'Fernbus',
	default: true,
}, {
	id: 'suburban-train',
	mode: 'train',
	bitmasks: [16],
	name: 'S-Bahn',
	short: 'S',
	default: true,
}, {
	id: 'subway',
	mode: 'train',
	bitmasks: [32],
	name: 'U-Bahn',
	short: 'U',
	default: true,
}, {
	id: 'tram',
	mode: 'train',
	bitmasks: [64],
	name: 'Straßenbahn',
	short: 'Straßenbahn',
	default: true,
}, {
	id: 'bus',
	mode: 'bus',
	bitmasks: [128],
	name: 'Bus',
	short: 'Bus',
	default: true,
}, {
	id: 'added-bus',
	mode: 'bus',
	bitmasks: [256],
	name: 'Bus, Verstärkerfahrt',
	short: 'Bus V',
	default: true,
}, {
	id: 'on-call',
	mode: 'taxi',
	bitmasks: [512],
	name: 'Bedarfsverkehr',
	short: 'Bedarfsverkehr',
	default: true,
}, {
	id: 'ferry',
	mode: 'watercraft',
	bitmasks: [1024],
	name: 'Fähre',
	short: 'Fähre',
	default: true,
}]

const avvProfile = {
	...baseProfile,
	locale: 'de-DE',
	timezone: 'Europe/Berlin',
	ver: '1.26',

	products,
	parseJourney: parseHook(_parseJourney, parseJourneyWithTickets),
	departuresGetPasslist: false,
	departuresStbFltrEquiv: false,
	refreshJourneyUseOutReconL: true,
	trip: true,
	radar: true,
	reachableFrom: true,
	remarks: true,
	remarksGetPolyline: false,
}

module.exports = avvProfile
