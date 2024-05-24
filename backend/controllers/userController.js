const asyncHandler = require('express-async-handler')
const Tweet = require('../models/TweetModel.js')
const User = require('../models/Usermodel.js')

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


const followUser = asyncHandler(async (req, res)=>{
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.id);

    if (!user.followers.includes(req.body.id)) {
      await user.updateOne({
        $push: { followers: req.body.id },
      });
      await currentUser.updateOne({ $push: { following: req.params.id } });
    } 
    
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


