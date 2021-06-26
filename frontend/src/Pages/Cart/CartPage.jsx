import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

import SingleCartItem from './SingleCartItem'

const Cart = styled.div``
const Left = styled.div``
const Right = styled.div``
const Buttom = styled.div``

export default function CartPage() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  return (
    <Cart className="px-8 md:px-20 g:px-24 flex font-sans flex-col bg-gray-50  py-5">
      <section>
        <ul className="space-x-1.5 text-secondary text-sm md:text-lg flex">
          <li>
            <Link to="/">
              Home <span className="mx-1">&gt;</span>
            </Link>
          </li>
          <li>Cart Detail</li>
        </ul>
      </section>

      <h1 className="mx-auto py-5 text-lg md:text-xl font-bold text-gray-700">
        Shopping Cart
      </h1>

      <div className="flex flex-col lg:flex-row lg:space-x-3 font-sans space-y-3 lg:space-y-0 ">
        <Left className="flex-1 bg-white p-3 lg:p-5 rounded shadow-lg space-y-3 ">
          <h2 className="text-secondary font-medium">
            My Cart ({cartItems.length} items)
          </h2>
          <div className="flex flex-col ">
            {cartItems.map((cartItem, key) => {
              return <SingleCartItem key={key} {...cartItem} />
            })}
          </div>
        </Left>
        <Right className="lg:w-96 font-sans bg-white p-3 lg:p-5 rounded shadow-lg">
          Right Content
        </Right>
      </div>
      {/* {cartItems.map((cartItem, key) => {
        const { _id, name, image, price, countInStock, qty } = cartItem
        return (
          <div className="" key={key}>
            <img src={image} alt="Cart Items" />
          </div>
        )
      })} */}
    </Cart>
  )
}
