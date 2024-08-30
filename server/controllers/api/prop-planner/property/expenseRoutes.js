const router = require("express").Router();
const { withAuthOther } = require("../../../../utils/auth");
// -- expense model
const { Expense } = require("../../../../models");
const { getPropertyData } = require("../../../../utils/helpers");

// -- get an expense
router.get("/:id", withAuthOther, async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);
    const expenseData = expense.get({ plain: true });
    expenseData
      ? res.status(200).json(expenseData)
      : res.status(400).json({ msg: "expense failed to get, check request." });
  } catch (err) {
    res.status(500).json(err);
  }
});
// -- add an expense
router.post("/", withAuthOther, async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    if (expense != null) {
      const propertyData = await getPropertyData(req.body.property_id);

      res.status(200).json({
        msg: "Expense info successfully added.",
        propertyData: propertyData,
      });
    } else {
      res.status(400).json({ msg: "Expense failed to update, check request." });
    }
  } catch (err) {
    res.status(500).json({ err: err });
  }
});

// -- update an expense
router.put("/:id", withAuthOther, async (req, res) => {
  try {
    const expense = await Expense.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (expense[0] != null) {
      const propertyData = await getPropertyData(req.body.property_id);
      res.status(200).json({
        msg: "Expense successfully updated.",
        propertyData: propertyData,
      });
    } else {
      res.status(400).json({ msg: "Expense failed to update, check request." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// -- delete an expense
router.delete("/:id/:property_id", withAuthOther, async (req, res) => {
  const expenseProperty = await Expense.findByPk(req.params.id);
  const expenseData = expenseProperty.get({ plain: true });
  try {
    const expense = await Expense.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (expense != null) {
      const propertyData = await getPropertyData(expenseData.property_id);
      res.status(200).json({
        msg: "Found and deleted expense.",
        propertyData: propertyData,
      });
    } else {
      res
        .status(400)
        .json({ msg: "Expense not found or has already been deleted." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
