const City = require('../model/city');

class CityService {
    async add(city) {
        return await City.query().insertAndFetch(city);
    }

    async list() {
        return await City.query();
    }

    async findById(id) {
        return await City.query().findById(id);
    }

    async findByName(name) {
        return await City.query().findOne({name: name})
    }

    async update(id, city) {
        return await City.query().patchAndFetchById(id, city);
    }

    async deleteById(id) {
        return await City.query().deleteById(id);
    }
}

module.exports = CityService;