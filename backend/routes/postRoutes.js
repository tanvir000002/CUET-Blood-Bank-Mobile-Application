const express = require("express");
const {
  getAllPosts,
  createPost,
  deletePost,
  updatePost,
  getPost,
} = require("../controllers/postController");
const {
  authMiddleware,
  verifyUser,
} = require("../middlewares/authMiddleware");
// const multer = require("multer");
// const upload = multer({ dest: "public/posts" });
const router = express.Router();

router.get("/posts", getAllPosts);
router.post(
  "/posts",
  authMiddleware,
  verifyUser,
  createPost
);

router.get("/posts/:postId", getPost);

router.delete("/posts/:postId", authMiddleware, verifyUser, deletePost);

router.put("/posts/edit/:postId", authMiddleware, verifyUser, updatePost);

module.exports = router;
