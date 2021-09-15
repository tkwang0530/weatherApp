require('../knex')
const ApikeyModel = require('../model/apikey')
const uuidAPIKey = require('uuid-apikey');
const { ErrorHandler } = require('../helpers/error');

exports.verifyAPIKey = async (req, res, next) => {
    try {
        const api_key = req.headers["api-key"]
        const expected_api_key = await ApikeyModel.query().findOne({}).then(apikey_data => uuidAPIKey.toAPIKey(apikey_data.uuid))
        if (!api_key || api_key !== expected_api_key) {
            throw new ErrorHandler(403, 'Invalid API Key')
        }
    } catch (error) {
        next(error)
    }
    return next()
}