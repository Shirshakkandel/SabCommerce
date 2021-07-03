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
      name: userExist.name,
      email: userExist.email,
      isAdmin: userExist.isAdmin,
      accountType: userExist.accountType,
      number: userExist.number,
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
  const { name, email, accountType, number, password, isAdmin } = req.body
  const userExit = await User.findOne({ email })
  if (userExit) {
    res.status(400)
    throw new Error('User already exits')
  }
  const user = await User.create({
    name,
    email,
    accountType,
    number,
    password,
    isAdmin,
  })
  if (user) {
    const { _id, name, email, accountType, number, isAdmin } = user
    res.status(201).json({
      _id,
      name,
      email,
      accountType,
      isAdmin,
      number,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error(`Invalid user data`)
  }
})

//@desc Get all users
//@route Get /api/users
//@acess Private/Admin

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

export { authUser, registerUser, getUsers }
