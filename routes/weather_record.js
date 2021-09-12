const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.status(200).json({ message: 'This is weather_record route!'});
})

module.exports = routes;