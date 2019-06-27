const { v4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const Fiat = sequelize.define(
    "Fiat",
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
      }
    },
    {}
  );

  Fiat.associate = function({ Rate }) {
    Fiat.Rates = Fiat.hasMany(Rate);
  };

  return Fiat;
};
