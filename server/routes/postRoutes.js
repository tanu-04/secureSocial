// routes/postRoutes.js
const express = require("express");
const { createPost, getAllPosts } = require("../controllers/postController");

const router = express.Router();

// router.post("/createPost", (req, res) => {
//   try {
//     console.log("request body : " + JSON.stringify(req.body));
//     res.status(200).json({ message: "success" });
//   } catch (err) {
//     console.log(err);
//   }
// });

router.post("/createPost", createPost);

// try {
//   router.post("/createPost", (req, res) => {
//     createPost(req, res);
//   }); // Create a post
//   //   router.get("/getPosts", getAllPosts);
// } catch (err) {
//   console.log("error in this location : " + err);
// }

module.exports = router;
