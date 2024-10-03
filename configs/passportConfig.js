// Auth
import passport from "passport";
import LocalStrategy from "passport-local";
// Encryption
import bcrypt from "bcrypt";
// Models
import User from "../models/userModel.js";

passport.use(new LocalStrategy.Strategy((username, password, done) => {
  // "Need to handle missing input field"
  User.findOne({ username: username })
    .then(doc => {
      // User not found
      if(!doc) return done(null, false, {message: "User not found"});
      bcrypt.compare(password, doc.password)
        .then(res => {
          // Correct password
          if(res) {
            return done(null, doc);
          // Incorrect password
          } else {
            return done(null, false, {message: "Incorrect password"});
          }
        })
        .catch(err => console.log(err));
    })
    .catch(err => {
      console.log(err);
      return done(err);
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});