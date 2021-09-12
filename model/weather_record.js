const { Model } = require('objection');

class WeatherRecord extends Model {
    static get tableName() {
    return 'weather_records';
    }
}

module.exports = WeatherRecord;