const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String },
  is_active: { type: Number, default: 1 },
});
const categoriesModel = mongoose.model("categories", categorySchema);
module.exports = categoriesModel;
