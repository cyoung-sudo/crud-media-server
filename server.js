import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectToDatabase } from "./db/connection.js";
// Authentication
import passport from "passport";
import session from "express-session";
import "./configs/passportConfig.js";
// Routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";

const PORT = process.env.PORT || 5050;
const app = express();

//----- Middleware
app.use(cors({
  origin: process.env.CLIENT,
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 * 10} // 10mins
}));
app.use(passport.initialize());
app.use(passport.session());

//----- Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
// Initial server ping
app.get("/api/ping", (req, res) => {
  res.json({ success: true });
})

//----- Connection
connectToDatabase()
.then(() => {
  console.log('Connected to MongoDB');
  // Start server
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
})
.catch(err => console.log(err));