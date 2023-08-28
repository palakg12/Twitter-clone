const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const {
  createTweet,
  deleteTweet,
  likeOrDislike,
  getAllTweets,
  getUserTweets,
  getExploreTweets,
} = require("../controllers/tweetController")
const router = express.Router();

// Create a Tweet
router.post("/new", protect, createTweet);

// Delete a Tweet
router.delete("/:id", protect, deleteTweet);

// Like or Dislike a Tweet
router.put("/:id/like", likeOrDislike);

// get all timeline tweets
router.get("/timeline/:id", getAllTweets);

// get user Tweets only
router.get("/user/all/:id", getUserTweets);

//explore
router.get("/explore", getExploreTweets);


module.exports = router