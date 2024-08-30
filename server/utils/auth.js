const { getPropertyData, getUserId } = require(".//helpers");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.JWT_SECRET;
const expiration = "1h";
const msg = "Unauthorized - Please login";
const tokenCheck = (req, res) => {
  let token = req.cookies.token;

  if (!token) {
    res.status(401).json({ msg: msg });
    return;
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    return data;
  } catch {
    res.status(401).json({ msg: msg });
    return;
  }
};

module.exports = {
  withAuth: async function (req, res, next) {
    if (!req.session.logged_in) {
      res.status(401).json({ msg: msg });
    } else {
      next();
    }
  },
  withAuthProperty: async function (req, res, next) {
    let userData = await tokenCheck(req, res);
    if (!userData) return;
    const propertyData = await getPropertyData(req.params.id);
    if (propertyData.user_id != userData.user_id) {
      return res.status(401).json({ msg: msg });
    } else {
      next();
    }
  },

  withAuthOther: async function (req, res, next) {
    let userData = await tokenCheck(req, res);
    let property_id = req.params.property_id || req.body.property_id;
    if (!userData) return;
    const propertyData = await getPropertyData(property_id);
    if (propertyData.user_id != userData.user_id) {
      res.status(401).json({ msg: msg });
    } else {
      next();
    }
  },

  withAuthUser: async function (req, res, next) {
    let userData = await tokenCheck(req, res);
    if (!userData) return;
    const userId = await getUserId(req.body.property_id);
    if (userId != userData.user_id) {
      res.status(401).json({ msg: msg });
    } else {
      next();
    }
  },
  signToken: function (id) {
    const payload = { user_id: id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
