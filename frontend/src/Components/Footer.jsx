import React from 'react'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import TwitterIcon from '@material-ui/icons/Twitter'
import Esewa from '../assets/images/esewa.jpg'
import Khalti from '../assets/images/khalti.png'
import MasterCard from '../assets/images/masterCard.png'
import companyLogo from '../assets/images/ecommerce-logo.png'
export default function Footer() {
  return (
    <div className="bg-footer text-sm  px-5 lg:px-20 py-20 md:py-14 lg:py-5 text-gray-300 font-Rubik">
      <div className="grid sm:grid-cols-2  lg:grid-cols-4 gap-8 ">
        {/* Company Detail */}
        <div className="flex flex-col">
          <img
            src={companyLogo}
            alt="Comapany Logo"
            className="w-20 font-extrabold"
            style={{ marginTop: '-20px' }}
          />
          <p className="text-white">
            SabFeed is a food ordering company located in Chitwan. Our service
            to provide healthy, quality and tasty food for Individual and
            Company Employee in decent price under 30 minutes of food order
          </p>
        </div>

        {/* Payment Method */}
        <div className="flex flex-col lg:pl-10">
          <h2 className="title text-gray-300 text-lg pb-4">Payment Methods</h2>
          <div className="space-y-2 text-white">
            <p>Cash on Delivery</p>
            <div className="flex space-x-3 py-2">
              <img src={Esewa} alt="Esewa" className="w-10" />
              <img src={Khalti} alt="Khalti" className="w-10" />
              <img src={MasterCard} alt="Visa" className="w-10" />
            </div>
          </div>
        </div>

        {/* Delivery Charge */}
        <div className="flex flex-col">
          <h2 className=" text-gray-300 text-lg pb-4">Delivery Charge</h2>
          <p className="text-white">
            Only Rs 35 and free for food costs Rs 500
          </p>
        </div>
        {/* Contanct Us */}
        <div className="flex flex-col">
          <h2 className="font-bold  text-lg pb-4">Contanct Us</h2>
          <div className="space-y-2 text-white">
            <div className="flex  whitespace-nowrap">
              <p className="w-20 flex-shrink-0">Phone:</p>
              <p>+9846863569</p>
            </div>
            <div className="flex  whitespace-nowrap">
              <p className="w-20 flex-shrink-0">Email:</p>
              <p>shirshakkandel@gmail.com</p>
            </div>
            <div className="flex  whitespace-nowrap">
              <p className="w-20 flex-shrink-0">Address:</p>
              <p>Bharatpur-2, Chitwan</p>
            </div>

            <div className="flex  whitespace-nowrap">
              <p className="w-20 flex-shrink-0">Social:</p>
              <span className="space-x-1">
                <FacebookIcon /> <InstagramIcon /> <TwitterIcon />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-300 font-mono pt-2">
        Copyright By SabTech.All Right is reserved
      </div>
    </div>
  )
}
