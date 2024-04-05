const md5 = require("md5");
const userModel = require("../models/users");
const { CustomError } = require("../utils/router-utils");
const jwt = require("jsonwebtoken");
const { ok200 } = require("../utils/response-utils");

async function login(req, res, next) {
  const { role, username, password } = req.body;
  if (!role || !username || !password) {
    throw new CustomError("Invalid Request", 400);
  }

  const user = await userModel.findOne({
    username,
    password: md5(password),
    role,
    is_active: 1,
  });
  if (!user) {
    throw new CustomError("Invalid Credentials", 400);
  }
  const token = jwt.sign(
    { _id: user._id, role, username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  res.json({ success: true, data: { token, fullname: user.fullname } });
}

async function verify(req, res, next) {
  res.json({
    success: true,
    data: { ...res.locals.userData, iat: null, exp: null },
  });
}

module.exports = { login, verify };
