const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  user: { type: mongoose.SchemaTypes.ObjectId, ref: "users", required: true },
  blog: { type: mongoose.SchemaTypes.ObjectId, ref: "blogs", required: true },
  created_at: { type: Date, default: Date.now },
  is_active: { type: Number, default: 1 },
});
const commentsModel = mongoose.model("comments", commentSchema);
module.exports = commentsModel;
