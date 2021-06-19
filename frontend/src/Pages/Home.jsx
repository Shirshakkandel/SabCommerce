import React, { useEffect } from 'react'
import Carousel from '../Components/Carousel'
import TopPicks from './TopPicks'
import { useDispatch } from 'react-redux'
import { listProducts } from '../store/action/productAction'
import AllProduct from '../Components/AllProduct'

export default function Home({ match }) {
  const dispatch = useDispatch()
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Carousel />
      <div className="bg-gray-50 px-8 md:px-14 lg:px-20">
        <TopPicks />
        <AllProduct />
      </div>
    </>
  )
}
