'use strict'

const tap = require('tap')

const {createWhen} = require('./lib/util')
const createClient = require('../..')
const svvProfile = require('../../p/svv')
const products = require('../../p/svv/products')
const createValidate = require('./lib/validate-fptf-with')
const testJourneysStationToStation = require('./lib/journeys-station-to-station')
const testArrivals = require('./lib/arrivals')
const testReachableFrom = require('./lib/reachable-from')
const testServerInfo = require('./lib/server-info')

const T_MOCK = 1641897000 * 1000 // 2022-01-11T11:30:00+01
const when = createWhen(svvProfile.timezone, svvProfile.locale, T_MOCK)

const cfg = {
	when,
	stationCoordsOptional: false,
	products,
	minLatitude: 45.742,
	maxLatitude: 49.41,
	minLongitude: 8.177,
	maxLongitude: 18.448,
}

const validate = createValidate(cfg)

const client = createClient(svvProfile, 'public-transport/hafas-client:test')

const sam = '455086100'
const volksgarten = '455082100'
const zillnerstr2 = {
	type: 'location',
	id: '980133209',
	address: 'Zillnerstraße 2, 5020 Salzburg',
	latitude: 47.801434, longitude: 13.031006,
}

tap.test('journeys – Sam to Volksgarten', async (t) => {
	const res = await client.journeys(sam, volksgarten, {
		results: 4,
		departure: when,
		stopovers: true
	})

	await testJourneysStationToStation({
		test: t,
		res,
		validate,
		fromId: sam,
		toId: volksgarten
	})
	t.end()
})

// todo: via works – with detour
// todo: without detour

tap.test('trip details', async (t) => {
	const res = await client.journeys(sam, volksgarten, {
		results: 1, departure: when
	})

	const p = res.journeys[0].legs.find(l => !l.walking)
	t.ok(p.tripId, 'precondition failed')
	t.ok(p.line.name, 'precondition failed')
	const trip = await client.trip(p.tripId, p.line.name, {when})

	validate(t, trip, 'trip', 'trip')
	t.end()
})

tap.test('arrivals at Volksgarten', async (t) => {
	const arrivals = await client.arrivals(volksgarten, {
		duration: 10, when
	})

	await testArrivals({
		test: t,
		arrivals,
		validate,
		id: volksgarten,
	})
	t.end()
})

// todo: nearby

tap.test('reachableFrom', async (t) => {
	await testReachableFrom({
		test: t,
		reachableFrom: client.reachableFrom,
		address: zillnerstr2,
		when,
		maxDuration: 15,
		validate
	})
	t.end()
})

tap.test('serverInfo works', async (t) => {
	await testServerInfo({
		test: t,
		fetchServerInfo: client.serverInfo,
	})
})
