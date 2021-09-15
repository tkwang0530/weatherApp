require('../knex')
const ApikeyModel = require('../model/apikey')
const uuidAPIKey = require('uuid-apikey');

async function findOrCreateAPIKey() {
    let apikey = await ApikeyModel.query().findOne({})
    if (!apikey) {
        const apikey_object = uuidAPIKey.create()
        apikey = await ApikeyModel.query().insert({ uuid: apikey_object.uuid})
    }
    console.log(`The generated or existing apiKey: ${uuidAPIKey.toAPIKey(apikey.uuid)}`)
}

(async () => {
    await findOrCreateAPIKey()
    process.exit(0)
})()