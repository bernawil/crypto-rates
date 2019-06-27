require("dotenv").config();
const rp = require("request-promise");
const bluebird = require("bluebird");
const logger = require("./logger");
const { CMP_URL, CMP_TOKEN } = process.env;
const { flatten } = require('ramda')

module.exports = {
  getLatestRates: fiats =>
    bluebird.Promise.map(fiats, fiat =>
      rp({
        method: "GET",
        uri: `${CMP_URL}/v1/cryptocurrency/listings/latest`,
        qs: {
          start: "1",
          limit: "10",
          convert: fiat
        },
        headers: {
          "X-CMC_PRO_API_KEY": CMP_TOKEN
        },
        json: true,
        gzip: true
      }).then(({ data }) =>
        data.map(({ symbol: coin, quote }) => ({
          coin,
          fiat,
          rate: quote[fiat].price
        }))
      )
    )
  .then(result => flatten(result))
};
