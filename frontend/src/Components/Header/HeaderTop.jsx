import React, { useState } from 'react'
import MoreVertTwoToneIcon from '@material-ui/icons/MoreVertTwoTone'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Contact from '../../svg/salephone.svg'
import Viber from '../../svg/viber.svg'
import { Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function HeaderTop() {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const [linkOpen, setLinkOpen] = useState(false)
  const history = useHistory()
  const [open, setOpen] = useState(false)

  function handleLogout() {
    localStorage.removeItem('userInfo')
    document.location.href = '/login'
  }

  return (
    <div className="headerTop px-5 lg:px-20 border-b ">
      <div className="flex items-center justify-between space-x-2 text-sm h-8 md:space-x-10  ">
        <div className="topLeft hidden lg:flex items-center whitespace-nowrap  space-x-1 md:space-x-2">
          <img src={Contact} alt="Phone" title="Phone Call" className="h-5 border-r" />
          <div title="WhatsApp" className="border-r">
            <WhatsAppIcon style={{ fontSize: '20px' }} />
          </div>
          <img src={Viber} alt="Viber" title="Viber" style={{ height: '18px', marginTop: '2px' }} />
          <a className="text-xs font-bold border-r" href="tel:+977-9846863569">
            +977 9846863569
          </a>
        </div>

        <div className="flex space-x-1 cursor-pointer lg:hidden relative">
          <div
            tabIndex="0"
            onClick={() => setLinkOpen(!linkOpen)}
            className="flex flex-col focus:outline-none"
            onBlur={() => setLinkOpen(false)}
          >
            <div className="">
              <MoreVertTwoToneIcon />
              <span>Links</span>
            </div>

            {linkOpen && (
              <div
                className="absolute z-50 bg-gray-100 px-5 py-2 space-y-2 text-secondary rounded text-xs"
                style={{ top: '25px', width: '250%', left: '-10px' }}
              >
                <div
                  className="block hover:text-black hover:translate-x-5"
                  onClick={() => {
                    history.push('/referAndEarn')
                  }}
                >
                  Refer and Earn
                </div>
                <div
                  className="block hover:text-black"
                  // onClick={setLinkOpen(false)}
                >
                  Be a Delivery Boy
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="middle hidden space-x-2 w-11/12 md:flex md:justify-end text-xs font-semibold">
          <div className="flex jusify-end space-x-3">
            <Link to="/referAndEarn">Refer and Earn</Link>
            <Link to="/newDeliveryBoy">Be a delivery Boy</Link>
          </div>
        </div>

        <div className="right flex space-x-3 text-xs whitespace-nowrap font-semibold ">
          {userInfo ? (
            <div className="relative" tabIndex="0" onBlur={() => setOpen(false)}>
              <div className=" cursor-pointer flex space-x-1" onClick={() => setOpen(!open)}>
                <p>{userInfo.name}</p>
                <AccountCircleIcon style={{ fontSize: '18px' }} />
              </div>
              <div
                className={`absolute shadow-lg top-full space-y-1 z-10 bg-white p-2 text-gray-600 sub-category w-full whitespace-nowrap  ${
                  open ? 'opacity - 100 block' : 'opacity-0 hidden '
                }`}
              >
                <div className="hover:bg-gray-400 py-1 px-1 cursor-pointer">
                  <div
                    onClick={() => {
                      setOpen(false)
                      history.push('/profile')
                    }}
                  >
                    Profile
                  </div>
                </div>
                <div className="hover:bg-gray-400 px-1 py-1 cursor-pointer">
                  <div
                    onClick={() => {
                      setOpen(false)
                      history.push('/myOrder')
                    }}
                  >
                    My Order
                  </div>
                </div>
                <div className="hover:bg-gray-400 px-1 py-1 cursor-pointer">
                  <div
                    onClick={() => {
                      setOpen(false)
                      handleLogout()
                    }}
                  >
                    Logout
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}

          <Link className="hidden lg:block" to="/traceOrder">
            Trace Order
          </Link>
        </div>
      </div>
    </div>
  )
}
