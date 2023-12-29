// const asyncHandler = require('express-async-handler')

// const Goal = require('../models/goalModel')
// const User = require('../models/userModel')

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


const asyncHandler = require('express-async-handler')
const Tweet = require('../models/TweetModel')
const User = require('../models/UserModel')

const getUser = asyncHandler(async (req, res) => {
      const user = await User.findById(req.params.id)
      res.status(200).json(user)
    })

const updateUser = asyncHandler(async (req, res) => {
  if (req.params.id === req.user.id) {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedUser);
    } 
   else {
    throw new Error(createError(403, "You can update only your account"));
  }
})
// const updateUser = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.params.id)
  
//     if (!user) {
//       res.status(400)
//       throw new Error('user not found')
//     }
  
//     // Check for user
//     if (!req.user) {
//       res.status(401)
//       throw new Error('User not found')
//     }
  
//     // Make sure the logged in user matches the goal user
//     if (req.params.id !== req.user.id) {
//       res.status(401)
//       throw new Error('User not authorized')
//     }
  
//     const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     })
  
//     res.status(200).json(updatedUser)
//   })
  
const deleteUser = asyncHandler(async (req, res) => {
  if (req.params.id === req.user.id) {
  
      await User.findByIdAndDelete(req.params.id);
      await Tweet.remove({ userId: req.params.id });

      res.status(200).json("User delete");
    } 
   else {
    res.status(401)
    throw new Error( "You can only update your own account");
   }
  })
// const deleteUser = asyncHandler(async (req, res) => {
//       const user = await User.findById(req.params.id)
    
//       if (!user) {
//         res.status(400)
//         throw new Error('User not found')
//       }
    
//       // Check for user
//       if (!req.user) {
//         res.status(401)
//         throw new Error('User not found')
//       }
    
//       // Make sure the logged in user matches the goal user
//       if (req.params.id !== req.user.id) {
//         res.status(401)
//         throw new Error('User not authorized')
//       }
    
//       await User.remove()
    
//       res.status(200).json({ id: req.params.id })
//     })

const followUser = asyncHandler(async (req, res)=>{
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.id);

    if (!user.followers.includes(req.body.id)) {
      await user.updateOne({
        $push: { followers: req.body.id },
      });
      await currentUser.updateOne({ $push: { following: req.params.id } });
    } 
    // else {
    //   res.status(403).json("you already follow this user");
    // }
    res.status(200).json("following the user");
  })
    
const unFollowUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.id);

    if (currentUser.following.includes(req.params.id)) {
      await user.updateOne({
        $pull: { followers: req.body.id },
      });

      await currentUser.updateOne({ $pull: { following: req.params.id } });
    } else {
      res.status(403).json("you are not following this user");
    }
    res.status(200).json("unfollowing the user");
})

module.exports = {
      getUser,
      updateUser,
      deleteUser,
      followUser,
      unFollowUser
}


