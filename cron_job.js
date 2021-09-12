const cron = require('node-cron');
require('./knex')
const Promise = require("bluebird");
const CityService = require('./service/city');
const WeatherRecordService = require('./service/weather_record');
const WeatherStationService = require('./service/weather_station');
const axios = require('axios');
const moment = require('moment-timezone')

const getRecordsFromCities = async (city_names) => {
    const city_name_set = new Set(city_names)
    const response = await axios.get("https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0002-001?Authorization=CWB-594ED2C4-2CA0-4107-90FD-5E62F70516F2&parameterName=CITY&limit=100"
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
    console.log(`retrieve weather records job started at ${moment().tz("Asia/Taipei")}`)
    const city_names = ["臺北市", "新北市", "桃園市"]
    const modified_records = await getRecordsFromCities(city_names)

    await Promise.map(modified_records, async (record) => {
        const city = await new CityService().findByName(record.city.name).then(async (city) => {
            if (!city) {
                city = await new CityService().add({name: record.city.name})
            }
            return city
        })

        const weather_station = await new WeatherStationService().findByStationId(record.weather_station.stationId).then(async (weather_station) => {
            if (!weather_station) {
                record.weather_station.city_id = city.id
                console.log(record.weather_station)
                weather_station = await new WeatherStationService().add(record.weather_station)
            }
            return weather_station
        })
        record.weather_record.weather_station_id = weather_station.id
        await new WeatherRecordService().add(record.weather_record)
    })
    console.log(`retrieve weather records job finished at ${moment().tz("Asia/Taipei")}`)
})