import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"

const hours = 60*60*1000

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body

  const hashedPassword=bcryptjs.hashSync(password, 10)
  const newUser = new User({username, email, password:hashedPassword})

  try {
    await newUser.save()  
    res.status(201).json({message: "User created successfully..."})    
  } catch (error) {
    next(error)
  }
}

export const signin = async (req, res, next) => {
  const { email, password } = req.body

  try {    
    const validUser = await User.findOne({ email })
    if (!validUser) return next(errorHandler(404,"User not found!"))
    const validPassword = await bcryptjs.compare(password, validUser.password)
    if (!validPassword) return next(errorHandler(401,"Invalid credentials!"))    
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
    const { password: pass, ...rest} = validUser._doc
    res.cookie("access_token", token, {httpOnly:true, expires: new Date(Date.now()+2*hours)}).status(200).json(rest)
  } catch (error) {
    next(error)
  }
}