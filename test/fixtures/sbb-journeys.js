'use strict'

const baselSBB = {
	type: 'stop',
	id: '8500010',
	name: 'Basel SBB',
	location: {
		type: 'location',
		id: '8500010',
		latitude: 47.547408,
		longitude: 7.589548
	},
	products: {
		'express-train': true,
		'international-train': true,
		'interregional-train': true,
		'regional-express-train': true,
		watercraft: false,
		'suburban-train': true,
		'bus-taxi': true,
		gondola: false,
		'car-train': true,
		tram: true,
	},
}

const biel = {
	type: 'stop',
	id: '8504300',
	name: 'Biel/Bienne',
	location: {
		type: 'location',
		id: '8504300',
		latitude: 47.132889,
		longitude: 7.242906
	},
	products: {
		'express-train': false,
		'international-train': true,
		'interregional-train': true,
		'regional-express-train': true,
		watercraft: true,
		'suburban-train': true,
		'bus-taxi': true,
		gondola: false,
		'car-train': true,
		tram: false,
	},
}

const bern = {
	type: 'stop',
	id: '8507000',
	name: 'Bern',
	location: {
		type: 'location',
		id: '8507000',
		latitude: 46.948825,
		longitude: 7.439122
	},
	products: {
		'express-train': true,
		'international-train': true,
		'interregional-train': true,
		'regional-express-train': true,
		watercraft: false,
		'suburban-train': true,
		'bus-taxi': true,
		gondola: true,
		'car-train': true,
		tram: true,
	},
}

const lausanne = {
	type: 'stop',
	id: '8501120',
	name: 'Lausanne',
	location: {
		type: 'location',
		id: '8501120',
		latitude: 46.516777,
		longitude: 6.629095
	},
	products: {
		'express-train': true,
		'international-train': true,
		'interregional-train': true,
		'regional-express-train': true,
		watercraft: false,
		'suburban-train': true,
		'bus-taxi': true,
		gondola: false,
		'car-train': true,
		tram: true,
	},
}

const yverdonLesBains = {
	type: 'stop',
	id: '8504200',
	name: 'Yverdon-les-Bains',
	location: {
		type: 'location',
		id: '8504200',
		latitude: 46.781878,
		longitude: 6.641141
	},
	products: {
		'express-train': false,
		'international-train': true,
		'interregional-train': true,
		'regional-express-train': true,
		watercraft: true,
		'suburban-train': true,
		'bus-taxi': true,
		gondola: false,
		'car-train': false,
		tram: false,
	},
}

