const { Model, DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require("../config/connection");

class Market extends Model {}

Market.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
    },
    property_id: {
      type: DataTypes.UUID,
    },
    appreciation: {
      type: DataTypes.DECIMAL,
    },
    annual_rent_increase: {
      type: DataTypes.DECIMAL,
    },
    annual_expense_increase: {
      type: DataTypes.DECIMAL,
    },
    vacancy: {
      type: DataTypes.DECIMAL,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: "market",
  }
);

module.exports = Market;
