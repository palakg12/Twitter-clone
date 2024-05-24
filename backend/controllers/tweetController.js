const asyncHandler = require('express-async-handler')
const User = require('../models/UserModel.js')
const Tweet = require('../models/TweetModel.js')

const createTweet = asyncHandler(async (req, res) => {

      const newTweet = new Tweet(req.body);
        const savedTweet = await newTweet.save();
        res.status(200).json(savedTweet);
        }
      )
       
const deleteTweet = asyncHandler(async (req, res) => {
    const tweet = await Tweet.findById(req.params.id);
    if (tweet.userId === req.body.id) {
      await tweet.deleteOne();
      res.status(200).json("tweet has been deleted");
    } else {
        res.status(500)
        throw new Error('Tweet not deleted')
  } 
});


const likeOrDislike = asyncHandler(async (req, res) => {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet.likes.includes(req.body.id)) {
      await tweet.updateOne({ $push: { likes: req.body.id } });
      res.status(200).json("tweet has been liked");
    } else {
      await tweet.updateOne({ $pull: { likes: req.body.id } });
      res.status(200).json("tweet has been disliked");
    }

});


const getAllTweets = asyncHandler(async (req, res) => {
    const currentUser = await User.findById(req.params.id);
    const userTweets = await Tweet.find({ userId: currentUser._id });
    const followersTweets = await Promise.all(
      currentUser.following.map((followerId) => {
        return Tweet.find({ userId: followerId });
      })
    );
    res.status(200).json(userTweets.concat(...followersTweets));
  } 
);


const getUserTweets = asyncHandler(async (req, res, next) => {
    const userTweets = await Tweet.find({ userId: req.params.id }).sort({
      createAt: -1,
});

    res.status(200).json(userTweets);
  } );


const getExploreTweets = asyncHandler(async (req, res, next) => {
    const getExploreTweets = await Tweet.find({
      likes: { $exists: true },
    }).sort({ likes: -1 });

    res.status(200).json(getExploreTweets);
  } 
);

module.exports = {
    getAllTweets,
    getExploreTweets,
    getUserTweets,
    likeOrDislike,
    deleteTweet,
    createTweet,
}

