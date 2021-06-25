import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
export default function CartPage() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  return (
    <div>
      {cartItems.map((cartItem, key) => {
        const { _id, name, image, price, countInStock, qty } = cartItem
        return (
          <div className="" key={key}>
            <img src={image} alt="Cart Items" />
          </div>
        )
      })}
    </div>
  )
}
