'use strict'

const parseJourneyWithTickets = ({ parsed }, j) => {
	// try to retrieve price from totalPrice parameter
	let price = j.trfRes?.totalPrice?.amount;
	// if not single total price is provided but prices for different categories (adult, child, discounts)
	if (!price) {
		const fareSet = j.trfRes?.fareSetL;
		if (fareSet instanceof Array &&  fareSet.length > 0) {
			if (fareSet[0].fareL && fareSet[0].fareL instanceof Array) {
				let fareObj = fareSet[0].fareL.find(fare => fare.name === "Einzelfahrkarte Erwachsene");
				// for the case the default farename for adult is not existing then just use the first fare-price
				if (!fareObj) {
					fareObj = fareSet[0].fareL[0];
				}
				price = fareObj.price?.amount;
			}
		}		
	}

	const parsedCpy = { ...parsed, price: price };

	return parsedCpy;
}

module.exports = parseJourneyWithTickets
