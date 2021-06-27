import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

import SingleCartItem from './SingleCartItem'
import { numberWithCommas } from '../../function'

const Cart = styled.div``
const CartFlex = styled.div``
const TotalCartInfoLeft = styled.div``
const OrderSummaryRight = styled.div``
const OrderSummaryButtom = styled.div``

export default function CartPage() {
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const subTotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  // alert(subTotal)

  const deliveryCharge = subTotal <= 500 ? 50 : 0
  // alert(deliveryCharge)
  const total = subTotal + deliveryCharge

  return (
    <Cart className="px-5 md:px-20 g:px-24 flex font-sans flex-col bg-gray-50  py-5">
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

      <h1 className="pl-2 text-center lg:align-baseline border-b mb-2 py-2 lg:py-5 text-lg md:text-xl font-bold text-secondary">
        My Cart
      </h1>

      <CartFlex className="flex flex-col lg:flex-row lg:space-x-3 font-sans space-y-3 lg:space-y-0 ">
        <TotalCartInfoLeft className="flex-1 bg-white p-3 lg:p-5 rounded shadow-lg space-y-3 ">
          <h2 className="text-secondary font-medium">My Cart ({cartItems.length} items)</h2>
          <div className="flex flex-col ">
            {cartItems.map((cartItem, key) => {
              return <SingleCartItem key={key} {...cartItem} />
            })}
          </div>
        </TotalCartInfoLeft>

        <OrderSummaryRight
          className={`${
            cartItems.length > 2 && 'hidden'
          } lg:block lg:w-96 font-sans bg-white p-3 lg:p-5 rounded shadow-lg max-h-80`}
        >
          <h2 className="text-lg font-semibold">Order Summary</h2>

          <div className="space-y-2">
            <div className="flex justify-between text-secondary pt-2">
              <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) Items price :</h2>
              <p className="font-semibold">Rs. {numberWithCommas(subTotal)}</p>
            </div>
            <div className="flex justify-between text-secondary">
              <h2>Shipping Fee</h2>
              <p className="font-bold">Rs. {deliveryCharge}</p>
            </div>
            <div className="flex justify-between text-secondary mb-2">
              <h2>Total</h2>
              <p className="font-bold">Rs. {numberWithCommas(total)}</p>
            </div>
            <button className="bg-yellow-500  space-x-1 text-sm leading-5 focus:outline-none py-2 flex justify-center items-center w-full">
              <ShoppingCartIcon />
              <span>Proceed to checkout</span>
            </button>
          </div>
        </OrderSummaryRight>
      </CartFlex>

      <OrderSummaryButtom
        className={`${
          cartItems.length <= 2 && 'hidden'
        } lg:hidden fixed bottom-14 block h-14 w-full left-0 bg-gray-100 shadow-lg `}
      >
        <div className="flex justify-end items-center px-10 h-5/6 ">
          <div className="flex flex-col justify-center pt-2 pr-5 h-full">
            <p>
              Shipping: <span className="text-red-500">{deliveryCharge}</span>
            </p>
            <div>
              Total: <span className="text-red-500 text-medium">{numberWithCommas(total)}</span>
            </div>
          </div>
          <div className="bg-yellow-500  px-5 py-3 mt-2">Checkout</div>
        </div>
      </OrderSummaryButtom>
    </Cart>
  )
}
