const User = require('./User');
const Expense = require('./Expense');
const Financial = require('./Financial');
const Income = require('./Income');
const Market = require('./Market');
const Mortgage = require('./Mortgage');
const Property = require('./Property');

//#region  -- pulling in a user_id foreign key to all related objects
User.hasMany(Property, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

User.hasMany(Mortgage, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

User.hasMany(Market, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

User.hasMany(Income, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

User.hasMany(Financial, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

User.hasMany(Expense, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
//#endregion

//#region -- pulling in a property_id foreign key to all related objects
Property.hasMany(Mortgage, {
  foreignKey: 'property_id',
  onDelete: 'CASCADE',
});

Property.hasMany(Market, {
  foreignKey: 'property_id',
  onDelete: 'CASCADE',
});

Property.hasMany(Income, {
  foreignKey: 'property_id',
  onDelete: 'CASCADE',
});

Property.hasMany(Financial, {
  foreignKey: 'property_id',
  onDelete: 'CASCADE',
});

Property.hasMany(Expense, {
  foreignKey: 'property_id',
  onDelete: 'CASCADE',
});
//#endregion

module.exports = { User, Expense, Financial, Income, Market, Mortgage, Property };
