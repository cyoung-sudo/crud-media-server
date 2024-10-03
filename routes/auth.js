import express from "express";
// Authentication
import passport from "passport";

const userRoutes = express.Router();

// Login user
userRoutes.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if(err) next(err);
    // Failed login
    if(!user) {
      res.json({
        success: false,
        message: info.message
      });
    // Successful login
    } else {
      req.login(user, err => {
        if(err) next(err);
        res.json({
          success: true,
          user
        });
      })
    }
  })(req, res, next);
});

export default userRoutes;