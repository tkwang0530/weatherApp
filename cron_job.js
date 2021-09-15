require('./knex')
const cron = require('node-cron');
const Promise = require("bluebird");
const axios = require('axios');
const moment = require('moment-timezone');
const CityModel = require('./model/city');
const WeatherRecordModel = require('./model/weather_record');
const WeatherStationMoel = require('./model/weather_station');

const getWeatherInfosByCities = async (city_names) => {
    const city_name_set = new Set(city_names)
    const response = await axios.get(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0002-001?Authorization=${process.env.WEATHER_API_TOKEN}&parameterName=CITY`
    )
    if (!response || response.data.success !== 'true') {
        return Promise.reject("request failed")
    }
    const filtered_records = response.data.records.location.filter(location_element => city_name_set.has(location_element.parameter[0].parameterValue))
    const modified_records = filtered_records.map(record => {
        return {
            city: {
                name: record.parameter[0].parameterValue
            },
            weather_station: {
                latitude: record.lat,
                longitude: record.lon,
                stationId: record.stationId,
                name: record.locationName
            },
            weather_record: {
                created_at: record.time.obsTime,
                weather_element_str: JSON.stringify(record.weatherElement)
            }
        }
    })
    return modified_records
}

// retrieve weather records from specific cities per hour
cron.schedule('30 * * * *', async () => {
    try {
        console.log(`retrieve weather records job started at ${moment().tz("Asia/Taipei")}`)
        const city_names = ["臺北市", "新北市", "桃園市"]
        const weather_infos = await getWeatherInfosByCities(city_names)

        await Promise.map(weather_infos, async (record) => {
            await CityModel.query().findOne({ name: record.city.name}).then(async (city) => {
                if (!city) {
                    await CityModel.query().insert({name: record.city.name})
                }
            })
            await WeatherStationMoel.query().findOne({ stationId: record.weather_station.stationId }).then(async (weather_station) => {
                if (!weather_station) {
                    const { id } = await CityModel.query().findOne({ name: record.city.name }).select('id')
                    record.weather_station.city_id = id
                    await WeatherStationMoel.query().insert(record.weather_station)
                }
            })
            const { id } = await WeatherStationMoel.query().findOne({stationId: record.weather_station.stationId}).select("id")
            record.weather_record.weather_station_id = id
            await WeatherRecordModel.query().insert(record.weather_record)
        })
            console.log(`retrieve weather records job finished at ${moment().tz("Asia/Taipei")}`)
        } catch (error) {
            console.log(error)
        }
})