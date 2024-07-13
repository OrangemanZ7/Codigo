import mongoose from "mongoose"

const dbConnect = (DB_USERNAME, DB_PASSWORD, DB_URL, DB_APPNAME ) => {
  mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_URL}/?retryWrites=true&w=majority&appName=${DB_APPNAME}`).then(() => {
    console.log(`Connected to MongoDB/${DB_APPNAME}...`)
  }).catch((e) => {
    console.log(e)
  })
}

export default dbConnect