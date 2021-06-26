import React from 'react'
import { Link } from 'react-router-dom'

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'

export default function SingleCartItem({ _id, name, image, price, countInStock, qty }) {
  return (
    <div className="mt-4 flex-wrap text-secondary relative overflow-hidden cursor-pointer pb-10 border-b border-primary">
      <div className="mr-2 sm:mr-4">
        <div className="relative overflow-hidden block">
          <Link to={`/product/${_id}`} className="focus:outline-none">
            <img
              src={image}
              alt={`${name} cart Items`}
              className="p-1 w-28 h-28 sm:2-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 object-contain object-top"
            />
          </Link>
        </div>
      </div>

      <div className="h-8 flex justify-center border border-b-0 border-primary absolute left-0 buttom-0 w-28 sm:w-32 md:w-36 lg:w-40">
        <button
          tabIndex="0"
          title="update your favourites"
          className="my-auto w-1/2 mr-2 hover:text-yellow-400 text-center border-r border-primary focus:outline-none disabled:cursor-not-allowed"
        >
          <FavoriteBorderIcon />
        </button>
        <div className="w-1" />
        <div
          className="my-auto hover:text-red-500 text-center focus:outline-none w-1/2"
          tabIndex="0"
          title="Remove from Cart"
        >
          <DeleteOutlineIcon />
        </div>
      </div>
    </div>
  )
}
