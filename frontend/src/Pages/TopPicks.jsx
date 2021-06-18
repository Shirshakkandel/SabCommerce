import React from 'react'
import { Link } from 'react-router-dom'
import watchImage from '../assets/images/homepage/watch.jpg'
import ProductCard from '../Components/ProductCard'
export default function TopPicks() {
  const products = [
    {
      slug: 'watch-1',
      name: 'Watch',
      image: watchImage,
      discountFrom: 2000,
      originalAmount: 1800,
    },
    {
      slug: 'watch-2',
      name: 'Watch',
      image: watchImage,
      originalAmount: 1800,
    },
    {
      slug: 'watch-3',
      name: 'Watch',
      image: watchImage,
      discountFrom: 2000,
      originalAmount: 1800,
    },
    {
      slug: 'watch-4',
      name: 'Watch',
      image: watchImage,
      discountFrom: 2000,
      originalAmount: 1800,
    },
    {
      slug: 'watch-5',
      name: 'Watch',
      image: watchImage,
      originalAmount: 1800,
    },
  ]
  return (
    <div className="px-8 md:px-14 lg-px-20 py-10 lg:py-20 bg-gray-50">
      {/* Top Title */}
      <div className="flex justify-between">
        <h2 className="font-semibold text-xl md:text-2xl text-gray-700">
          Top Picks
        </h2>
        <Link
          to="/showMore"
          className="px-3 py-2 bg-tertiary text-white text-sm  "
        >
          Show More
        </Link>
      </div>
      {/* Top Picks product section */}
      <div className="pt-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {products.map((product, key) => (
          <ProductCard key={key} {...product} />
        ))}
      </div>
    </div>
  )
}
