import React, { useEffect, useState } from 'react'
import Rating from '../../Components/Rating'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import axios from 'axios'
import Processing from '../../Components/Common/Processing'
import { listProductDetails } from '../../store/action/productAction'
const RatingPart = styled.div``
const ReviewDetail = styled.div``
const WriteReview = styled.div``

export default function UserRating() {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const productDetails = useSelector((state) => state.productDetails)
  const { product, error } = productDetails
  const { reviews } = product
  const [serverError, setServerError] = useState('')
  const [serverResponse, setServerResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const [review, setReview] = useState({
    rating: '',
    comment: '',
    errors: {
      rating: '',
      comment: '',
    },
  })
  const { rating, comment } = review

  const countRating = (x) =>
    reviews.filter((review) => review.rating === x).length

  function handleErrors() {
    const { errors } = review

    let result = true
    if (!rating.trim()) {
      errors.rating = 'Rating cannot be empty'
      result = false
    } else if (Number(rating) > 5) {
      errors.rating = 'Rating cannot be above 5 '
      result = false
    }
    if (!comment.trim()) {
      errors.comment = 'Comment cannot be empty'
      result = false
    }
    setReview({
      ...review,
      errors,
    })
    return result
  }

  async function submitComment(e) {
    e.preventDefault()
    const goAhead = handleErrors()
    alert(goAhead)

    if (goAhead) {
      setReview({ ...review, errors: '' })
      try {
        setLoading(true)
        const { data } = await axios.post(
          `/api/products/${product._id}/reviews`,
          {
            rating,
            comment,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        )
        if (data) {
          setServerResponse(data.message)
          setLoading(false)
          window.scrollTo(100, 100)
          dispatch(listProductDetails(product._id))
        }
      } catch (error) {
        setServerError(
          error.response ? error.response.data.message : error.message
        )
        setLoading(false)
      }
    }
  }

  const {
    errors: { rating: ratingError, comment: commentError },
  } = review

  return (
    <div className="">
      <h2 className="text-base lg:text-xl py-2 px-3 bg-gray-800 ">
        Product Rating and Reviews
      </h2>
      {product.numReviews > 0 ? (
        <div className="flex flex-col space-y-2 mt-2">
          <RatingPart
            className="flex flex-col lg:flex-row  lg:space-x-3"
            style={{ background: '#f5f5f5' }}
          >
            <div className="w-48 lg:w-52 m-auto lg:m-0 lg:my-auto  text-center lg:border-r border-gray-300">
              <div className="flex justify-center">
                <h2 className="text-4xl">{product.rating.toFixed(1)}/5</h2>
              </div>
              <div className="flex justify-center">
                <Rating value={product.rating} />
              </div>
              <div className="">{product.numReviews} Ratings</div>
            </div>
            <div className="space-y-1 px-2">
              {[...Array(5).keys()].reverse().map((num, key) => (
                <div className="flex" key={key}>
                  <Rating value={num + 1} />
                  <span className="relative ml-2 w-full md:w-48 bg-primary lg:w-56 h-1 my-auto">
                    <span className="absolute left-0 h-1 bg-yellow-400 w-full"></span>
                  </span>
                  <span className="my-auto ml-1 font-bold justify-items-end">
                    {countRating(num + 1)}
                  </span>
                </div>
              ))}
            </div>
          </RatingPart>

          <ReviewDetail>
            <h3 className="px-2 text-lg border-t border-primary bg-primary text-secondary w-full ">
              Review
            </h3>
            <div className="title-block py-2 mb-1 last:mb-0 bg-primary px-2">
              {product.reviews.map((review, index) => {
                const rawDate = new Date(review.updatedAt)
                const updatedAt = `${rawDate.getDate()} ${
                  rawDate.getMonth() + 1
                } ${rawDate.getFullYear()}`

                const { name, comment, rating } = review
                return (
                  <div className="py-2" key={index}>
                    <p>
                      By
                      <span className="font-bold mx-1">{name}</span>
                      <span>( {updatedAt} )</span>
                    </p>
                    <Rating value={rating} />
                    <p className="text-sm md:text-lg text-secondary ">
                      {comment}
                    </p>
                  </div>
                )
              })}
            </div>
          </ReviewDetail>
        </div>
      ) : (
        <div className="text-lg pl-2">No Review yet.</div>
      )}

      <WriteReview className="pb-3 bg-gray-100 ">
        <h2 className="bg-gray-800 text-base text-xl px-2 py-2 ">
          Write a Customer Review
        </h2>
        {userInfo ? (
          <form
            onSubmit={submitComment}
            className="flex flex-col w-full space-y-2 "
          >
            <div className="space-y-1 px-3 pt-2">
              <label htmlFor="rating" className=" w-full  font-bold">
                Rating <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name=""
                  id="rating"
                  className="h-10 appearance-none focus:outline-none px-2  w-full "
                  onChange={(e) => {
                    setReview({ ...review, rating: e.target.value })
                  }}
                >
                  <option value="">Select...</option>
                  <option value="1">1 -Poor</option>
                  <option value="2">2 -Fair</option>
                  <option value="3">3 -Good</option>
                  <option value="4">4 -Very Good</option>
                  <option value="5">5 -Excellent</option>
                </select>
                <ExpandMoreIcon className="absolute top-2 right-2 bg-red" />
              </div>
              <p>
                {ratingError && (
                  <p className="text-red-500 text-sm font-medium">
                    {ratingError}
                  </p>
                )}
              </p>
            </div>

            <div className="space-y-2 px-3 pt-1 w-full flex flex-col">
              <label htmlFor="comment" className="w-full font-bold">
                Comment <span className="text-red-500">*</span>
              </label>
              <textarea
                onChange={(e) =>
                  setReview({ ...review, comment: e.target.value.trim() })
                }
                id="comment"
                className="w-full p-2 focus:outline-none focus:border focus:border-red-500"
                rows="3"
              ></textarea>
              {commentError && (
                <p className="text-red-500 font-medium">{commentError}</p>
              )}
              <div className="relative" style={{ hover: '' }}>
                <div className="text relative  space-x-2">
                  <button
                    type="submit"
                    className="bg-gray-500 relative flex justify-center items-center space-x-2 md:mx-auto  w-full  md:w-48 lg:w-80  h-10 text-base focus:outline-none"
                  >
                    <div>Submit</div>
                    {loading && <Processing />}
                  </button>
                </div>
                <div className="bg absolute h-0"></div>
              </div>
              {serverError && (
                <p className="text-red-500 font-bold mx-auto">{serverError}</p>
              )}
              {serverResponse && (
                <p className="text-green-500 text-bold mx-2">
                  {serverResponse}
                </p>
              )}
            </div>
          </form>
        ) : (
          <p className="px-5 lg:px-10 text-lg py-1">
            Please Sign in to write review
          </p>
        )}
      </WriteReview>
    </div>
  )
}
