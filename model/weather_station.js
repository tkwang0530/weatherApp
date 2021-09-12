const { Model } = require('objection');

class WeatherStation extends Model {
    static get tableName() {
    return 'weather_stations';
    }
}

module.exports = WeatherStation;