module.exports = [{
	type: 'journey',
	legs: [{
		origin: baselSBB,
		destination: biel,
		departure: '2020-12-14T10:03:00+01:00',
		plannedDeparture: '2020-12-14T10:03:00+01:00',
		departureDelay: null,
		departurePrognosisType: 'prognosed',
		arrival: '2020-12-14T11:10:00+01:00',
		plannedArrival: '2020-12-14T11:10:00+01:00',
		arrivalDelay: null,
		arrivalPrognosisType: 'prognosed',
		reachable: true,
		tripId: '1|33571|3|95|14122020',
		line: {
			type: 'line',
			id: '1-000011-51',
			fahrtNr: '1616',
			name: 'IC 51',
			public: true,
			adminCode: '000011',
			productName: 'IC',
			mode: 'train',
			product: 'international-train',
			operator: {
				type: 'operator',
				id: 'schweizerische-bundesbahnen-sbb',
				name: 'Schweizerische Bundesbahnen SBB'
			},
		},
		direction: 'Biel/Bienne',
		arrivalPlatform: '4',
		plannedArrivalPlatform: '4',
		departurePlatform: '14',
		plannedDeparturePlatform: '14',
		cycle: {min: 3600, max: 3600, nr: 3},
	}, {
		origin: biel,
		destination: yverdonLesBains,
		departure: '2020-12-14T11:16:00+01:00',
		plannedDeparture: '2020-12-14T11:16:00+01:00',
		departureDelay: null,
		departurePrognosisType: 'prognosed',
		arrival: '2020-12-14T11:52:00+01:00',
		plannedArrival: '2020-12-14T11:52:00+01:00',
		arrivalDelay: null,
		arrivalPrognosisType: 'prognosed',
		reachable: true,
		tripId: '1|155150|2|95|14122020',
		line: {
			type: 'line',
			id: '1-000011-5',
			fahrtNr: '516',
			name: 'IC 5',
			public: true,
			adminCode: '000011',
			productName: 'IC',
			mode: 'train',
			product: 'international-train',
			operator: {
				type: 'operator',
				id: 'schweizerische-bundesbahnen-sbb',
				name: 'Schweizerische Bundesbahnen SBB'
			},
		},
		direction: 'Genève-Aéroport',
		arrivalPlatform: '2',
		plannedArrivalPlatform: '2',
		departurePlatform: '5',
		plannedDeparturePlatform: '5',
		cycle: {min: 1740, max: 1860, nr: 5},
	}, {
		origin: yverdonLesBains,
		destination: lausanne,
		departure: '2020-12-14T11:57:00+01:00',
		plannedDeparture: '2020-12-14T11:57:00+01:00',
		departureDelay: null,
		departurePrognosisType: 'prognosed',
		arrival: '2020-12-14T12:27:00+01:00',
		plannedArrival: '2020-12-14T12:27:00+01:00',
		arrivalDelay: null,
		arrivalPrognosisType: 'prognosed',
		reachable: true,
		tripId: '1|70708|0|95|14122020',
		line: {
			type: 'line',
			id: '5-000011-5',
			fahrtNr: '24539',
			name: 'S 5',
			public: true,
			adminCode: '000011',
			productName: 'S',
			mode: 'train',
			product: 'suburban-train',
			operator: {
				type: 'operator',
				id: 'schweizerische-bundesbahnen-sbb',
				name: 'Schweizerische Bundesbahnen SBB'
			},
		},
		direction: 'Aigle',
		arrivalPlatform: '1',
		plannedArrivalPlatform: '1',
		departurePlatform: '2',
		plannedDeparturePlatform: '2',
		cycle: {min: 1740, max: 1860, nr: 5},
	}],
	refreshToken: '¶HKI¶T$A=1@O=Basel SBB@X=7589566@Y=47547408@L=8500010@a=128@$A=1@O=Biel/Bienne@X=7242906@Y=47132898@L=8504300@a=128@$202012141003$202012141110$IC 51   $$1$$$$§T$A=1@O=Biel/Bienne@X=7242906@Y=47132898@L=8504300@a=128@$A=1@O=Yverdon-les-Bains@X=6640943@Y=46781545@L=8504200@a=128@$202012141116$202012141152$IC 5    $$1$$$$§T$A=1@O=Yverdon-les-Bains@X=6640943@Y=46781545@L=8504200@a=128@$A=1@O=Lausanne@X=6629095@Y=46516795@L=8501120@a=128@$202012141157$202012141227$S 5     $$1$$$$',
	cycle: {min: 3600},
	remarks: [
		{type: 'hint', code: 'cap1st_11', text: '1.'},
		{type: 'hint', code: 'cap2nd_11', text: '2.'}]
}, {
	type: 'journey',
	legs: [{
		origin: baselSBB,
		destination: bern,
		departure: '2020-12-14T10:28:00+01:00',
		plannedDeparture: '2020-12-14T10:28:00+01:00',
		departureDelay: null,
		departurePrognosisType: 'prognosed',
		arrival: '2020-12-14T11:26:00+01:00',
		plannedArrival: '2020-12-14T11:26:00+01:00',
		arrivalDelay: null,
		arrivalPrognosisType: 'prognosed',
		reachable: true,
		tripId: '1|5522|0|95|14122020',
		line: {
			type: 'line',
			id: '1-000011-6',
			fahrtNr: '1067',
			name: 'IC 6',
			public: true,
			adminCode: '000011',
			productName: 'IC',
			mode: 'train',
			product: 'international-train',
			operator: {
				type: 'operator',
				id: 'schweizerische-bundesbahnen-sbb',
				name: 'Schweizerische Bundesbahnen SBB'
			},
		},
		direction: 'Domodossola (I)',
		arrivalPlatform: '6',
		plannedArrivalPlatform: '6',
		departurePlatform: '10',
		plannedDeparturePlatform: '10',
		cycle: {min: 1800, max: 3600, nr: 4},
		alternatives: [{
			tripId: '1|259027|0|95|14122020',
			line: {
				type: 'line',
				id: '1-000011-61',
				fahrtNr: '967',
				name: 'IC 61',
				public: true,
				adminCode: '000011',
				productName: 'IC',
				mode: 'train',
				product: 'international-train',
				operator: {
					type: 'operator',
					id: 'schweizerische-bundesbahnen-sbb',
					name: 'Schweizerische Bundesbahnen SBB'
				},
			},
			direction: 'Interlaken Ost',
			when: null,
			plannedWhen: null,
			delay: null,
		}, {
			tripId: '1|5612|0|95|14122020',
			line: {
				type: 'line',
				id: '1-000011-61',
				fahrtNr: '1069',
				name: 'IC 61',
				public: true,
				adminCode: '000011',
				productName: 'IC',
				mode: 'train',
				product: 'international-train',
				operator: {
					type: 'operator',
					id: 'schweizerische-bundesbahnen-sbb',
					name: 'Schweizerische Bundesbahnen SBB'
				},
			},
			direction: 'Interlaken Ost',
			when: null,
			plannedWhen: null,
			delay: null,
		}, {
			tripId: '1|168184|0|95|14122020',
			line: {
				type: 'line',
				id: 'ec-57',
				fahrtNr: '57',
				name: 'EC 57',
				public: true,
				adminCode: '000011',
				productName: 'EC',
				mode: 'train',
				product: 'international-train',
				operator: {
					type: 'operator',
					id: 'schweizerische-bundesbahnen-sbb',
					name: 'Schweizerische Bundesbahnen SBB'
				},
			},
			direction: 'Brig',
			when: null,
			plannedWhen: null,
			delay: null,
		}, {
			tripId: '1|259357|0|95|14122020',
			line: {
				type: 'line',
				id: '1-000011-61',
				fahrtNr: '971',
				name: 'IC 61',
				public: true,
				adminCode: '000011',
				productName: 'IC',
				mode: 'train',
				product: 'international-train',
				operator: {
					type: 'operator',
					id: 'schweizerische-bundesbahnen-sbb',
					name: 'Schweizerische Bundesbahnen SBB'
				},
			},
			direction: 'Interlaken Ost',
			when: null,
			plannedWhen: null,
			delay: null,
		}]
	}, {
		origin: bern,
		destination: lausanne,
		departure: '2020-12-14T11:34:00+01:00',
		plannedDeparture: '2020-12-14T11:34:00+01:00',
		departureDelay: null,
		departurePrognosisType: 'prognosed',
		arrival: '2020-12-14T12:40:00+01:00',
		plannedArrival: '2020-12-14T12:40:00+01:00',
		arrivalDelay: null,
		arrivalPrognosisType: 'prognosed',
		reachable: true,
		tripId: '1|201862|0|95|14122020',
		line: {
			type: 'line',
			id: '1-000011-1',
			fahrtNr: '714',
			name: 'IC 1',
			public: true,
			adminCode: '000011',
			productName: 'IC',
			mode: 'train',
			product: 'international-train',
			operator: {
				type: 'operator',
				id: 'schweizerische-bundesbahnen-sbb',
				name: 'Schweizerische Bundesbahnen SBB'
			},
		},
		direction: 'Genève-Aéroport',
		arrivalPlatform: '5',
		plannedArrivalPlatform: '5',
		departurePlatform: '5',
		plannedDeparturePlatform: '5',
		cycle: {min: 3600, max: 3600, nr: 3},
	}],
	refreshToken: '¶HKI¶T$A=1@O=Basel SBB@X=7589566@Y=47547408@L=8500010@a=128@$A=1@O=Bern@X=7439131@Y=46948834@L=8507000@a=128@$202012141028$202012141126$IC 6    $$1$$$$§T$A=1@O=Bern@X=7439131@Y=46948834@L=8507000@a=128@$A=1@O=Lausanne@X=6629095@Y=46516795@L=8501120@a=128@$202012141134$202012141240$IC 1    $$1$$$$',
	cycle: {min: 3600},
	remarks: [
		{type: 'hint', code: 'cap1st_11', text: '1.'},
		{type: 'hint', code: 'cap2nd_11', text: '2.'}]
}, {
	type: 'journey',
	legs: [{
		origin: baselSBB,
		destination: bern,
		departure: '2020-12-14T10:58:00+01:00',
		plannedDeparture: '2020-12-14T10:58:00+01:00',
		departureDelay: null,
		departurePrognosisType: 'prognosed',
		arrival: '2020-12-14T11:56:00+01:00',
		plannedArrival: '2020-12-14T11:56:00+01:00',
		arrivalDelay: null,
		arrivalPrognosisType: 'prognosed',
		reachable: true,
		tripId: '1|259027|0|95|14122020',
		line: {
			type: 'line',
			id: '1-000011-61',
			fahrtNr: '967',
			name: 'IC 61',
			public: true,
			adminCode: '000011',
			productName: 'IC',
			mode: 'train',
			product: 'international-train',
			operator: {
				type: 'operator',
				id: 'schweizerische-bundesbahnen-sbb',
				name: 'Schweizerische Bundesbahnen SBB'
			},
		},
		direction: 'Interlaken Ost',
		arrivalPlatform: '4',
		plannedArrivalPlatform: '4',
		departurePlatform: '7',
		plannedDeparturePlatform: '7',
		cycle: {min: 1800, max: 3600, nr: 4},
		alternatives: [{
			tripId: '1|5612|0|95|14122020',
			line: {
				type: 'line',
				id: '1-000011-61',
				fahrtNr: '1069',
				name: 'IC 61',
				public: true,
				adminCode: '000011',
				productName: 'IC',
				mode: 'train',
				product: 'international-train',
				operator: {
					type: 'operator',
					id: 'schweizerische-bundesbahnen-sbb',
					name: 'Schweizerische Bundesbahnen SBB'
				},
			},
			direction: 'Interlaken Ost',
			when: null,
			plannedWhen: null,
			delay: null,
		}, {
			tripId: '1|168184|0|95|14122020',
			line: {
				type: 'line',
				id: 'ec-57',
				fahrtNr: '57',
				name: 'EC 57',
				public: true,
				adminCode: '000011',
				productName: 'EC',
				mode: 'train',
				product: 'international-train',
				operator: {
					type: 'operator',
					id: 'schweizerische-bundesbahnen-sbb',
					name: 'Schweizerische Bundesbahnen SBB'
				},
			},
			direction: 'Brig',
			when: null,
			plannedWhen: null,
			delay: null,
		}, {
			tripId: '1|259357|0|95|14122020',
			line: {
				type: 'line',
				id: '1-000011-61',
				fahrtNr: '971',
				name: 'IC 61',
				public: true,
				adminCode: '000011',
				productName: 'IC',
				mode: 'train',
				product: 'international-train',
				operator: {
					type: 'operator',
					id: 'schweizerische-bundesbahnen-sbb',
					name: 'Schweizerische Bundesbahnen SBB'
				},
			},
			direction: 'Interlaken Ost',
			when: null,
			plannedWhen: null,
			delay: null,
		}, {
			tripId: '1|5887|0|95|14122020',
			line: {
				type: 'line',
				id: '1-000011-61',
				fahrtNr: '1073',
				name: 'IC 61',
				public: true,
				adminCode: '000011',
				productName: 'IC',
				mode: 'train',
				product: 'international-train',
				operator: {
					type: 'operator',
					id: 'schweizerische-bundesbahnen-sbb',
					name: 'Schweizerische Bundesbahnen SBB'
				},
			},
			direction: 'Interlaken Ost',
			when: null,
			plannedWhen: null,
			delay: null,
		}]
	}, {
		origin: bern,
		destination: lausanne,
		departure: '2020-12-14T12:04:00+01:00',
		plannedDeparture: '2020-12-14T12:04:00+01:00',
		departureDelay: null,
		departurePrognosisType: 'prognosed',
		arrival: '2020-12-14T13:16:00+01:00',
		plannedArrival: '2020-12-14T13:16:00+01:00',
		arrivalDelay: null,
		arrivalPrognosisType: 'prognosed',
		reachable: true,
		tripId: '1|73704|0|95|14122020',
		line: {
			type: 'line',
			id: '2-000011-15',
			fahrtNr: '2518',
			name: 'IR 15',
			public: true,
			adminCode: '000011',
			productName: 'IR',
			mode: 'train',
			product: 'interregional-train',
			operator: {
				type: 'operator',
				id: 'schweizerische-bundesbahnen-sbb',
				name: 'Schweizerische Bundesbahnen SBB'
			},
		},
		direction: 'Genève-Aéroport',
		arrivalPlatform: '6',
		plannedArrivalPlatform: '6',
		departurePlatform: '3',
		plannedDeparturePlatform: '3',
		cycle: {min: 3600, max: 3600, nr: 3},
	}],
	refreshToken: '¶HKI¶T$A=1@O=Basel SBB@X=7589566@Y=47547408@L=8500010@a=128@$A=1@O=Bern@X=7439131@Y=46948834@L=8507000@a=128@$202012141058$202012141156$IC 61   $$1$$$$§T$A=1@O=Bern@X=7439131@Y=46948834@L=8507000@a=128@$A=1@O=Lausanne@X=6629095@Y=46516795@L=8501120@a=128@$202012141204$202012141316$IR 15   $$1$$$$',
	cycle: {min: 3600},
	remarks: [
		{type: 'hint', code: 'cap1st_11', text: '1.'},
		{type: 'hint', code: 'cap2nd_11', text: '2.'}]
}, {
	type: 'journey',
	legs: [{
		origin: baselSBB,
		destination: biel,
		departure: '2020-12-14T11:03:00+01:00',
		plannedDeparture: '2020-12-14T11:03:00+01:00',
		departureDelay: null,
		departurePrognosisType: 'prognosed',
		arrival: '2020-12-14T12:10:00+01:00',
		plannedArrival: '2020-12-14T12:10:00+01:00',
		arrivalDelay: null,
		arrivalPrognosisType: 'prognosed',
		reachable: true,
		tripId: '1|33571|4|95|14122020',
		line: {
			type: 'line',
			id: '1-000011-51',
			fahrtNr: '1618',
			name: 'IC 51',
			public: true,
			adminCode: '000011',
			productName: 'IC',
			mode: 'train',
			product: 'international-train',
			operator: {
				type: 'operator',
				id: 'schweizerische-bundesbahnen-sbb',
				name: 'Schweizerische Bundesbahnen SBB'
			},
		},
		direction: 'Biel/Bienne',
		arrivalPlatform: '4',
		plannedArrivalPlatform: '4',
		departurePlatform: '14',
		plannedDeparturePlatform: '14',
		cycle: {min: 3600, max: 3600, nr: 3},
	}, {
		origin: biel,
		destination: yverdonLesBains,
		departure: '2020-12-14T12:16:00+01:00',
		plannedDeparture: '2020-12-14T12:16:00+01:00',
		departureDelay: null,
		departurePrognosisType: 'prognosed',
		arrival: '2020-12-14T12:52:00+01:00',
		plannedArrival: '2020-12-14T12:52:00+01:00',
		arrivalDelay: null,
		arrivalPrognosisType: 'prognosed',
		reachable: true,
		tripId: '1|156563|0|95|14122020',
		line: {
			type: 'line',
			id: '1-000011-5',
			fahrtNr: '518',
			name: 'IC 5',
			public: true,
			adminCode: '000011',
			productName: 'IC',
			mode: 'train',
			product: 'international-train',
			operator: {
				type: 'operator',
				id: 'schweizerische-bundesbahnen-sbb',
				name: 'Schweizerische Bundesbahnen SBB'
			},
		},
		direction: 'Genève-Aéroport',
		arrivalPlatform: '2',
		plannedArrivalPlatform: '2',
		departurePlatform: '5',
		plannedDeparturePlatform: '5',
		cycle: {min: 1740, max: 1860, nr: 5},
	}, {
		origin: yverdonLesBains,
		destination: lausanne,
		departure: '2020-12-14T12:57:00+01:00',
		plannedDeparture: '2020-12-14T12:57:00+01:00',
		departureDelay: null,
		departurePrognosisType: 'prognosed',
		arrival: '2020-12-14T13:27:00+01:00',
		plannedArrival: '2020-12-14T13:27:00+01:00',
		arrivalDelay: null,
		arrivalPrognosisType: 'prognosed',
		reachable: true,
		tripId: '1|70657|2|95|14122020',
		line: {
			type: 'line',
			id: '5-000011-5',
			fahrtNr: '24545',
			name: 'S 5',
			public: true,
			adminCode: '000011',
			productName: 'S',
			mode: 'train',
			product: 'suburban-train',
			operator: {
				type: 'operator',
				id: 'schweizerische-bundesbahnen-sbb',
				name: 'Schweizerische Bundesbahnen SBB'
			},
		},
		direction: 'Aigle',
		arrivalPlatform: '1',
		plannedArrivalPlatform: '1',
		departurePlatform: '2',
		plannedDeparturePlatform: '2',
		cycle: {min: 1740, max: 1860, nr: 5},
	}],
	refreshToken: '¶HKI¶T$A=1@O=Basel SBB@X=7589566@Y=47547408@L=8500010@a=128@$A=1@O=Biel/Bienne@X=7242906@Y=47132898@L=8504300@a=128@$202012141103$202012141210$IC 51   $$1$$$$§T$A=1@O=Biel/Bienne@X=7242906@Y=47132898@L=8504300@a=128@$A=1@O=Yverdon-les-Bains@X=6640943@Y=46781545@L=8504200@a=128@$202012141216$202012141252$IC 5    $$1$$$$§T$A=1@O=Yverdon-les-Bains@X=6640943@Y=46781545@L=8504200@a=128@$A=1@O=Lausanne@X=6629095@Y=46516795@L=8501120@a=128@$202012141257$202012141327$S 5     $$1$$$$',
	cycle: {min: 3600},
	remarks: [
		{type: 'hint', code: 'cap1st_11', text: '1.'},
		{type: 'hint', code: 'cap2nd_11', text: '2.'},
	],
}]
