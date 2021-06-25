import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { listProductDetails } from '../../store/action/productAction'
import Rating from '../../Components/Rating'
import Loader from '../../Components/Loader'
import { Alert, AlertTitle } from '@material-ui/lab'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import AddIcon from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { addToCart } from '../../store/action/cartActions'
import styled from 'styled-components/macro'
import UserRating from './UserRating'

const ProductScreenStyle = styled.div``
const ProductScreenFlex = styled.div``

export default function ProductScreen({ match }) {
  const dispatch = useDispatch()
  const productDetails = useSelector((state) => state.productDetails)
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const { product, error, loading } = productDetails
  const [qty, setQty] = useState(1)
  const [fill, setFill] = useState(false)

  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match.params.id])

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  function handleQty(direction) {
    if (direction === 'decrease') {
      qty <= 1 ? setQty(1) : setQty(qty - 1)
    }
    if (direction === 'increase') {
      qty >= product.countInStock
        ? setQty(product.countInStock)
        : setQty(qty + 1)
    }
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="w-full my-10 px-10 md:px-20">
          <Alert severity="error" className="bg-red-400">
            <AlertTitle>Error</AlertTitle>
            <strong>{error}</strong>
          </Alert>
        </div>
      ) : (
        <ProductScreenStyle className="flex flex-col px-5 md:px-20 xl:px-28 py-5  font-sans bg-gray-50">
          {/* Breadcrumb */}
          <section id="breadcrumb">
            <ul className="flex space-x-3 items-center ">
              <li className="space-x-2">
                <Link to="/" className="text-blue-500 text-lg">
                  Home
                </Link>
                <span className="text-sm text-gray-500">&gt;</span>
              </li>
              <li className="text-lg text-gray-500">{product.category}</li>
            </ul>
          </section>

          <ProductScreenFlex className="space-y-3 lg:space-y-0 mb-2 lg:mb-5 lg:flex lg:space-x-6 lg:mt-5  ">
            {/* Product Image */}
            <div className="image w-full  lg:w-2/4 lg:3/4 md:space-y-2 mx-auto ">
              <img
                src={product.image}
                alt="Product"
                className="w-full h-80 lg:h-96"
              />
            </div>
            {/* Product Info */}
            <div className="info flex-1 space-y-4 bg-white px-4 py-4">
              <h3 className=" font-bold lg:font-medium text-sm lg:text-xl text-secondary">
                {product.name}
              </h3>

              <Rating value={product.rating} text={product.numReviews} />
              {/* Price */}
              <h3 className=" font-bold space-x-2 text-gray-500 text-xl lg:text-2xl border-dashed border-b border-secondary ">
                <span>Price :</span>
                <span>
                  Rs.{product.price && numberWithCommas(product.price)}
                </span>
              </h3>
              {/* Count in Stock */}
              <p
                className={` text-lg ${
                  product.countInStock ? ' text-green-500' : ' text-red-500'
                }`}
              >
                {product.countInStock ? 'In Stock' : 'Out of Stock'}
                <span>
                  {product.countInStock && product.countInStock <= 5
                    ? `Only ${product.countInStock} Items remainning`
                    : ''}
                </span>
              </p>
              {/* qty control */}
              <div className="flex space-x-3 text-secondary text-sm font-normal items-center border-b border-dashed border-secondary p-3">
                <p>Qty:</p>
                <div className="select flex w-40 ">
                  <div
                    className="left p-2 bg-gray-200"
                    onClick={() => {
                      handleQty('decrease')
                    }}
                  >
                    <Remove />
                  </div>
                  <input
                    type="text"
                    className="w-2/4 text-center font-bold"
                    value={qty}
                  />
                  <div
                    className="right p-2 bg-gray-200"
                    onClick={() => {
                      handleQty('increase')
                    }}
                  >
                    <AddIcon />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4  text-primary ">
                <button
                  className="hidden  bg-blue-500 lg:flex justify-center items-center pt-1.5 pb-1.5 focus:outline-none text-lg space-x-2 relative"
                  onClick={() => dispatch(addToCart(qty, product))}
                >
                  <span>
                    <ShoppingCartIcon />
                  </span>
                  Add to Cart
                </button>
                <button className="hidden bg-yellow-500 lg:flex justify-center pt-1.5 pb-1.5 focus-outline-none text-lg ">
                  Buy Now
                </button>
                <div
                  className="flex justify-center space-x-2 items-center text-lg cursor-pointer py-1.5 bg-green-500 "
                  onClick={() => setFill(!fill)}
                >
                  <span>
                    {fill ? (
                      <FavoriteIcon className="text-red-500" />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </span>
                  <div>WishtList</div>
                </div>
              </div>

              {/* Buttom Navigation in mobile  */}
              <div className="h-14 border-t border-primary bg-primary px-2 text-white shadow text-center block fixed inset-x-0 bottom-0 lg:hidden z-50">
                <div className="mx-auto flex h-full items-center">
                  <div className="relative w-10 mr-6 text-secondary">
                    <Link to="/cart">
                      <ShoppingCartIcon />
                      <h6>
                        Cart
                        <span className="absolute -top-1.5 -right-1.5 rounded-full bg-yellow-500 w-4 text-center font-semibold ">
                          {cartItems.length}
                        </span>
                      </h6>
                    </Link>
                  </div>
                  <button
                    className="h-10 bg-blue-700 mr-1 w-1/2"
                    onClick={() => dispatch(addToCart(qty, product))}
                  >
                    <span>
                      <ShoppingCartIcon />
                    </span>
                    Add to Cart
                  </button>
                  <button className="h-10 bg-green-500 mr-1 w-1/2">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </ProductScreenFlex>

          {/* Product Detail */}
          <div className="">
            <h2 className="py-2 px-2 text-base lg:text-xl bg-gray-800 text-base">
              Product Description
            </h2>
            <div className="my-2 px-1 text-sm">{product.description}</div>
          </div>

          <UserRating product={product} />
        </ProductScreenStyle>
      )}
    </>
  )
}
