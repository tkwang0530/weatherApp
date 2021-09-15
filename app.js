const app = require('express')();
const { handleError } = require('./helpers/error');
const indexRouter = require('./routes/index')
const weatherRecordRouter = require('./routes/weather_record')

// Connect all our routes to our application
app.use('/', indexRouter);
app.use('/weather_record', weatherRecordRouter);
app.use((err, req, res, next) => {
    handleError(err, res);
})

app.listen(8080, () => {
    console.log('Application listening on port 8080!');
})