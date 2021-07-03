import express from 'express'
import { authUser, getUsers, registerUser } from '../controllers/userController.js'
import { admin, protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/login', authUser)
router.route('/').post(registerUser).get(protect, admin, getUsers)

export default router
