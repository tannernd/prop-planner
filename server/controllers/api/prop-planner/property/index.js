const { withAuthProperty, withAuth } = require("../../../../utils/auth");
const { getProperties, getPropertyData } = require("../../../../utils/helpers");

const router = require("express").Router();
// -- property models
const {
  User,
  Expense,
  Financial,
  Income,
  Market,
  Mortgage,
  Property,
} = require("../../../../models");
// -- routes
const expenseRoutes = require("./expenseRoutes");
const incomeRoutes = require("./incomeRoutes");
const marketRoutes = require("./marketRoutes");
const mortgageRoutes = require("./mortgageRoutes");
const financialRoutes = require("./financialRoutes");

router.use("/expense", expenseRoutes);
router.use("/income", incomeRoutes);
router.use("/market", marketRoutes);
router.use("/mortgage", mortgageRoutes);
router.use("/financial", financialRoutes);

// -- get property information
router.get("/:id", withAuthProperty, async (req, res) => {
  try {
    const propertyData = await getPropertyData(req.params.id);

    res.status(200).json(propertyData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// -- add a property
router.post("/", withAuth, async (req, res) => {
  try {
    req.body.user_id = req.session.user_id;
    const property = await Property.create(req.body);
    const propertyData = property.get({ plain: true });
    res.status(200).json(propertyData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// -- update a property
router.put("/:id", withAuthProperty, async (req, res) => {
  try {
    const property = await Property.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (property[0]) {
      const updatedProperty = await Property.findByPk(req.params.id, {
        include: [
          { model: Expense },
          { model: Financial },
          { model: Income },
          { model: Market },
          { model: Mortgage },
        ],
      });
      const propertyData = updatedProperty.get({ plain: true });
      res.status(200).json({
        msg: "Property successfully updated.",
        propertyData: propertyData,
      });
    } else {
      res
        .status(400)
        .json({ msg: "Property failed to update, check request." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// -- delete a property
router.delete("/:id", withAuthProperty, async (req, res) => {
  try {
    const property = await Property.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (property != null) {
      propertyData = await getProperties(req.session.user_id);
      res.status(200).json({
        msg: "Found and deleted property.",
        propertyData: propertyData,
      });
    } else {
      res
        .status(400)
        .json({ msg: "Property not found or has already been deleted." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
