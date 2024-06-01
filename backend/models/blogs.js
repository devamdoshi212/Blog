const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  author: { type: mongoose.SchemaTypes.ObjectId, ref: "users", required: true },
  category: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "categories",
      required: true,
    },
  ],
  comments: [{ type: mongoose.SchemaTypes.ObjectId, ref: "comments" }],
  image: {
    public_id: { type: String, trim: true },
    public_url: { type: String, trim: true },
  },
  is_public: { type: Number, default: 1 },
  is_active: { type: Number, default: 1 },
});
const blogsModel = mongoose.model("blogs", blogSchema);
module.exports = blogsModel;
