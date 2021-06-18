import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const HeaderMiddleStyle = styled.div`
  .category-container:hover .sub-category {
    display: block;
  }
`

export default function HeaderButtom() {
  const categories = [
    {
      id: 1,
      title: 'Groceries',
      link: '/category/groceries',
      subCategories: [
        {
          title: 'Fruits & Vegetables',
          link: '/category/groceries/subcategory/fruits-and-vegetables',
        },
        {
          title: 'Cooking Essestials',
          link: '/category/groceries/subcategory/cooking-essentials',
        },
        {
          title: 'Sweets & Chocolates',
          link: '/category/groceries/subcategory/sweets-and-chocolates',
        },
        {
          title: 'Frozen Items',
          link: '/category/groceries/subcategory/frozen-items',
        },
        {
          title: 'Bakery',
          link: '/category/groceries/subcategory/bakery',
        },
        {
          title: 'Beverages',
          link: '/category/groceries/subcategory/beverages',
        },
      ],
    },
    {
      id: 2,
      title: 'Civil Mall',
      link: '/category/civil-mall',
    },
    {
      id: 3,
      title: 'Missio',
      link: '/category/missio',
    },
    {
      id: 4,
      title: 'Hygiene',
      link: '/category/hygiene',
    },
    {
      id: 5,
      title: 'Automobiles',
      link: '/category/automobiles',
    },
    {
      id: 6,
      title: 'G-Bar',
      link: '/category/g-bar',
    },
    {
      id: 7,
      title: 'Mobile Accessories',
      link: '/category/mobile-accessories',
    },
    {
      id: 8,
      title: 'Electronics',
      link: '/category/electronics',
    },
    {
      id: 9,
      title: 'Fashion',
      link: '/category/fashion',
    },
    {
      id: 10,
      title: 'Laptop & Computer',
      link: '/category/laptop-and-computer',
    },
    {
      id: 11,
      title: 'Home & Decor',
      link: '/category/home-and-decor',
    },
    {
      id: 12,
      title: 'Sports',
      link: '/category/sports',
    },
    {
      id: 13,
      title: 'Books',
      link: '/category/books',
    },
  ]

  return (
    <HeaderMiddleStyle className="hidden lg:flex text-sm bg-tertiary text-white px-2 sm:px-4 md:px-10 lg:px-16">
      <div className="max-w-8xl mx-auto flex flex-wrap py-2">
        {categories.map((category, index) => {
          const { title, link, subCategories } = category
          return (
            <div className="relative category-container" key={index}>
              <Link
                to={link}
                className="block px-4 py-2 category-name hover:bg-blue-700"
                onClick={() => window.scrollTo(0, 0)}
              >
                {title}
              </Link>
              {Array.isArray(subCategories) && (
                <div className="absolute shadow-lg top-full space-y-1 z-10 bg-white p-2 text-gray-600 sub-category hidden whitespace-nowrap">
                  {subCategories.map((subCategory, index) => {
                    const { title, link } = subCategory
                    return (
                      <Link
                        key={index}
                        to={link}
                        onClick={() => window.scrollTo(0, 0)}
                        className=" px-2 w-auto hover:text-yellow-400 transation-all duration-300 block"
                      >
                        {title}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </HeaderMiddleStyle>
  )
}
