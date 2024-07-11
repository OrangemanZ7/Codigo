import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"

dotenv.config()

const PORT = process.env.PORT
const DB_USERNAME=process.env.DB_USERNAME
const DB_PASSWORD=process.env.DB_PASSWORD
const DB_URL=process.env.DB_URL
const DB_APPNAME=process.env.DB_APPNAME

mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_URL}/?retryWrites=true&w=majority&appName=${DB_APPNAME}`).then(() => {
  console.log(`Connected to MongoDB/${DB_APPNAME}...`)
}).catch((e) => {
  console.log(e)
})

const app = express()

app.listen(PORT, () =>{
  console.log(`Server running on port: ${PORT}`)
})