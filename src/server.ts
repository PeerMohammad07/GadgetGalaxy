import express from "express"
import dotenv from "dotenv"
import userRouter from "./infrastructure/routes/userRoutes";
import connectDB from "./infrastructure/config/db";
import cors from "cors"
import morgan from "morgan";

const app = express();

// Config the Dotenv
dotenv.config()

// Setting Cors 
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// Use morgan middleware to log HTTP requests
app.use(morgan("dev"))

// For parsing application/json
app.use(express.json()); 

// Mongodb Connect
connectDB()

app.use("/api/user",userRouter)


const PORT = process.env.PORT || 3000

// Server 
app.listen(PORT,()=>{
  console.log("server is runnning on http://localhost:3000")
})

export default app