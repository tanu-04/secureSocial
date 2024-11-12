// models/Comment.js
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  text: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", commentSchema);
