import express from 'express'
import { authUser, registerUser } from '../controllers/userController.js'
const router = express.Router()

router.post('/login', authUser)
router.route('/').post(registerUser)

export default router