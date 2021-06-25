import express from 'express'
import {
  createProductReview,
  getProductById,
  getProducts,
} from '../controllers/productController.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').get(getProducts)
/**
 * @swagger
 * /api/products:
 *   get:
 *     description: Get all books
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.route('/:id').get(getProductById)

router.route('/:id/reviews').post(protect, createProductReview)

export default router
