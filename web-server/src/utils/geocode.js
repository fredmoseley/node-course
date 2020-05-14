const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZnJlZG1vc2VsZXkiLCJhIjoiY2s5eXpuZXpyMDQ3OTNtdzFnbXlhd3Z2cSJ9.aRYru6WIMclTU2b3hxSYgg`
    debugger;
    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to loaction services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location.  Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    })
}

module.exports = geocode

//Geocoding - example response
//Address -> convert to lat and long ->Weather
//https://account.mapbox.com/

/*
features: [{
    id: "place.7397503093427640",
    type: "Feature",
    place_type: [
        "place"
    ],
    relevance: 1,
    properties: {
        wikidata: "Q65"
    },
    text: "Los Angeles",
    place_name: "Los Angeles, California, United States",
    bbox: [
        -118.521456965901,
        33.9018913203336,
        -118.121305008073,
        34.161440999758
    ],
    center: [
        -118.2439,
        34.0544
    ],
    geometry: {
        type: "Point",
        coordinates: [
            -118.2439,
            34.0544
        ]
    },
    context: [{
            id: "region.9697035897738010",
            short_code: "US-CA",
            wikidata: "Q99",
            text: "California"
        },
        {
            id: "country.19352517729256050",
            short_code: "us",
            wikidata: "Q30",
            text: "United States"
        }
    ]
}],
*/