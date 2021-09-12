const WeatherRecord = require('../model/weather_record');

class WeatherRecordService {
    async add(weather_record) {
        return await WeatherRecord.query().insertAndFetch(weather_record);
    }

    async list() {
        return await WeatherRecord.query();
    }

    async findById(id) {
        return await WeatherRecord.query().findById(id);
    }

    async deleteById(id) {
        return await WeatherRecord.query().deleteById(id);
    }
}

module.exports = WeatherRecordService;