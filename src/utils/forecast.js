const request = require('request')
// const url = 'https://api.darksky.net/forecast/1e4f60a6b5a12f81c5ec15e25f4a0c11/37.8267,-122.4233'

// // first para willbe error followed by response
// request({ url: url, json: true }, (error, response) => {

//     if (error) {
//         console.log('Unable to connect to weather service!')
//     } else if (response.body.error) {
//         console.log('Unable to find location')
//     } else {
//         console.log(response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
//     }
// })

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/1e4f60a6b5a12f81c5ec15e25f4a0c11/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast