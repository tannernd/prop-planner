const { Model, DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require("../config/connection");

class Mortgage extends Model {}

Mortgage.init(
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
    loan_amount: {
      type: DataTypes.DECIMAL,
    },
    rate: {
      type: DataTypes.DECIMAL,
    },
    term: {
      type: DataTypes.DECIMAL,
    },
    payment: {
      type: DataTypes.DECIMAL,
    },
    lender: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: "mortgage",
  }
);

module.exports = Mortgage;
