import React from 'react'
import styled from 'styled-components/macro'
import { Link, useHistory } from 'react-router-dom'

import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import PaymentIcon from '@material-ui/icons/Payment'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

const FlexCol = styled.div``
const TopNavigation = styled.section`
  ul.breadcrumb li + li::before {
    content: '>';
    margin: 0 5px;
    color: #635f5f;
  }
`
const StepFlex = styled.div``
const LoginSection = styled.div``
const ShippingSection = styled.div``
const PaymentSection = styled.div``
const ConfirmSection = styled.div``

export default function CheckoutSteps({ step1, step2, step3, step4 }) {
  const history = useHistory()
  return (
    <FlexCol className="flex flex-col py-2 bg-gray-50">
      <TopNavigation className="py-2 " id="breadcrumb">
        <ul className="flex space-x-2 item-center breadcrumb ">
          <li className=" text-gray-500 text-sm md:text-lg">Checkout</li>

          {step1 && <li className="text-gray-500 text-sm md:text-lg">Login</li>}

          {step2 && (
            <li className=" text-blue-500 text-sm md:text-lg">
              <Link to="/shipping">Shipping</Link>
            </li>
          )}
          {step3 && (
            <li className=" text-blue-500 text-sm md:text-lg">
              <Link to="/payment">Payment</Link>
            </li>
          )}

          {step4 && (
            <li className=" text-blue-500 text-sm md:text-lg">
              <Link to="/placeOrder">PlaceOrder</Link>
            </li>
          )}
        </ul>
      </TopNavigation>

      <StepFlex className="flex">
        <LoginSection className="flex-1 cursor-pointer   ">
          <button
            onClick={() => history.push('/login')}
            disabled
            className="disabled:cursor-not-allowed disabled:opacity-75 w-full focus:outline-none relative"
          >
            <div className="w-full relative">
              <div
                className={`h-16 w-16 md:w-20 md:h-20 grid place-items-center  bg-white checkoutimgDivA overflow-hidden p-2 z-50 ${
                  step1 ? 'text-yellow-500' : 'text-secondary'
                }`}
                style={{ borderRadius: '100%' }}
              >
                <div
                  className={`border border-dashed grid p-2 place-items-center ${
                    step1 ? 'border-yellow-700' : 'border-secondary'
                  } `}
                  style={{ borderRadius: '100%' }}
                >
                  <ExitToAppIcon className="z-20" style={{ fontSize: '30px' }} />
                  <div
                    className={`absolute top-1/2 ${
                      step1 ? 'w-full' : 'w-0'
                    } w-full left-16 md:left-20 h-0.5 text-bold bg-red-500 z-0  `}
                  >
                    -
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`w-16 md:w-20 text-center text-gray-500 font-bold text-xs md:text-sm lg:text-md py-2 hover:text-secondary`}
            >
              Login
            </div>
          </button>
        </LoginSection>

        <ShippingSection className="flex-1 cursor-pointer   ">
          <button
            onClick={() => history.push('/shipping')}
            disabled={!step2}
            className="disabled:cursor-not-allowed disabled:opacity-75 w-full focus:outline-none relative"
          >
            <div className="w-full relative">
              <div
                className={`h-16 w-16 md:w-20 md:h-20 grid place-items-center  bg-white checkoutimgDivA overflow-hidden p-2 z-50 ${
                  step2 ? 'text-yellow-500' : 'text-secondary'
                }`}
                style={{ borderRadius: '100%' }}
              >
                <div
                  className={`border border-dashed grid p-2 place-items-center ${
                    step2 ? 'border-yellow-700' : 'border-secondary'
                  } `}
                  style={{ borderRadius: '100%' }}
                >
                  <LocalShippingIcon style={{ fontSize: '30px' }} />
                  <div
                    className={`absolute top-1/2 z-0 ${
                      step2 ? 'w-full ' : 'w-0'
                    } w-full left-16 md:left-20 h-0.5 text-bold bg-red-500  `}
                  >
                    -
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`w-16 md:w-20 text-center text-gray-500 font-bold text-xs md:text-sm lg:text-md py-2 hover:text-secondary`}
            >
              Shipping Address
            </div>
          </button>
        </ShippingSection>

        <PaymentSection className="flex-1 cursor-pointer">
          <button
            onClick={() => history.push('/payment')}
            disabled={!step3}
            className="disabled:cursor-not-allowed disabled:opacity-75 w-full focus:outline-none relative"
          >
            <div className="w-full relative">
              <div
                className={` h-16 w-16 md:w-20 md:h-20 grid place-items-center  bg-white checkoutimgDivA overflow-hidden p-2 z-50 ${
                  step3 ? 'text-yellow-500' : 'text-secondary'
                }`}
                style={{ borderRadius: '100%' }}
              >
                <div
                  className={`border border-dashed grid p-2 place-items-center ${
                    step3 ? 'border-yellow-700' : 'border-secondary'
                  } `}
                  style={{ borderRadius: '100%' }}
                >
                  <PaymentIcon className="z-20" style={{ fontSize: '30px' }} />
                  <div
                    className={`absolute top-1/2 ${
                      step3 ? 'w-full ' : 'w-0'
                    } w-full left-16 md:left-20 h-0.5 text-bold bg-red-500  z-0 `}
                  >
                    -
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`w-16 md:w-20 text-center text-gray-500 font-bold text-xs md:text-sm lg:text-md py-2 hover:text-secondary`}
            >
              Payment
            </div>
          </button>
        </PaymentSection>

        <ConfirmSection className="flex-1 cursor-pointer">
          <button
            onClick={() => history.push('/confirmOrder')}
            disabled={!step4}
            className="disabled:cursor-not-allowed disabled:opacity-75 w-full focus:outline-none relative"
          >
            <div className="w-full relative">
              <div
                className={` h-16 w-16 md:w-20 md:h-20 grid place-items-center  bg-white checkoutimgDivA overflow-hidden p-2  ${
                  step4 ? 'text-yellow-500' : 'text-secondary'
                }`}
                style={{ borderRadius: '100%' }}
              >
                <div
                  className={`border border-dashed grid p-2 place-items-center ${
                    step4 ? 'border-yellow-700' : 'border-secondary'
                  } `}
                  style={{ borderRadius: '100%' }}
                >
                  <ExitToAppIcon className="z-20" style={{ fontSize: '30px' }} />
                </div>
              </div>
            </div>

            <div
              className={`w-16 md:w-20 text-center text-gray-500 font-bold text-xs md:text-sm lg:text-md py-2 hover:text-secondary`}
            >
              Confirmation
            </div>
          </button>
        </ConfirmSection>
      </StepFlex>
    </FlexCol>
  )
}
