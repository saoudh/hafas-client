'use strict'

const createClient = require('../..')
const ivbProfile = require('.')

const client = createClient(ivbProfile, 'hafas-client example')

const innsbruckGriesauweg = '476162400'
const völsWest = '476431800'

// client.journeys(innsbruckGriesauweg, völsWest, {
// 	results: 1, stopovers: true,
// })
// .then(({journeys}) => {
// 	const [journey] = journeys
// 	return client.refreshJourney(journey.refreshToken, {stopovers: true, remarks: true})
// })
// .then(({journeys}) => {
// 	const [journey] = journeys
// 	const leg = journey.legs[0]
// 	return client.trip(leg.tripId, leg.line.name, {polyline: true})
// })

// client.departures(innsbruckGriesauweg, {duration: 1})
// client.arrivals(innsbruckGriesauweg, {duration: 10, linesOfStops: true})

client.locations('griesauweg', {results: 3})
// client.stop(innsbruckGriesauweg, {linesOfStops: true})
// client.nearby({
// 	type: 'location',
// 	id: '980076175',
// 	address: 'Lönsstraße 9, 6020 Innsbruck',
// 	latitude: 47.262765,
// 	longitude: 11.419851,
// }, {distance: 1000})
// client.reachableFrom({
// 	type: 'location',
// 	id: '980076175',
// 	address: 'Lönsstraße 9, 6020 Innsbruck',
// 	latitude: 47.262765,
// 	longitude: 11.419851,
// }, {
// 	maxDuration: 30,
// })

.then((data) => {
	console.log(require('util').inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
