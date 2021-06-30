import React from 'react'
import styled from 'styled-components'

const OrderScreenStyle = styled.div``

export default function OrderScreen({ match }) {
  return <OrderScreenStyle>Order Screen of {match.params.id}</OrderScreenStyle>
}
