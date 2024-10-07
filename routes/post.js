import express from "express";
// Models
import Post from "../models/postModel.js";
// Middleware
import { checkAuthenticated } from "../middleware/authMiddleware.js";

const postRoutes = express.Router();

postRoutes.route("/")
//----- Retrieve posts
.get((req, res) => {
  Post.find({})
  .then(docs => {
    res.json({
      success: true,
      posts: docs
    });
  })
  .catch(err => console.log(err));
})
//----- Create post
.post(checkAuthenticated, (req, res) => {
  Post.create({
    userId: req.user.id,
    username: req.user.username,
    title: req.body.title,
    text: req.body.text
  })
  .then(savedDoc => {
    res.json({ success: true });
  })
  .catch(err => console.log(err));
});

export default postRoutes;