import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'

import { addToCart, removeFromCart } from '../../store/action/cartActions'

export default function SingleCartItem({ product, name, image, price, countInStock, qty }) {
  const [subDisable, setSubDisable] = useState(false)
  const [addDisable, setAddDisable] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (qty <= 1) {
      setSubDisable(true)
    } else {
      setSubDisable(false)
    }
    if (qty >= countInStock) {
      setAddDisable(true)
    } else {
      setAddDisable(false)
    }
  }, [qty, countInStock])

  function handleQty(direction) {
    const item = { product, name, image, price, countInStock, qty }
    console.log(item)
    if (direction === 'sub') {
      if (qty <= 1) {
        qty = 1
      } else {
        dispatch(addToCart(qty - 1, item))
      }
    }
    if (direction === 'add') {
      dispatch(addToCart(qty + 1, item))
    }
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <div className="md:cursor-pointer mt-4 flex flex-wrap text-secondary relative overflow-hidden  pb-10 md:pb-10 border-b-2  focus:outline-none active:outline-none">
      {/* Image */}
      <div className="">
        <div className="relative overflow-hidden block">
          <Link to={`/product/${product}`}>
            <img
              src={image}
              alt={`${name} cart Items`}
              className={`w-28 h-28 sm:2-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 object-fill object-top ${
                countInStock <= 5 && 'h-40 w-32 object-fill'
              }`}
            />
          </Link>
        </div>
      </div>

      {/* right */}
      <div className="pl-2  flex-1 space-y-2 md:space-y-1">
        <div className=" text-secondary  md:text-lg">{name}</div>

        {/* Qty  */}
        <div className="flex space-x-1 md:space-x-3">
          <label htmlFor="qty" className="my-auto md:text-lg font-semibold">
            Quantity :
          </label>
          <div className="flex border border-secondary" id="qty">
            <button
              type="button"
              disabled={subDisable}
              onClick={() => handleQty('sub')}
              className="focus:outline-none  bg-gray-200 disabled:cursor-not-allowed disabled:opacity-75 block h-full text-secondary  border-r border-secondary hover:text-secondary"
            >
              <RemoveIcon />
            </button>

            <input type="text" className="w-8 lg:w-16 text-center border-r border-secondary" value={qty} />

            <button
              onClick={() => handleQty('add')}
              disabled={addDisable}
              className="grid place-items-center px-1  disabled:cursor-not-allowed disabled:opacity-75 bg-gray-200 focus:outline-none"
            >
              <AddIcon />
            </button>
          </div>
        </div>
        {/* Qty End */}
        {countInStock <= 5 && <p className="text-red-500 text-xs">Only {countInStock} items in stock</p>}
        <div className="flex space-x-2 lg:text-lg font-semibold pt-0.5">
          <p className="">Price : </p>
          <p>Rs.{numberWithCommas(price)}</p>
        </div>
      </div>

      {/*  absolute buttom  left navigation */}

      <div className=" h-8 flex justify-center  border  border-base absolute left-0 bottom-1  w-28 sm:w-32 md:w-36 lg:w-40">
        <button
          tabIndex="0"
          title="update your favourites"
          className="my-auto w-1/2 h-full  hover:text-yellow-400 text-center border-r border-base focus:outline-none disabled:cursor-not-allowed"
        >
          <FavoriteBorderIcon />
        </button>

        <div
          onClick={() => {
            dispatch(removeFromCart(product))
          }}
          className="my-auto w-1/2 hover:text-red-500 text-center focus:outline-none "
          tabIndex="0"
          title="Remove from Cart"
        >
          <DeleteOutlineIcon />
        </div>
      </div>

      {/* absolute bottom right navigation */}
      <div className="absolute flex right-1 bottom-1 px-4 h-8 border border-gray-100">
        <div className="my-auto text-sm lg:text-lg font-semibold">
          Sub-Total: <span className="text-secondary">{numberWithCommas(qty * price)}</span>
        </div>
      </div>
    </div>
  )
}
