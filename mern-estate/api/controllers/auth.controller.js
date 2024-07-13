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

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
    const { password: pass, ...rest} = newUser._doc

    res.cookie("access_token", token, {httpOnly:true, expires: new Date(Date.now()+2*hours)}).status(201).json(rest)

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

export const google = async (req, res, next) => {
  const { name, email, photo } = req.body
  const username = name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4)

  try {

    const user = await User.findOne({ email })

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      const { password: pass, ...rest} = user._doc

      res.cookie("access_token", token, {httpOnly:true, expires: new Date(Date.now()+2*hours)}).status(200).json(rest)

    } else {

      const generatedPassword = Math.random().toString(36).slice(-8)
      const hashedPassword=bcryptjs.hashSync(generatedPassword, 10)

      const newUser = new User({ username, email, password:hashedPassword, avatar:photo })

      try {

        await newUser.save()

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
        const { password: pass, ...rest} = newUser._doc

        res.cookie("access_token", token, {httpOnly:true, expires: new Date(Date.now()+2*hours)}).status(200).json(rest)    
        
      } catch (error) {
        next(error)
      }

    }
  } catch (error) {
    next(error)
  }
}