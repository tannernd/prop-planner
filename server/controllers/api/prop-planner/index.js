const router = require("express").Router();
const userRoutes = require("./userRoutes");
const propertyRoutes = require("./property");
const {
  Expense,
  Financial,
  Income,
  Market,
  Mortgage,
  Property,
} = require("../../../models");
const { withAuth } = require("../../../utils/auth");
const { getProperties } = require("../../../utils/helpers");

router.use("/users", userRoutes);
router.use("/property", propertyRoutes);

router.get("/properties", withAuth, async (req, res, next) => {
  try {
    const propertyData = await getProperties(req.session.user_id);
    res.status(200).json(propertyData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
