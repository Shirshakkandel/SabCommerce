import React from 'react'

export default function Container({ children }) {
  return <div className="flex flex-col px-5 md:px-20 xl:px-28 py-5 bg-gray-50">{children}</div>
}
