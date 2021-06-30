import React, { useEffect } from 'react'
import CheckoutSteps from './CheckoutSteps'
import ShippingForm from './ShippingForm'
import styled from 'styled-components/macro'
import { useSelector } from 'react-redux'
const ShippingStyle = styled.div`
  ul.breadcrumb li + li::before {
    content: '>';
    margin: 0 5px;
    color: #635f5f;
  }
`

const Flex = styled.div``

export default function ShippingScreen({ history }) {
  const login = useSelector((state) => state.userLogin)
  const { userInfo } = login

  useEffect(() => {
    if (!userInfo) {
      history.push('/login?redirect=/shipping')
    }
  }, [userInfo, history])

  return (
    <ShippingStyle className="flex flex-col px-5 xl:px-28 fonts-sans bg-gray-50 py-5">
      {/* Breadcrum */}
      <CheckoutSteps step1 step2 />

      <Flex className="lg:flex lg:space-x-6">
        <ShippingForm />
      </Flex>
    </ShippingStyle>
  )
}
