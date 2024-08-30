const router = require("express").Router();
const { withAuthOther } = require("../../../../utils/auth");
const { Financial } = require("../../../../models");
const { getPropertyData } = require("../../../../utils/helpers");

// -- add a financial
router.post("/", withAuthOther, async (req, res) => {
  try {
    req.body.user_id = req.session.user_id;
    const financial = await Financial.create(req.body);
    const financialData = financial.get({ plain: true });

    res.status(200).json(financialData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// -- update a financial
router.put("/:id", withAuthOther, async (req, res) => {
  try {
    const financial = await Financial.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (financial[0]) {
      const propertyData = await getPropertyData(req.body.property_id);
      res.status(200).json({
        msg: "Financial successfully updated.",
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

// -- delete a financial
router.delete("/:id", withAuthOther, async (req, res) => {
  try {
    const financial = await Financial.destroy({
      where: {
        id: req.params.id,
      },
    });

    financial
      ? res.status(200).json({ msg: "Found and deleted financial." })
      : res
          .status(400)
          .json({ msg: "Financial not found or has already been deleted." });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
