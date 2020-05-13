const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')
const log = console.log;

const address = process.argv[2]
//callback chaining
if (address) {
    geocode(address, (error, {latitude, longitude, location}={}) => {
        //The call back will return error or data
        if (error) {
            return log(error);
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return log(error);
            }
            log(location);
            log(forecastData)
        });
    });
} else {
    log('Location argument is missing.')
}