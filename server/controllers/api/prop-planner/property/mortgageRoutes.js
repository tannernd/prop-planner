const router = require("express").Router();
const { withAuthOther } = require("../../../../utils/auth");
// -- mortgage model
const Mortgage = require("../../../../models/Mortgage");
const { getPropertyData } = require("../../../../utils/helpers");

// -- get a mortgage
router.get("/:id", withAuthOther, async (req, res) => {
  try {
    const mortgage = await Mortgage.findByPk(req.params.id);
    const mortgageData = mortgage.get({ plain: true });
    mortgageData
      ? res.status(200).json(mortgageData)
      : res.status(400).json({ msg: "mortgage failed to get, check request." });
  } catch (err) {
    res.status(500).json(err);
  }
});

// -- add an mortgage
router.post("/", withAuthOther, async (req, res) => {
  try {
    const mortgage = await Mortgage.create(req.body);
    const mortgageData = mortgage.get({ plain: true });
    if (mortgage != null) {
      const propertyData = await getPropertyData(req.body.property_id);
      res.status(200).json({
        msg: "Mortgage info successfully added.",
        propertyData: propertyData,
      });
    } else {
      res
        .status(400)
        .json({ msg: "Mortgage failed to update, check request." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// -- update an mortgage
router.put("/:id", withAuthOther, async (req, res) => {
  try {
    const mortgage = await Mortgage.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (mortgage[0] != null) {
      const propertyData = await getPropertyData(req.body.property_id);
      res.status(200).json({
        msg: "Mortgage successfully updated.",
        propertyData: propertyData,
      });
    } else {
      res
        .status(400)
        .json({ msg: "Mortgage failed to update, check request." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// -- delete an mortgage
router.delete("/:id/:property_id", withAuthOther, async (req, res) => {
  const mortgageProperty = await Mortgage.findByPk(req.params.id);
  const mortgageData = mortgageProperty.get({ plain: true });
  try {
    const mortgage = await Mortgage.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (mortgage != null) {
      const propertyData = await getPropertyData(mortgageData.property_id);
      res.status(200).json({
        msg: "Found and deleted mortgage.",
        propertyData: propertyData,
      });
    } else {
      res
        .status(400)
        .json({ msg: "Mortgage not found or has already been deleted." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
