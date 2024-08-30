const { Model, DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require("../config/connection");

class Expense extends Model {}

Expense.init(
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
    amount: {
      type: DataTypes.DECIMAL,
    },
    description: {
      type: DataTypes.STRING,
    },
    other_description: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: "expense",
  }
);

module.exports = Expense;
