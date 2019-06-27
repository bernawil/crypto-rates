const { v4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const Coin = sequelize.define(
    "Coin",
    {
      id: {
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: () => v4()
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      symbol: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {}
  );

  Coin.associate = function({ Rate }) {
    Coin.Rates = Coin.hasMany(Rate);
  };

  return Coin;
};
