# Coding Challenge

# How to run

1.  first, install dependencies with `$ npm install`

# with docker compose

2.  run `$ docker-compose up`
    this will set up databases, run migrations seeds and start the server

# this project uses MarketCoinCap sandbox api. If you reach the limit you can change the CMP_TOKEN and CMP_URL env vars in the dockerfile to use your own

# Cron Job

the cron job fetches prices every 5 minutes. Note: MarcetCoinCap sandbox api only allows converting to 1 currency at a time, so it was neccesary to perform many requests per currency

# public api: available routes

all routes accept coin, fiat limit & offset options

* GET /rates
* GET /rates/latest

Examples:

* GET /rates?coin=BTC&fiat=USD&limit=10&offset=2
* GET /rates/latest?coin=BTC&fiat=USD
