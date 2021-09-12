const WeatherStation = require('../model/weather_station');

class WeatherStationService {
    async add(weather_station) {
        return await WeatherStation.query().insertAndFetch(weather_station);
    }

    async list() {
        return await WeatherStation.query();
    }

    async findById(id) {
        return await WeatherStation.query().findById(id);
    }

    async findByStationId(stationId) {
        return await WeatherStation.query().findOne({stationId: stationId});
    }

    async update(id, weather_station) {
        return await WeatherStation.query().patchAndFetchById(id, weather_station);
    }

    async deleteById(id) {
        return await WeatherStation.query().deleteById(id);
    }
}

module.exports = WeatherStationService;