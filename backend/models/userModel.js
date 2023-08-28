const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    profileProfile: { type: String },
    followers: { type: Array, defaultValue: [] },
    following: { type: Array, defaultValue: [] },
    description: { type: String },
    profileProfile: { type: String },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', UserSchema)
