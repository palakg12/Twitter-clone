const express = require('express')
const {
  getUser,
  updateUser,
  deleteUser,
  followUser,
  unFollowUser,
} = require('../controllers/userController')

const { protect } = require('../middleware/authMiddleware')

const router = express.Router();

// Update User
router.put("/:id", protect, updateUser);

// Get User
router.get("/find/:id", getUser);

// Delete User
router.delete("/:id", protect, deleteUser);

// Follow
router.put("/follow/:id",protect, followUser);

// Unfollow
router.put("/unfollow/:id", protect, unFollowUser);

module.exports = router