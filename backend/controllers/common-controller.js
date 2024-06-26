const md5 = require("md5");
const userModel = require("../models/users");
const { CustomError } = require("../utils/router-utils");
const jwt = require("jsonwebtoken");
const { ok200 } = require("../utils/response-utils");
const { uploadFile } = require("../utils/upload-files-utils");

async function signup(req, res, next) {
  const { role, username, fullname, email, password } = req.body;
  if (!role || !username || !fullname || !email || !password) {
    throw new CustomError("Invalid Request", 400);
  }

  const user = await userModel.findOne({ username, is_active: 1 });
  if (user) {
    throw new CustomError("Username already exists", 400);
  }

  // let profileImage = {};
  // if (req.file) {
  //   const result = await uploadFile(
  //     req.file.buffer,
  //     req.file.originalname,
  //     "profile-images"
  //   );
  //   profileImage.public_id = result.public_id;
  //   profileImage.public_url = result.secure_url;
  // }

  const newUser = new userModel({
    role,
    username,
    fullname,
    email,
    // phone,
    password: md5(password),
  });

  await newUser.save();

  const token = jwt.sign(
    { _id: newUser._id, role, email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  res.json({ success: true, data: { token, fullname: newUser.fullname } });
}

async function login(req, res, next) {
  const { role, email, password } = req.body;
  if (!role || !email || !password) {
    throw new CustomError("Invalid Request", 400);
  }

  const user = await userModel.findOne({
    email,
    password: md5(password),
    role,
    is_active: 1,
  });
  if (!user) {
    throw new CustomError("Invalid Credentials", 400);
  }
  const token = jwt.sign(
    { _id: user._id, role, email },
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

module.exports = { login, verify, signup };
