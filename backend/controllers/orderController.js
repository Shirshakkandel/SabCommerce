import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

export { addOrderItems }

//desc Create new Order
//@route POST /api/orders
//@access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const createdOrder = await Order.create({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    })

    res.status(201).json(createdOrder)
  }
})
