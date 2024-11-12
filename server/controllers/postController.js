// controllers/postController.js
const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  const { title, author, tags, content } = req.body;
  console.log(title + author + tags + content);
  try {
    console.log("entered here");
    const post = await Post.create({ title, author, tags, content });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

try {
  exports.getAllPosts = async (req, res) => {
    try {
      const posts = await Post.find().populate("author", "username");
      res.status(200).json(posts);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving posts: " + error.message });
    }
  };
} catch (err) {
  console.log("error : " + err);
}
