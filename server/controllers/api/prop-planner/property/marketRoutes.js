const router = require("express").Router();
const { withAuthOther } = require("../../../../utils/auth");
// -- expense model
const { Market } = require("../../../../models");
const { getPropertyData } = require("../../../../utils/helpers");

// -- add an expense
router.post("/", withAuthOther, async (req, res) => {
  try {
    req.body.user_id = req.session.user_id;
    const market = await Market.create(req.body);
    const marketData = market.get({ plain: true });

    res.status(200).json(marketData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// -- update an expense
router.put("/:id", withAuthOther, async (req, res) => {
  try {
    const market = await Market.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (market[0]) {
      const propertyData = await getPropertyData(req.body.property_id);
      res.status(200).json({
        msg: "Market successfully updated.",
        propertyData: propertyData,
      });
    } else {
      res.status(400).json({ msg: "Market failed to update, check request." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// -- delete an expense
router.delete("/:id", withAuthOther, async (req, res) => {
  try {
    const market = await Market.destroy({
      where: {
        id: req.params.id,
      },
    });

    market
      ? res.status(200).json({ msg: "Found and deleted market." })
      : res
          .status(400)
          .json({ msg: "Market not found or has already been deleted." });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
