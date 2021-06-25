import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { useHistory } from 'react-router-dom'
import Rating from './Rating'
import Loader from './Loader'
import Error from './Error'
import { listProducts } from '../store/action/productAction'

const ProductStyle = styled.div``
const PaginationStyle = styled.div``

export default function AllProduct({ match }) {
  const heading = useRef(null)
  // const history = useHistory()
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { error, products, page, pages, loading } = productList
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <div className="py-5 lg:py-10">
      {/* Header Title */}
      <h2
        className="font-semibold text-xl md:text-2xl text-gray-700"
        ref={heading}
      >
        All Products
      </h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error error={error} />
      ) : (
        <div className="space-y-3">
          <ProductStyle className="pt-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
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
                <Link
                  onClick={() => window.scrollTo(0, 0)}
                  to={`/product/${_id}`}
                  className="space-y-4 p-4  hover:scale-110 transform transition-all duration-300"
                  style={{ background: 'rgb(225, 229, 236)' }}
                >
                  <div className="">
                    <img
                      src={product.image}
                      alt="Product"
                      className="hover:scale-110"
                    />
                  </div>
                  <div className="px-2 ">
                    <h3 className=" font-normal text-sm">{name}</h3>
                    <h3 className=" font-semibold pt-2 text-red-500">
                      Rs.{numberWithCommas(price)}
                    </h3>
                    <Rating value={product.rating} text={product.numReviews} />
                  </div>
                </Link>
              )
            })}
          </ProductStyle>
          {pages > 1 && (
            <PaginationStyle className="h-14 flex justify-end space-x-2">
              {[...Array(pages).keys()].map((x, key) => (
                <Link
                  key={key}
                  onClick={() =>
                    window.scrollTo(0, heading.current.offsetTop - 80)
                  }
                  to={
                    keyword
                      ? `/search/${keyword}/page/${x + 1}`
                      : `/page/${x + 1}`
                  }
                >
                  <div
                    className={`px-2 py-2 bg-gray-200 ${
                      x + 1 == pageNumber && 'bg-green-500'
                    }`}
                  >
                    {x + 1}
                  </div>
                </Link>
              ))}
            </PaginationStyle>
          )}
        </div>
      )}
    </div>
  )
}
