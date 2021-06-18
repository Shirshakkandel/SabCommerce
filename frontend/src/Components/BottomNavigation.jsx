import React from 'react'
import { Link } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'
import CategoryIcon from '@material-ui/icons/Category'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

export default function BottomNavigation() {
  return (
    <div className="py-1 border-primary bg-primary  shadow text-center block fixed bottom-0 w-full lg:hidden">
      <div className="container px-2 md:px-4">
        <ul className="flex justify-between px-2 item-center pt-2">
          <li className="">
            <Link to="/">
              <HomeIcon />
              <h6>Home</h6>
            </Link>
          </li>
          <li>
            <Link to="/category">
              <CategoryIcon />
              <h6>Categories</h6>
            </Link>
          </li>
          <li className="relative">
            <Link to="/cart">
              <ShoppingCartIcon />
              <h6>Cart</h6>
              <span className="absolute -top-2 -right-2 rounded-full bg-yellow-500  text-xs w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
          </li>

          <li className="relative">
            <Link to="profile">
              <AccountCircleIcon />
              <h6>Profile</h6>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
