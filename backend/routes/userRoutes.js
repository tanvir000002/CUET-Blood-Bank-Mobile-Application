const express = require("express");
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  getUsersByBloodGroupAndLocation,
} = require("../controllers/userController");
const {
  authMiddleware,
  verifyUser,
} = require("../middlewares/authMiddleware");
const { verify } = require("jsonwebtoken");

const router = express.Router();

/// for user routes
router.post("/users/register", createUser);
router.post("/users/login", loginUser);
router.get("/users/logout", logoutUser);
router.get("/users/",  getAllUsers);
router.get("/users/bloodloc",  getUsersByBloodGroupAndLocation);


router.get("/users/profile", authMiddleware, verifyUser, getUser);
router.put("/users/edit-profile", authMiddleware, verifyUser, updateUser);
router.put("/users/reset-password", authMiddleware, verifyUser, updateUser);
router.delete("/users/:id", authMiddleware, deleteUser);

module.exports = router;
