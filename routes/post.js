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

postRoutes.route("/:postId")
//----- Update given post
.get((req, res) => {
  Post.findById(req.params.postId)
  .then(doc => {
    if(doc) {
      res.json({
        success: true,
        post: doc
      });
    } else {
      res.json({
        success: false,
        message: "Post not found"
      });
    }
  })
  .catch(err => console.log(err));
})
//----- Update given post
.put(checkAuthenticated, (req, res) => {
  Post.findByIdAndUpdate(req.params.postId, {
    title: req.body.title,
    text: req.body.text
  })
  .then(doc => {
    res.json({ success: true });
  })
  .catch(err => console.log(err));
})
//----- Delete given post
.delete(checkAuthenticated, (req, res) => {
  Post.findByIdAndDelete(req.params.postId)
  .then(doc => {
    res.json({ success: true });
  })
  .catch(err => console.log(err));
})

postRoutes.route("/user/:userId")
//----- Retrieve posts for given user
.get((req, res) => {
  Post.find({
    userId: req.params.userId
  })
  .then(docs => {
    res.json({
      success: true,
      posts: docs
    });
  })
  .catch(err => console.log(err));
});

export default postRoutes;