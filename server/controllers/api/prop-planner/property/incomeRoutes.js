const router = require("express").Router();
const { withAuthOther } = require("../../../../utils/auth");
// -- expense model
const { Income } = require("../../../../models");

const { getPropertyData } = require("../../../../utils/helpers");

// -- get an income
router.get("/:id", withAuthOther, async (req, res) => {
  try {
    const income = await Income.findByPk(req.params.id);
    const incomeData = income.get({ plain: true });
    incomeData
      ? res.status(200).json(incomeData)
      : res.status(400).json({ msg: "Income failed to get, check request." });
  } catch (err) {
    res.status(500).json(err);
  }
});

// -- add an income
router.post("/", withAuthOther, async (req, res) => {
  try {
    const income = await Income.create(req.body);
    if (income != null) {
      const propertyData = await getPropertyData(req.body.property_id);
      res.status(200).json({
        msg: "Income info successfully added.",
        propertyData: propertyData,
      });
    } else {
      res
        .status(400)
        .json({ msg: "Financial failed to update, check request." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// -- update an income
router.put("/:id", withAuthOther, async (req, res) => {
  try {
    const income = await Income.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (income[0]) {
      const propertyData = await getPropertyData(req.body.property_id);
      res.status(200).json({
        msg: "Income successfully updated.",
        propertyData: propertyData,
      });
    } else {
      res.status(400).json({ msg: "Income failed to update, check request." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// -- delete an income
router.delete("/:id/:property_id", withAuthOther, async (req, res) => {
  const incomeProperty = await Income.findByPk(req.params.id);
  const incomeData = incomeProperty.get({ plain: true });

  try {
    const income = await Income.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (income) {
      const propertyData = await getPropertyData(incomeData.property_id);
      res.status(200).json({
        msg: "Found and deleted income..",
        propertyData: propertyData,
      });
    } else {
      res
        .status(400)
        .json({ msg: "Income not found or has already been deleted." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
