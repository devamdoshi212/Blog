const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ["ADMIN", "USER"] },
  username: { type: String, unique: true, trim: true },
  fullname: { type: String, trim: true },
  email: { type: String, unique: true, trim: true },
  phone: String,
  profile: { type: String, trim: true },
  password: String,
  interests: [{ type: mongoose.SchemaTypes.ObjectId, ref: "categories"}],
  is_active: { type: Number, default: 1 },
});
const usersModel = mongoose.model("users", userSchema);
module.exports = usersModel;
