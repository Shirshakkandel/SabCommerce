import React from 'react'
import { Link } from 'react-router-dom'
export default function ProductCard({
  slug,
  name,
  image,
  discountFrom,
  originalAmount,
}) {
  return (
    <Link
      to={`/product-detail/${slug}`}
      className="p-2 product-card space-y-3 bg-white hover:scale-110 transform transition-all duration-300"
    >
      <div className="pt-4 pb-0 ">
        <img src={image} alt={name} />
      </div>
      <p className="text-center text-gray-600">{name}</p>
      <div className="flex justify-center items-center space-x-4">
        <del className="text-sm text-gray-400 font-semibold">
          Rs. {discountFrom}
        </del>
        <div className="text-tertiary font-semibold">Rs. {originalAmount}</div>
      </div>
    </Link>
  )
}
