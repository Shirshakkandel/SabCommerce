import React from 'react'
import Carousel from '../Components/Carousel'
import TopPicks from './TopPicks'
import { Route } from 'react-router-dom'
import AllProduct from '../Components/AllProduct'

export default function Home({ match }) {
  const keyword = match.params.keyword

  return (
    <>
      {keyword ? (
        <div className="bg-gray-50 px-8 md:px-14 lg:px-20">
          <Route render={({ match }) => <AllProduct match={match} />} />
        </div>
      ) : (
        <>
          <Carousel />
          <div className="bg-gray-50 px-8 md:px-14 lg:px-20">
            <TopPicks />
            <Route render={({ match }) => <AllProduct match={match} />} />
          </div>
        </>
      )}
    </>
  )
}
