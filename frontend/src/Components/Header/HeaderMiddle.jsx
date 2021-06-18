import React from 'react'
import { Link } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
export default function HeaderMiddle() {
  return (
    <div className=" bg-primary px-4 sm:px-8 md:px-14 lg:px-20 ">
      <div className="flex justify-between space-x-4 sm:space-x-6 lg:space-x-28 items-center">
        <Link to="/">
          <img
            src="/images/ecommerce-logo.png"
            alt="Company Logo"
            className="h-16 w-auto object-cover"
          />
        </Link>
        <form action="" className="flex-1 relative ">
          <input
            type="text"
            placeholder="Search Somethings"
            className="text-sm md:text-base border  text-black border-gray-300 w-full pl-4 pr-20 py-2 focus:outline-none focus:border-gray-400 "
          />
          <button className="absolute right-0 top-0 bg-yellow-500 flex items-center px-6 md:px-10 lg:px-12 h-full cursor-pointer focus:outline-none">
            <SearchIcon />
          </button>
        </form>

        <div className="headerRight hidden lg:flex space-x-4 items-center">
          <Link className="flex space-x-2" to="/wishList">
            <FavoriteBorderIcon />
            <span>Wishlist</span>
          </Link>

          <Link to="/cart" className="flex space-x-2 relative">
            <ShoppingCartIcon />
            <span>Cart</span>
            <span
              className="absolute w-5 h-5 bg-yellow-300 text-center"
              style={{ top: '-10px', right: '-15px', borderRadius: '100%' }}
            >
              0
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
