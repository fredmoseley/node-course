const request = require('request');


const log = console.log;


let params = {
     access_key: 'e0ff01677e1d23deef6ff84c1d0a63f8',
    query: '37.8267,-122.4233',
    units: 'f',
    baseUrl: 'http://api.weatherstack.com/current'
}
//Coordinates (Lat/Lon)	query = 40.7831,-73.9712
const forecast = (latitude, longitude, callback) => {
    params.query = `${latitude},${longitude}`;
    //debugger;
    const url = `http://api.weatherstack.com/current?access_key=${params.access_key}&query=${params.query}&units=${params.units}`
    request({
        url,
        json: true
    }, (error, {body}) => {
        //deal with connection error
        if (error) {
            callback('Unable to connect to weatherstack API', undefined)
        } else if (body.error) {
            callback(`The weatherstack API returned an error\n${JSON.stringify(body.error)}`, undefined)

        } else {
            const {current} = body;
            callback(undefined, `${current.weather_descriptions[0]} It is currently ${current.temperature} degrees out.  Feels like ${current.feelslike}.`);
        }
    });
}

module.exports = forecast

/*
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZnJlZG1vc2VsZXkiLCJhIjoiY2s5eXpuZXpyMDQ3OTNtdzFnbXlhd3Z2cSJ9.aRYru6WIMclTU2b3hxSYgg`
    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to connect to loaction services!', undefined)
        } else if (response.body.features.length === 0) {
            console.log('error')
            callback('Unable to find location.  Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            });
        }
    })
}

*/
/*
current: {
    observation_time: "12:33 AM",
    temperature: 19,
    weather_code: 116,
    weather_icons: [
        "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png"
    ],
    weather_descriptions: [
        "Partly cloudy"
    ],
    wind_speed: 37,
    wind_degree: 300,
    wind_dir: "WNW",
    pressure: 1011,
    precip: 0,
    humidity: 54,
    cloudcover: 75,
    feelslike: 19,
    uv_index: 9,
    visibility: 16,
    is_day: "yes"
}
*/