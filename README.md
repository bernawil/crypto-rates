# Coding Challenge

# How to run

1.  first, install dependencies with `$ npm install`

# with docker compose

2.  run `$ docker-compose up`
    this will set up databases, run migrations seeds and start the server

# this project uses MarketCoinCap sandbox api. If you reach the limit you can change the CMP_TOKEN and CMP_URL env vars in the dockerfile to use your own

# public api: available routes

all routes accept coin, fiat limit & offset options

* GET /rates
* GET /rates/latest

Examples:

* GET /rates?coin=BTC&fiat=USD
* GET /rates?coin=BTC&fiat=USD
