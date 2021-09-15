const { Model } = require('objection');

class Apikey extends Model {
    static get tableName() {
        return 'apikeys';
    }
}

module.exports = Apikey;