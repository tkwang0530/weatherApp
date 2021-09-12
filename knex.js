const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
module.exports = require('knex')(config)

const { Model } = require('objection');
Model.knex(require('knex')(config))