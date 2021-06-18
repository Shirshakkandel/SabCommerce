import React from 'react'

import HeaderTop from './HeaderTop'
import HeaderButtom from './HeaderButtom'
import HeaderMiddle from './HeaderMiddle'
export default function Header() {
  return (
    <div className="bg-primary header font-sans">
      <HeaderTop />
      <HeaderMiddle />
      <HeaderButtom />
    </div>
  )
}
