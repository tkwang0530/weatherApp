## WebApp (Node.js Express - backend only)
![](/static/weatherApp.png)

## Webapp description
The webapp includes a cronjob which retrieves the weather records through a third-party API per hour

In addition, it provides an API with allow user to retrieve the historical weather record with given city(s)

Finally, it equiped with a apikey authentication. Therefore, to use the route, you have to attach a header "api-key" with the valid value.

The example call:<br/>
GET: localhost:8080/weather_record/?cities=桃園市,臺北市,新北市

# Get started
## clone the repo
git clone https://github.com/tkwang0530/weatherApp.git

## create a .env file

MYSQL_DATABASE=databasename<br/>
MYSQL_USER=mysqluser<br/>
MYSQL_PASSWORD=yourmysqlpass<br/>
MYSQL_HOST=127.0.0.1<br/>
MYSQL_PORT=3306<br/>
WEATHER_API_TOKEN={weather_api_token}<br/>

Note that The {weather_api_token} is given by opendata.cwb.gov.tw

## Install the required modules locally and globally
npm install<br/>
npm install -g knex pm2

## Create the tables
knex migrate:latest

## Before Run the server, create the apikey first!
node init/apikey.js

## Start the server and cronJob
npm start

## What is the apikey for the webapp?
check https://www.npmjs.com/package/uuid-apikey for more information

