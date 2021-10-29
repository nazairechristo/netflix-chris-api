const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true
    },
    profilePic: {
      type: String,
      default: "https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);



module.exports = mongoose.model('User', userSchema);