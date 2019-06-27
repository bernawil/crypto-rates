const models = require("../models");
const { groupWith } = require("ramda");

const find = ({ coin = null, fiat = null, limit = null, offset = null }) =>
  models.Rate.findAll({
    limit,
    offset,
    order: [["createdAt", "desc"]],
    include: [
      {
        model: models.Coin,
        where: !coin ? {} : { symbol: coin },
        required: true
      },
      {
        model: models.Fiat,
        where: !fiat ? {} : { symbol: fiat },
        required: true
      }
    ]
  });

const groupResults = results =>
  groupWith(
    (a, b) =>
      a.Coin.symbol === b.Coin.Symbol && a.Fiat.symbol === b.Fiat.symbol,
    results
  );

const findLatest = ({
  coin = null,
  fiat = null,
  limit = null,
  offset = null
}) =>
  find({ coin, fiat, limit, offset }).then(results => {
    return groupResults(results).map(group =>
      group.reduce(
        (acc, curr) =>
          !acc ? curr : acc.createdAt > curr.createdAt ? acc : curr
      )
    );
  });

module.exports = {
  find,
  findLatest
};
