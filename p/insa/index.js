'use strict'

const baseProfile = require('./base.json')
const products = require('./products')
const _parseJourney = require('../../parse/journey')
const { parseHook } = require('../../lib/profile-hooks')

import {formatLocationIdentifier} from '../../format/location-identifier.js';

const formatStation = (id) => {
	return {
		// type: 'S', // station
		// todo: name necessary?
		lid: formatLocationIdentifier({
			A: '1', // station?
			L: id,
			// todo: `p` – timestamp of when the ID was obtained
		}),
	};
};

const parseJourneyWithTickets = ({ parsed }, j) => {
	const parsedCpy = { ...parsed, price: j.trfRes?.totalPrice?.amount };

	return parsedCpy;
}

const insaProfile = {
	...baseProfile,
	locale: 'de-DE',
	timezone: 'Europe/Berlin',

	products: products,
	formatStation,
	parseJourney: parseHook(_parseJourney, parseJourneyWithTickets),

	departuresGetPasslist: false,
	departuresStbFltrEquiv: false,
	trip: true,
	radar: true,
	refreshJourneyUseOutReconL: true,
	reachableFrom: true,
}

module.exports = insaProfile;
