exports.createComment = async (req, res) => {
  const { text, postId } = req.body;
  try {
    const comment = await Comment.create({
      text,
      post: postId,
      author: req.user._id,
    });
    res.status(201).json(comment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating comment: " + error.message });
  }
};

exports.getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate(
      "author",
      "username"
    );
    if (comments.length === 0) {
      return res
        .status(404)
        .json({ message: "No comments found for this post" });
    }
    res.status(200).json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving comments: " + error.message });
  }
};
