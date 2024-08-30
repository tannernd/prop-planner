const router = require("express").Router();
const { User } = require("../../../models");
const { withAuthUser, signToken } = require("../../../utils/auth");
const { getUserId } = require("../../../utils/helpers");
require("dotenv").config();
const jwt = require("jsonwebtoken");

router.post("/create", async (req, res) => {
  try {
    const user = await User.create(req.body);

    let token = signToken(userData.id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Strict",
      maxAge: 3600000,
    });

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;

      res.status(200).json({ msg: "User Created" });
    });
  } catch (err) {
    if (
      err.errors[0].validatorKey === "not_unique" &&
      err.errors[0].path === "email"
    ) {
      res.status(500).json({
        msg: "User already exists, please login.",
      });
    } else {
      res
        .status(500)
        .json({ msg: "An error occurred during sign up, please try again" });
    }
  }
});

// will need to authorize that the user can update the requested account
router.put("/update", withAuthUser, async (req, res) => {
  try {
    // verification and database update functionality here

    res.status(200).json({ msg: "Update request received" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// will need to authorize that the user can delete the requested account
router.delete("/delete", withAuthUser, async (req, res) => {
  try {
    // verification and database update functionality here

    res.status(200).json({ msg: "Delete request received" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ msg: "Incorrect email or password, please try again." });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ msg: "Incorrect email or password, please try again." });
      return;
    }
    let token = signToken(userData.id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Strict",
      maxAge: 3600000,
    });

    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user_id = userData.id;

      res.json({ user: userData, msg: "You are now logged in!" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get("/check-session", (req, res) => {
  if (req.session.logged_in) {
    res.json({ logged_in: true });
  } else {
    res.json({ logged_in: false });
  }
});

router.get("/check-token", (req, res) => {
  let token = req.cookies.token;
  const secret = process.env.JWT_SECRET;
  const expiration = "1h";
  if (!token) {
    req.session.destroy(() => {
      res.status(204).end();
    });
    res.json({ logged_in: false });
    return;
  }
  const { data } = jwt.verify(token, secret, { maxAge: expiration });
  if (!!data) {
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Strict",
      maxAge: 3600000,
    });
    res.status(200).json({ logged_in: true });
  } else {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "Strict",
    });
    req.session.destroy(() => {
      res.status(204).end();
    });
    res.json({ logged_in: false });
  }
});

module.exports = router;
