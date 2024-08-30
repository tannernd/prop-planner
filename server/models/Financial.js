const { Model, DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require("../config/connection");

class Financial extends Model {}

Financial.init(
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
    offer_amount: {
      type: DataTypes.DECIMAL,
    },
    property_value: {
      type: DataTypes.DECIMAL,
    },
    closing_amount: {
      type: DataTypes.DECIMAL,
    },
    tax_rate: {
      type: DataTypes.DECIMAL,
    },
    notes: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: "financial",
  }
);

module.exports = Financial;
