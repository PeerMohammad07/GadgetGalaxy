import express from "express"
import dotenv from "dotenv"
import userRouter from "./infrastructure/routes/userRoutes";
import connectDB from "./infrastructure/config/db";
import cors from "cors"
import morgan from "morgan";
import adminRouter from "./infrastructure/routes/adminRoutes";
import cookieParser from "cookie-parser";

const app = express();

// Config the Dotenv
dotenv.config()

app.use(cookieParser())

// Setting Cors 
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
// https://gadget-galaxy-peermohammadwebsite.vercel.app


// Use morgan middleware to log HTTP requests
app.use(morgan("dev"))

// For parsing application/json
app.use(express.json()); 

// Mongodb Connect
connectDB()

app.use("/api/user",userRouter)
app.use("/api/admin",adminRouter)

const PORT = process.env.PORT || 3000

// Server 
app.listen(PORT,()=>{
  console.log("server is runnning on http://localhost:3000")
})

export default app