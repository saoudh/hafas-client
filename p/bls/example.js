'use strict'

const createClient = require('../..')
const blsProfile = require('.')

const client = createClient(blsProfile, 'hafas-client-example')

const bernDennigkofengässli = '8590093'
const münsingenSpital = '8578932'

client.journeys(bernDennigkofengässli, münsingenSpital, {results: 1, stopovers: true})

// .then(({journeys}) => {
// 	const [journey] = journeys
// 	return client.refreshJourney(journey.refreshToken, {stopovers: true, remarks: true})
// })

// .then(({journeys}) => {
// 	const [journey] = journeys
// 	const leg = journey.legs[0]
// 	return client.trip(leg.tripId, leg.line.name, {polyline: true})
// })

// client.departures(bernDennigkofengässli, {duration: 1})
// client.arrivals(bernDennigkofengässli, {duration: 10, linesOfStops: true})
// client.radar({
// 	north: 46.969,
// 	west: 7.3941,
// 	south: 46.921,
// 	east: 7.5141,
// }, {results: 10})

// client.locations('münsingen spital', {results: 3})
// client.stop(bernDennigkofengässli, {linesOfStops: true})
// client.nearby({
// 	type: 'location',
// 	latitude: 53.554422,
// 	longitude: 9.977934
// }, {distance: 500})
// client.reachableFrom({
// 	type: 'location',
// 	id: '990017698',
// 	address: 'Bern, Schänzlihalde 17',
// 	latitude: 46.952835,
// 	longitude: 7.447527,
// }, {
// 	maxDuration: 10,
// })

.then((data) => {
	console.log(require('util').inspect(data, {depth: null, colors: true}))
})
.catch(console.error)
