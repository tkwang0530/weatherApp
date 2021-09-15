const { Model } = require('objection');
const City = require('./city');
const WeatherRecord = require('./weather_record');

class WeatherStation extends Model {
    static get tableName() {
        return 'weather_stations';
    }
    static get relationMappings() {
        return {
            weather_records: {
                relation: Model.HasManyRelation,
                modelClass: WeatherRecord,
                join: {
                    from: 'weather_stations.id',
                    to: 'weather_records.weather_station_id'
                }
            },
            city: {
                relation: Model.BelongsToOneRelation,
                modelClass: City,
                join: {
                    from: 'weather_stations.city_id',
                    to: 'cities.id'
                }
            }
        }
    }
}

module.exports = WeatherStation;