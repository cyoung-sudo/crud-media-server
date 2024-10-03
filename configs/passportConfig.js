// Auth
import passport from "passport";
import LocalStrategy from "passport-local";
// Encryption
import bcrypt from "bcrypt";
// Models
import User from "../models/userModel.js";

passport.use(new LocalStrategy.Strategy((username, password, done) => {
  console.log("test3")
  User.findOne({ username: username })
    .then(doc => {
      if(!doc) return done(null, false);
      bcrypt.compare(password, doc.password)
        .then(res => {
          if(res) {
            return done(null, doc);
          } else {
            return done(null, false);
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