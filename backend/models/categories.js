const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, trim: true },
  categoryImg: {
    public_id: { type: String, trim: true },
    public_url: { type: String, trim: true },
  },
  is_active: { type: Number, default: 1 },
});
const categoriesModel = mongoose.model("categories", categorySchema);
module.exports = categoriesModel;
