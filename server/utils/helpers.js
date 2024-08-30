const {
  User,
  Expense,
  Financial,
  Income,
  Market,
  Mortgage,
  Property,
} = require("../models");

module.exports = {
  getPropertyData: async (id) => {
    const updatedProperty = await Property.findByPk(id, {
      include: [
        { model: Expense },
        { model: Financial },
        { model: Income },
        { model: Market },
        { model: Mortgage },
      ],
    });
    console.log(id);
    const propertyData = updatedProperty.get({ plain: true });

    return propertyData;
  },
  getProperties: async (id) => {
    const properties = await Property.findAll({
      include: [
        { model: Expense },
        { model: Financial },
        { model: Income },
        { model: Market },
        { model: Mortgage },
      ],
      where: { user_id: id },
    });

    let propertyData = [];
    if (properties === undefined || properties.length === 0) {
      propertyData = [];
    } else {
      propertyData = properties.map((prop) => prop.get({ plain: true }));
    }
    return propertyData;
  },
  getUserId: async (id) => {
    const user = await User.findByPk(id);
    const userData = updatedProperty.get({ plain: true });
    return userData.id;
  },
};
