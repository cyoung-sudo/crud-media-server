import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectToDatabase } from "./db/connection.js";
// Routes
import userRoutes from "./routes/user.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors({
  origin: process.env.CLIENT,
  credentials: true
}));
app.use(express.json());

//----- Routes
app.use("/api/users", userRoutes);

// Connect to DB
connectToDatabase()
.then(() => {
  console.log('Connected to MongoDB');
  // Start server
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
})
.catch(err => console.log(err));