const weatherRecordController = require('../controllers/weather_record')

const routes = require('express').Router();

routes.get('/', weatherRecordController.getWeatherStationsWithRecordsFromCityNames)

module.exports = routes;