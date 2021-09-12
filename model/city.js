const { Model } = require('objection');

class City extends Model {
    static get tableName() {
    return 'cities';
    }
}

module.exports = City;