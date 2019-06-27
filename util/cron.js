require("dotenv").config();
const { schedule } = require("node-cron");
const { CRON } = process.env;
const models = require("../models");
const logger = require("./logger");
const { getLatestRates } = require("./cmpapi");

const fetchRates = () =>
  Promise.all([models.Coin.findAll(), models.Fiat.findAll()])
    .then(([coins, fiats]) =>
      getLatestRates(fiats.map(({ symbol }) => symbol))
        .then(rates =>
          Promise.all([
            rates
              .filter(({ coin: coinSymbol }) =>
                coins.find(({ symbol }) => symbol === coinSymbol)
              )
              .map(({ coin: coinSymbol, fiat: fiatSymbol, rate }) =>
                models.Rate.create({
                  CoinId: coins.find(({ symbol }) => symbol === coinSymbol).id,
                  FiatId: fiats.find(({ symbol }) => symbol === fiatSymbol).id,
                  rate
                })
              )
          ])
        )
        .catch(error =>
          logger.log({
            level: "error",
            message: error.message ? error.message : error
          })
        )
    )
    .catch(error =>
      logger.log({
        level: "error",
        message: error
      })
    )
    .then(() =>
      logger.log({ level: "verbose", message: "fetching rates completed" })
    );

module.exports = {
  init: () => schedule(CRON, () => fetchRates()),
  fetchRates
};
