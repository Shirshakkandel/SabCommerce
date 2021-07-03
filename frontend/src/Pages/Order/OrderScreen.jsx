import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { PayPalButton } from 'react-paypal-button-v2'

import { getOrderDetails, payOrder } from '../../store/action/orderActions'
import Loader from '../../Components/Loader'
import Error from '../../Components/Error'
import { numberWithCommas } from '../../function'
import axios from 'axios'

const OrderScreenStyle = styled.div``
const FlexContainer = styled.div``
const LeftContainer = styled.div``
const Shipping = styled.div``
const PaymentMethod = styled.div``
const OrderItems = styled.div``
const OrderSummaryRight = styled.div``

export default function OrderScreen({ match, history }) {
  const orderId = match.params.id
  const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => setSdkReady(true)
      document.body.appendChild(script)
    }

    if (!order || successPay) {
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, orderId, successPay, order])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }

  if (!loading && !error) {
    order.itemPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Error error={error} />
  ) : (
    <OrderScreenStyle>
      <h1 className="text-lg font-bold">Order {order._id}</h1>
      <FlexContainer className="flex flex-col lg:flex-row lg:space-x-3 space-y-5  ">
        <LeftContainer className="flex-1">
          <Shipping className="text-sm lg:text-lg border-b-2 pb-1 border-secondary text-secondary font-medium space-y-1">
            <h2 className="text-lg font-bold leading-10 ">SHIPPING</h2>
            <p>
              <strong>Name:</strong> {order.shippingAddress.fullName}
            </p>
            <a href={`mailto:${order.user.email}`}>
              <p>
                <strong>Email:</strong> {order.user.email}
              </p>
            </a>
            <p>
              <strong>Phone Number:</strong> {order.shippingAddress.phoneNumber}
            </p>
            <p>
              <strong>Address: </strong>
              {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}
            </p>
            {order.isDelivered ? <p>Delivered on {order.deliveredAt}</p> : <p className="bg-red-200 p-2 mb-2 text-black">Not Delivered</p>}
          </Shipping>

          <PaymentMethod className="pb-1 border-b-2 border-secondary text-secondary">
            <h2 className="text-lg font-bold leading-10">PAYMENT METHOD</h2>
            <p>
              <strong>Method: </strong> {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <p className="bg-green-500 p-2 text-black ">Paid on {order.paidAt}</p>
            ) : (
              <p className="bg-red-200 p-2 text-lg text-black">Not Paid</p>
            )}
          </PaymentMethod>

          <OrderItems className="pb-1 border-b-2 border-secondary text-secondary lg:text-lg">
            <h2 className="font-bold text-lg leading-10">Order Items</h2>
            {order.orderItems.length === 0 ? (
              <p className="text-secondary p-2 bg-red-300">Order is Empty</p>
            ) : (
              <div className="orderItems">
                {order.orderItems.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center space-x-1 md:space-x-3 ">
                      <img src={item.image} alt={item.name} className="w-12 h-12" />
                      <Link className="flex-1" to={`/product/${item.product}`}>
                        {item.name}
                      </Link>
                      <div className="w-36 lg:w-56">
                        {item.qty} <span>&#215;</span> Rs.{item.price}= Rs.{item.qty * item.price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </OrderItems>
        </LeftContainer>

        <OrderSummaryRight className="lg:w-96 bg-white pb-3 shadow-lg  text-lg">
          <h2 className="text-bold text-lg p-2 leading-10">Order Summary</h2>
          <div className="flex flex-col">
            <div className="flex justify-between p-2 border border-secondary">
              <div>Items:</div>
              <div>Rs.{numberWithCommas(order.itemPrice)}</div>
            </div>
            <div className="flex justify-between p-2 border border-secondary">
              <div>Shipping:</div>
              <div>Rs. {order.shippingPrice}</div>
            </div>
            <div className="flex justify-between p-2 mb-2 border border-secondary">
              <div>Item total</div>
              <div>Rs. {numberWithCommas(order.totalPrice)}</div>
            </div>
            {!order.isPaid && (
              <div>
                {loadingPay && <Loader />}
                {!sdkReady ? <Loader /> : <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />}
                {console.log(loadingPay)}
              </div>
            )}
          </div>
        </OrderSummaryRight>
      </FlexContainer>
    </OrderScreenStyle>
  )
}
