// routes/commentRoutes.js
const express = require("express");
const {
  createComment,
  getCommentsByPost,
} = require("../controllers/commentController");
const { authenticateToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/createComment", (req, res, next) => {
  createComment(req, res, next);
}); // Create a comment
router.get("/:postId", getCommentsByPost); // Get comments for a post

module.exports = router;
