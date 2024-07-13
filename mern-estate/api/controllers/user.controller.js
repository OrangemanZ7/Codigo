import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js"
import User from "../models/user.model.js"

export const test = (req, res) => {
  res.json({
    message: "User controller"
  })
}

export const updateUserInfo = async (req, res, next) => {
  if (req.user.id !== req.params.id) return next(errorHandler(401, "Sem autorização!"))
  const { username, email, password, avatar } = req.body

  try {
    
    if (password) {
      password = bcryptjs.hashSync(password, 10)
    }

    const updateUser = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        username,
        email,
        password,
        avatar
      }
    }, {new: true})

    const { password, ...rest } = updateUser._doc

    res.status(200).json(rest)
    
  } catch (error) {
    next(error)    
  }
}
