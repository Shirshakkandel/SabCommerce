import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import visa from '../../assets/images/homepage/visa.png'
import khalti from '../../assets/images/homepage/khalti.svg'
import esewa from '../../assets/images/homepage/esewa.png'
import checkout from '../../assets/images/homepage/order.png'

import Error from '../../Components/Error'
import CheckoutSteps from './CheckoutSteps'
import { useSelector, useDispatch } from 'react-redux'
import { numberWithCommas } from '../../function'
import { createOrder } from '../../store/action/orderActions'

const SelectPaymentContainer = styled.div``
const FlexContainer = styled.div``
const PaymentMethod = styled.div``
const Order = styled.div``

export default function SelectPayment({ history }) {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const login = useSelector((state) => state.userLogin)
  const { userInfo } = login
  const { cartItems, shippingAddress } = cart

  useEffect(() => {
    if (!userInfo || !shippingAddress) {
      history.push('/shipping')
      history.push('/shipping')
    }
  }, [shippingAddress, userInfo])

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0)
  const subPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
  const shippingPrice = subPrice > 500 ? 0 : 50
  const total = subPrice + shippingPrice
  const [payment, setPayment] = useState('paypal')

  function placeOrderHandler() {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod: payment,
        itemsPrice: subPrice,
        shippingPrice,
        totalPrice: total,
      })
    )
  }

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      history.push(`order/${order._id}`)
    }
    // eslint-disable-next-line
  }, [history, success, order])

  return (
    <SelectPaymentContainer className=" lex flex-col px-5 xl:px-28 fonts-sans bg-gray-50 py-5">
      <CheckoutSteps step1 step2 step3 step4 />

      <FlexContainer className="lg:flex lg:space-x-3 space-y-3 lg:space-y-0">
        <PaymentMethod className="flex-1 rounded showdow-lg flex flex-col p-5 mb-5 ">
          <div className="block text-lg font-medium p-2">Select Payment Method</div>
          <div className="flex flex-wrap  items-center justify-between space-y-3 sm:space-y-0">
            <img
              onClick={() => setPayment('paypal')}
              src={visa}
              className={`${
                payment === 'paypal' ? 'border border-red-500  rounded-full' : ''
              } w-24 cursor-pointer transform hover:scale-110 transition-all duration-300 ease-in-out mx-auto p-2`}
            />

            <img
              onClick={() => setPayment('khalti')}
              src={khalti}
              alt="khalti"
              className={`w-24 ${
                payment === 'khalti' ? 'border border-red-500 rounded-full' : ''
              } cursor-pointer transform hover:scale-110 transition-all duration-300 ease-in-out mx-auto p-2`}
            />

            <img
              onClick={() => setPayment('esewa')}
              src={esewa}
              alt="Esewa"
              className={` ${
                payment === 'esewa' ? 'border border-red-500 rounded-full' : ''
              } w-24 cursor-pointer transform hover:scale-110 transition-all duration-300 ease-in-out mx-auto p-2`}
            />
          </div>
        </PaymentMethod>

        <Order className="w-full lg:w-96 bg-white rounded shadow-lg p-5 flex flex-col space-y-2">
          <div className="block text-lg font-medium">Order Summary</div>
          <div className="flex justify-between text-gray-500">
            <div>Subtotal ({`${totalItems} items`})</div>
            <div>Rs 0</div>
          </div>
          <div className="flex justify-between text-gray-500">
            <div>Total</div>
            <div className="text-secondary">Rs {numberWithCommas(total)}</div>
          </div>
          {/* proceed button  */}
          <button
            onClick={placeOrderHandler}
            className="bg-yellow-500 text-secondary flex justify-center items-center px-4 text-sm lg:text-lg py-2 space-x-2 focus:outline-none"
          >
            <span className="hidden sm:block">
              <img src={checkout} alt="" className="h-6 w-6" />
            </span>
            <div>Order Now</div>
          </button>
          {error && <Error error={error} />}
        </Order>
      </FlexContainer>
    </SelectPaymentContainer>
  )
}
