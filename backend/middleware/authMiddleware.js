import jwt from 'jsonwebtoken'
const { verify } = jwt
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let token
  const { authorization } = req.headers
  const { JWT_SECRET } = process.env

  if (authorization && authorization.startsWith('Bearer')) {
    try {
      token = authorization.split(' ')[1]
      // console.log(token)

      const decode = verify(token, JWT_SECRET)
      req.user = await User.findById(decode.id).select('-password')
      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorize fail, token failed')
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('Not authorize, no token')
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}
export { protect, admin }
