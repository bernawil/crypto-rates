const { v4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const Rate = sequelize.define(
    "Rate",
    {
      id: {
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: () => v4()
      },
      CoinId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      FiatId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // rate is coin to fiat
      rate: {
        type: DataTypes.DOUBLE,
        allowNull: false
      }
    },
    {}
  );

  Rate.associate = function({ Coin, Fiat }) {
    Rate.Coin = Rate.belongsTo(Coin);
    Rate.Fiat = Rate.belongsTo(Fiat);
  };

  return Rate;
};
