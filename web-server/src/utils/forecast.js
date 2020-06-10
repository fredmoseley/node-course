const request = require('request');

let params = {
     access_key: 'e0ff01677e1d23deef6ff84c1d0a63f8',
    query: '37.8267,-122.4233',
    units: 'f',
    baseUrl: 'http://api.weatherstack.com/current'
}
//Coordinates (Lat/Lon)	query = 40.7831,-73.9712
const forecast = (latitude, longitude, callback) => {
    params.query = `${latitude},${longitude}`;
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
            const message =`${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees out.  
                            Feels like ${current.feelslike}.  The humidity is ${current.humidity}.`
            callback(undefined, message);
        }
    })
}

module.exports = forecast


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