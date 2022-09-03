'use strict'

const tap = require('tap')

const {createWhen} = require('./lib/util')
const createClient = require('../..')
const tpgProfile = require('../../p/tpg')
const createValidate = require('./lib/validate-fptf-with')
const testJourneysStationToAddress = require('./lib/journeys-station-to-address')

const T_MOCK = 1641897000 * 1000 // 2022-01-11T11:30:00+01
const when = createWhen(tpgProfile.timezone, tpgProfile.locale, T_MOCK)

const cfg = {
	when,
	stationCoordsOptional: false,
	products: tpgProfile.products,
	minLatitude: 45.3184,
	minLongitude: 4.4604,
	maxLatitude: 47.2969,
	maxLongitude: 7.8607,
}

const validate = createValidate(cfg)

const client = createClient(tpgProfile, 'public-transport/hafas-client:test')

const moillebeau = '100451'

tap.test('Moillebeau to Cours des Bastions 10', async (t) => {
	const coursDesBastions10 = {
		type: 'location',
		id: '990001624',
		address: 'Cours des Bastions 10, 1205 Genève',
		latitude: 46.197768,
		longitude: 6.148046,
	}

	const res = await client.journeys(moillebeau, coursDesBastions10, {
		results: 3,
		departure: when,
	})

	await testJourneysStationToAddress({
		test: t,
		res,
		validate,
		fromId: moillebeau,
		to: coursDesBastions10,
	})
	t.end()
})
