import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

//desc Auth user and get token
//@route POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
     const { email, password } = req.body
     const userExist = await User.findOne({ email })
     if (userExist && (await userExist.matchPassword(password))) {
     res.json({
      _id: userExist._id,
      userName: userExist.userName,
      email: userExist.email,
      isAdmin: userExist.isAdmin,
      accountType: userExist.accountType,
      number:userExist.number,
      token: generateToken(userExist._id),
    })    
     } else {
          res.status(401)
          throw new Error('Invalid email or password')
     }
})

//desc Register user
//@route POST /api/users/register
//@acess Public
const registerUser = asyncHandler(async (req, res) => {
     const { userName, email, accountType, number, password,isAdmin } = req.body
     const userExit = await User.findOne({ email })
     if (userExit) {
          res.status(400)
          throw new Error('User already exits')
     }
     const user = await User.create({ userName, email, accountType, number, password,isAdmin })
     if (user) {
          const { _id, userName, email, accountType, number,isAdmin} = user
          res.status(201).json({_id,userName,email,accountType,isAdmin,number,token:generateToken(user._id)})
     } else {
          res.status(400)
          throw new Error(`Invalid user data`)
     }
})

export {authUser,registerUser}
