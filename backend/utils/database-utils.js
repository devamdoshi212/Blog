const { default: mongoose } = require("mongoose");
const usersModel = require('../models/users');

const md5 = require("md5");
async function dbConnect() {
  // if (process.env.NODE_ENV == "PRODUCTION") {
  //   await mongoose.connect(process.env.MONGODB_URI);
  // }
  if (process.env.NODE_ENV == "DEVELOPMENT") {
    await mongoose.connect(process.env.MONGODB_URI_DEVELOPMENT);
  }
}
async function addAdmin() {
  const admin = new usersModel({
    email: "abc@gmail.com",
    fullname: "admin bhai",
    is_active: 1,
    password: md5("123"),
    username: "admin",
    role: "ADMIN",
  });
  await admin.save();
}
module.exports = { dbConnect, addAdmin };
