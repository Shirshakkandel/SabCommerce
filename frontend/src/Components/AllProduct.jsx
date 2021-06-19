import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Rating from './Rating'

export default function AllProduct() {
  const productList = useSelector((state) => state.productList)
  const { error, products, page, pages } = productList

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  return (
    <div className="py-5 lg:py-10">
      {/* Header Title */}
      <h2 className="font-semibold text-xl md:text-2xl text-gray-700">
        All Products
      </h2>
      {/* All Products  */}
      <div className="pt-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product, key) => {
          const {
            rating,
            numReviews,
            price,
            countInStock,
            _id,
            name,
            image,
            brand,
          } = product
          return (
            <Link to="/" className="space-y-4">
              <div className="">
                <img src={product.image} alt="" />
              </div>

              <div className="px-2 ">
                <h3 className=" font-normal text-sm">{name}</h3>
                <h3 className=" font-semibold pt-2 text-red-500">
                  Rs.{numberWithCommas(price)}
                </h3>
                <Rating value={2.5} text={5} />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
