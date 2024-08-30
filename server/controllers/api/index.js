const router = require("express").Router();
const propPlannerRoutes = require("./prop-planner");

router.use("/prop-planner", propPlannerRoutes);

module.exports = router;
