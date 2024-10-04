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