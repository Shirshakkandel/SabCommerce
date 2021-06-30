import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'
import { useSelector } from 'react-redux'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

export default function HeaderMiddle() {
  const [keyword, setKeyword] = useState('')
  const history = useHistory()
  const [stickyNav, setStickyNav] = useState(false)
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  window.onscroll = () => {
    setStickyNav(window.pageYOffset === 0 ? false : true)
    return () => (window.onscroll = null)
  }

  function handleSearch(e) {
    e.preventDefault()
    if (keyword.trim()) {
      window.scrollTo(0, 0)
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <div
      id="middle"
      className={`bg-primary z-50 ${stickyNav && 'shadow  fixed top-0 inset-x-0 animation '}`}
    >
      <div className="flex justify-between px-4 sm:px-8 md:px-14 lg:px-20  space-x-4 sm:space-x-6 lg:space-x-28 items-center">
        <Link to="/">
          <img
            src="/images/ecommerce-logo.png"
            alt="Company Logo"
            className="h-16 w-auto object-cover"
          />
        </Link>
        <form onSubmit={handleSearch} className="flex-1 relative text-black ">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search Somethings"
            className="text-sm text-black  border border-gray-300 w-full pl-4 pr-20 py-2 focus:outline-none focus:border-gray-400 "
          />
          <button
            type="submit"
            className="absolute right-0 top-0 bg-yellow-500 flex items-center px-6 md:px-10 lg:px-12 h-full cursor-pointer focus:outline-none"
          >
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
              {cartItems.length}
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
