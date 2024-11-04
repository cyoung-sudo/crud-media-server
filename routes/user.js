import express from "express";
// Encryption
import bcrypt from "bcrypt";
// Models
import User from "../models/userModel.js";
import Post from "../models/postModel.js";

const userRoutes = express.Router();

userRoutes.route("/")
//----- Retrieve users
.get((req, res) => {
  User.find({})
  .then(docs => {
    let revDocs = docs.reverse();
    res.json({
      success: true,
      users: revDocs
    });
  })
  .catch(err => console.log(err));
})
//----- Create user
.post((req, res) => {
  // Encrypt password
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    // Create user
    User.create({
      username: req.body.username,
      password: hash
    })
    .then(savedDoc => {
      res.json({
        success: true,
        user: savedDoc
      })
    })
    .catch(err => {
      let errorMsg = "An error has occured";
      // Handle duplicate username
      if(err.code === 11000) {
        errorMsg = "Username has already been taken";
      }
      res.json({
        success: false,
        message: errorMsg
      });
    });
  });
});

userRoutes.route("/:userId")
//----- Retrieve user
.get((req, res) => {
  User.findById(req.params.userId)
  .then(doc => {
    if(doc) {
      res.json({
        success: true,
        user: doc
      });
    } else {
      res.json({
        success: false,
        message: "User not found"
      });
    }
  })
  .catch(err => console.log(err));
})
// Delete user
.delete((req, res) => {
  Post.deleteMany({
    userId: req.params.userId
  })
  .then(delCount => {
    return User.findByIdAndDelete(req.params.userId);
  })
  .then(delDoc => {
    res.json({ success: true });
  })
  .catch(err => console.log(err));
});

export default userRoutes;