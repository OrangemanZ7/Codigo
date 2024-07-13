import dotenv from "dotenv"
import express from "express"
import cookieParser from "cookie-parser"

import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"

import dbConnect from "./utils/dbConnect.js"

dotenv.config()
const PORT = process.env.PORT
const DB_USERNAME=process.env.DB_USERNAME
const DB_PASSWORD=process.env.DB_PASSWORD
const DB_URL=process.env.DB_URL
const DB_APPNAME=process.env.DB_APPNAME

const app = express()

// Middleware
app.use(express.json())
app.use(cookieParser())

// Errors handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message =  err.message || "Internal Server Error!"
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
})

// Routes
app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)

// Start Server Services
app.listen(PORT, () =>{
  console.log(`Server running on port: ${PORT}`)
  dbConnect( DB_USERNAME, DB_PASSWORD, DB_URL, DB_APPNAME )
})
