const Rate = require("../util/rate");

module.exports = app => {
  app.get("/rates", (req, res, next) => {
    const { limit, offset, coin, fiat } = req.query;
    return Rate.find({
      limit: limit ? +limit : null,
      offset: offset ? +offset : null,
      coin: coin ? coin : null,
      fiat: fiat ? fiat : null
    })
      .then(rates =>
        rates.map(
          ({
            Coin: { symbol: coin },
            Fiat: { symbol: fiat },
            rate,
            createdAt: time
          }) => ({
            coin,
            fiat,
            rate,
            time
          })
        )
      )
      .then(data => res.send({ data }));
  });

  app.get("/rates/latest", (req, res, next) => {
    const { limit, offset, coin, fiat } = req.query;
    return Rate.findLatest({
      limit: limit ? +limit : null,
      offset: offset ? +offset : null,
      coin: coin ? coin : null,
      fiat: fiat ? fiat : null
    })
      .then(rates =>
        rates.map(
          ({
            Coin: { symbol: coin },
            Fiat: { symbol: fiat },
            rate,
            createdAt: time
          }) => ({
            coin,
            fiat,
            rate,
            time
          })
        )
      )
      .then(data => res.send({ data }));
  });
};
