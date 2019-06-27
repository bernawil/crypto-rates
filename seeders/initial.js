"use strict";

const { v4 } = require("uuid");

module.exports = {
  up: async migration => {
    const now = new Date();
    await migration.bulkInsert(
      "Coins",
      [
        {
          id: v4(),
          name: "Bitcoin",
          symbol: "BTC",
          createdAt: now,
          updatedAt: now
        },
        {
          id: v4(),
          name: "Ethereum",
          symbol: "ETH",
          createdAt: now,
          updatedAt: now
        }
      ],
      {}
    );
    await migration.bulkInsert(
      "Fiats",
      [
        {
          id: v4(),
          name: "Dollar",
          symbol: "USD",
          createdAt: now,
          updatedAt: now
        },
        {
          id: v4(),
          name: "Pound Sterling",
          symbol: "GBP",
          createdAt: now,
          updatedAt: now
        },
        {
          id: v4(),
          name: "Euro",
          symbol: "EUR",
          createdAt: now,
          updatedAt: now
        }
      ],
      {}
    );
  },

  down: async migration => {
    await migration.bulkDelete("Coins", null, {});
    await migration.bulkDelete("Fiats", null, {});
    await migration.bulkDelete("Rates", null, {});
  }
};
