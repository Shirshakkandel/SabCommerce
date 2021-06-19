import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

//@desc Fetch all products
//@route GET /api/products
//@acess Public
const getProducts = asyncHandler(async (req, res) => {
     const pageSize = 4
     const page = Number(req.query.pageNumber) || 1
     const keyword = req.query.keyword ? {name:{$regex:req.query.keyword, $options:'i'}} : {} 
     const count = await Product.countDocuments({ ...keyword })
     const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))
     res.json({products, page, pages:Math.ceil(count/pageSize)})
})

export {getProducts}
