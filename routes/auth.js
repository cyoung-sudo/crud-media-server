import express from "express";
// Authentication
import passport from "passport";
// Middleware
import { checkAuthenticated } from "../middleware/authMiddleware.js";

const authRoutes = express.Router();

// Return authenticated user
authRoutes.get("/", checkAuthenticated, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

// Login user
authRoutes.post("/login", (req, res, next) => {
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

authRoutes.delete('/logout', checkAuthenticated, (req, res, next) => {
  req.logout(err => {
    if(err) return next(err);
    res.json({ success: true });
  });
});

export default authRoutes;