const weatherRecordController = require('../controllers/weather_record')
const apikeyController = require('../controllers/apikey')

const routes = require('express').Router();

routes.get('/', apikeyController.verifyAPIKey, weatherRecordController.getWeatherStationsWithRecordsFromCityNames)

module.exports = routes;