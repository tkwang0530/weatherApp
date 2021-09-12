require('dotenv').config()
const path = require('path')

const { MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST, MYSQL_PORT } = process.env
module.exports = {
    development: {
        client: "mysql2",
        connection: {
            database: MYSQL_DATABASE,
            user: MYSQL_USER,
            password: MYSQL_PASSWORD,
            host: MYSQL_HOST,
            port: MYSQL_PORT,
        },
        migrations: {
            directory: path.join(__dirname + '/db/migrations'),
        },
    }
}