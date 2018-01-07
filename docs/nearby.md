# `nearby(location, [opt])`

This method can be used to find stations close to a location. Note that it is not supported by every profile/endpoint.

`location` must be an [*FPTF* `location` object](https://github.com/public-transport/friendly-public-transport-format/blob/1.0.1/spec/readme.md#location-objects).

With `opt`, you can override the default options, which look like this:

```js
{
	distance: null, // maximum walking distance in meters
	poi:      false, // return points of interest?
	stations: true, // return stations?
}
```

## Response

As an example, we're going to use the [VBB profile](../p/vbb):

```js
const createClient = require('hafas-client')
const vbbProfile = require('hafas-client/p/vbb')

const client = createClient(vbbProfile)

client.nearby({
	type: 'location',
	latitude: 52.5137344,
	longitude: 13.4744798
}, {distance: 400})
.then(console.log)
.catch(console.error)
```

The response may look like this:

```js
[ {
	type: 'station',
	id: '900000120001',
	name: 'S+U Frankfurter Allee',
	location: {
		type: 'location',
		latitude: 52.513616,
		longitude: 13.475298
	},
	products: {
		suburban: true,
		subway: true,
		tram: true,
		bus: true,
		ferry: false,
		express: false,
		regional: false
	},
	distance: 56
}, {
	type: 'station',
	id: '900000120540',
	name: 'Scharnweberstr./Weichselstr.',
	location: {
		type: 'location',
		latitude: 52.512339,
		longitude: 13.470174
	},
	products: { /* … */ },
	distance: 330
}, {
	type: 'station',
	id: '900000160544',
	name: 'Rathaus Lichtenberg',
	location: {
		type: 'location',
		latitude: 52.515908,
		longitude: 13.479073
	},
	products: { /* … */ },
	distance: 394
} ]
```