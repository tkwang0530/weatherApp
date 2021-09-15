require('../knex')
const WeatherStationModel = require('../model/weather_station');
const CityModel = require('../model/city')
const Promise = require('bluebird');

exports.getWeatherStationsWithRecordsFromCityNames = async (req, res, next) => {
    try {
            const { cities } = req.query
            const city_names = cities && cities.split(",").length > 0 ? cities.split(",") : []
            let weather_stations = []
            if (city_names.length > 0) {
                const city_ids = []
                await Promise.map(city_names, async(city_name) => {
                    const city = await CityModel.query().findOne({ name: city_name }).select('id')
                    if (city) city_ids.push(city.id)
                })
                weather_stations = await WeatherStationModel.query().whereIn('city_id', city_ids).withGraphFetched('[weather_records, city]')
            } else {
                weather_stations = await WeatherStationModel.query().withGraphFetched('[weather_records, city]')
            }
            weather_stations = weather_stations.map(weather_station => {
                weather_station.weather_records = weather_station.weather_records.map(weather_record => {
                    weather_record.weather_element = JSON.parse(weather_record.weather_element_str)
                    delete weather_record.weather_element_str
                    return weather_record
                })
                return weather_station
            })
            res.status(200).json({ status: "success", statusCode: 200, weather_stations});
    } catch (error) {
        next(error)
    }
    
}