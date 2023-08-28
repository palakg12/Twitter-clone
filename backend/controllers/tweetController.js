const asyncHandler = require('express-async-handler')
const User = require('../models/UserModel')
const Tweet = require('../models/TweetModel')

// // @desc    Get goals
// // @route   GET /api/goals
// // @access  Private
// const getGoals = asyncHandler(async (req, res) => {
//   const goals = await Goal.find({ user: req.user.id })

//   res.status(200).json(goals)
// })

// // @desc    Set goal
// // @route   POST /api/goals
// // @access  Private
// const setGoal = asyncHandler(async (req, res) => {
//   if (!req.body.text) {
//     res.status(400)
//     throw new Error('Please add a text field')
//   }

//   const goal = await Goal.create({
//     text: req.body.text,
//     user: req.user.id,
//   })

//   res.status(200).json(goal)
// })

// // @desc    Update goal
// // @route   PUT /api/goals/:id
// // @access  Private
// const updateGoal = asyncHandler(async (req, res) => {
//   const goal = await Goal.findById(req.params.id)

//   if (!goal) {
//     res.status(400)
//     throw new Error('Goal not found')
//   }

//   // Check for user
//   if (!req.user) {
//     res.status(401)
//     throw new Error('User not found')
//   }

//   // Make sure the logged in user matches the goal user
//   if (tweetModel.user.toString() !== req.user.id) {
//     res.status(401)
//     throw new Error('User not authorized')
//   }

//   const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   })

//   res.status(200).json(updatedGoal)
// })

// // @desc    Delete goal
// // @route   DELETE /api/goals/:id
// // @access  Private
// const deleteGoal = asyncHandler(async (req, res) => {
//   const goal = await Goal.findById(req.params.id)

//   if (!goal) {
//     res.status(400)
//     throw new Error('Goal not found')
//   }

//   // Check for user
//   if (!req.user) {
//     res.status(401)
//     throw new Error('User not found')
//   }

//   // Make sure the logged in user matches the goal user
//   if (tweetModel.user.toString() !== req.user.id) {
//     res.status(401)
//     throw new Error('User not authorized')
//   }

//   await goal.remove()

//   res.status(200).json({ id: req.params.id })
// })

// module.exports = {
//   getGoals,
//   setGoal,
//   updateGoal,
//   deleteGoal,
// }



// const createTweet = asyncHandler(async (req, res) => {
//   const newTweet = new Tweet(req.body);
//     const savedTweet = await newTweet.save();
//     res.status(200).json(savedTweet);
//   } else {
//     handleError(500, err);
//   }
// });
const createTweet = asyncHandler(async (req, res) => {
      // if (!req.body.text) {
      //   res.status(400)
      //   throw new Error('Please add a text field')
      // }
    
      // const newTweet = await Tweet.create({
      //   description: req.body.text,
      //   userId: req.user.id,
      // })
      // res.status(200).json(newTweet)
      const newTweet = new Tweet(req.body);
        const savedTweet = await newTweet.save();
        res.status(200).json(savedTweet);
        }
      )
        
        //   if (!goal) {
        //     res.status(400)
        //     throw new Error('Goal not found')
        //   }
        
        //   // Check for user
        //   if (!req.user) {
        //     res.status(401)
        //     throw new Error('User not found')
        //   }
        
        //   // Make sure the logged in user matches the goal user
        //   if (tweetModel.user.toString() !== req.user.id) {
        //     res.status(401)
        //     throw new Error('User not authorized')
        //   }
        
        //   await goal.remove()
        
        //   res.status(200).json({ id: req.params.id })
        // })
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

