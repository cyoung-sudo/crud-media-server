import express from "express";
// Encryption
import bcrypt from "bcrypt";
// Models
import User from "../models/userModel.js";

const userRoutes = express.Router();

userRoutes.route("/")
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

export default userRoutes;