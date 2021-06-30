import React, { useState } from 'react'
import styled from 'styled-components/macro'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useSelector, useDispatch } from 'react-redux'
import { numberWithCommas } from '../../function'
import { saveShippingAddress } from '../../store/action/cartActions'
import { useHistory } from 'react-router-dom'

const ShippingFormStyle = styled.div``
const FlexContainer = styled.div``
const FormLeft = styled.div``
const OrderRight = styled.div``
const GridForm = styled.form``
const SingleInput = styled.div`
  span {
    color: rgba(220, 38, 38, 1);
  }
  select {
    width: 100%;
  }
  .error {
    color: rgba(220, 38, 38, 1);
  }

  input {
    border-width: 1px;
    padding: 10px 8px;
    width: 100%;
    font-size: 0.875rem /* 14px */;
    line-height: 1.25rem /* 20px */;
    :focus {
      outline: 2px solid transparent;
      outline-offset: 2px;
    }
    :focus {
      --tw-border-opacity: 1;
      border-color: rgba(255, 206, 43, var(--tw-border-opacity));
    }
  }
`

export default function ShippingForm() {
  const dispatch = useDispatch()
  const history = useHistory()
  const cart = useSelector((state) => state.cart)
  const { cartItems, shippingAddress } = cart

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0)
  const subPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
  const shippingPrice = subPrice > 500 ? 0 : 50
  const totalPrice = subPrice + shippingPrice

  const [deliveryLocation, setDelivery] = useState({
    fullName: shippingAddress?.fullName,
    phoneNumber: shippingAddress?.phoneNumber,
    address: shippingAddress?.address,
    city: shippingAddress?.city,
    postalCode: shippingAddress?.postalCode,
  })

  function handleChange({ target: { value } }, property) {
    setDelivery({ ...deliveryLocation, [property]: value })
  }

  function insertSpaces(string) {
    string = string.replace(/([a-z])([A-Z])/g, '$1 $2')
    string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    return string
  }

  const { fullName, phoneNumber, address, city, postalCode } = deliveryLocation

  function shippingHandler(e) {
    e.preventDefault()
    dispatch(saveShippingAddress({ fullName, phoneNumber, address, city, postalCode }))
    history.push('/payment')
  }

  return (
    <ShippingFormStyle className="flex-1">
      <FlexContainer className="flex flex-col lg:flex-row lg:space-x-3 space-y-3 lg:space-y-0">
        <FormLeft className=" flex-1 flex-col  shadow-xl rounded-md bg-gray-100 px-5 py-5">
          <div className="block text-gray-600 text-sm font-bold mb-3">Shipping Address</div>
          <GridForm
            onSubmit={shippingHandler}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 "
          >
            {/* Full name */}
            <SingleInput className="space-y-2">
              <label>
                Full Name <span>*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your Full Name"
                value={fullName}
                required
                onChange={(e) => handleChange(e, 'fullName')}
              />
            </SingleInput>
            {/* Phone Number */}
            <SingleInput className="space-y-2">
              <label>
                Phone Number <span>*</span>
              </label>
              <input
                type="number"
                placeholder="Phone Number"
                value={phoneNumber}
                required
                onChange={(e) => handleChange(e, 'phoneNumber')}
              />
            </SingleInput>
            {/* Address */}
            <SingleInput className="md:col-span-2 space-y-2">
              <label>
                Address <span>*</span>
              </label>
              <input
                type="text"
                placeholder="Address"
                value={address}
                required
                onChange={(e) => handleChange(e, 'address')}
              />
            </SingleInput>
            {/* City */}
            <SingleInput className="space-y-2">
              <label htmlFor="">
                City <span>*</span>
              </label>
              <div className="relative">
                <select
                  value={city}
                  onChange={(e) => handleChange(e, 'city')}
                  required
                  className=" py-2.5 px-2 focus:outline-none focus:border-yellow-500 appearance-none w-full bg-white border border-gray-200 text-sm"
                >
                  <option>Select City</option>
                  <option value="bharatpur">Bharatpur</option>
                  <option value="kathmandu">Kathmandu</option>
                  <option value="pokhara">Pokhara</option>
                </select>
                <div className="absolute top-2 right-2">
                  <ExpandMoreIcon />
                </div>
              </div>
            </SingleInput>
            {/* Postal Code */}
            <SingleInput className="space-y-2">
              <label>
                PostalCode <span>*</span>
              </label>
              <input
                type="text"
                placeholder="PostalCode"
                value={postalCode}
                onChange={(e) => handleChange(e, 'postalCode')}
                required
              />
            </SingleInput>
            <div className=" md:col-span-2 flex justify-end w-full ">
              <button className="bg-yellow-500 w-40 px-2 py-3 mt-3">Save</button>
            </div>
          </GridForm>
        </FormLeft>

        <OrderRight className="lg:w-96 bg-gray-100 p-5 space-y-2 h-3/4">
          <div className="block text-lg font-medium">Order Summary</div>

          <div className="flex justify-between text-gray-500">
            <div>Subtotal ({`${totalItems} items`})</div>
            <div>Rs {numberWithCommas(subPrice)}</div>
          </div>

          <div className="flex justify-between text-gray-500">
            <div>Delivery Charge</div>
            <div className="text-secondary">Rs {numberWithCommas(shippingPrice)}</div>
          </div>

          <div className="flex justify-between text-gray-500">
            <div>Total</div>
            <div className="text-secondary">Rs {numberWithCommas(totalPrice)}</div>
          </div>
        </OrderRight>
      </FlexContainer>
    </ShippingFormStyle>
  )
}
