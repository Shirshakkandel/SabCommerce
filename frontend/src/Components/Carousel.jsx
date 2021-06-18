import { useEffect, useState } from 'react'
import offerImage from '../assets/images/homepage/offer.png'
import offerImage1 from '../assets/images/homepage/offer1.png'
import offerImage2 from '../assets/images/homepage/offer2.jpg'
import impactImage from '../assets/images/homepage/impact-of-covid.png'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
export default function Carousel() {
  const images = [offerImage, impactImage, offerImage1, offerImage2]
  const [currentSlide, setCurrentSlide] = useState(0)
  const [auto, setAuto] = useState(true)

  useEffect(() => {
    if (auto) {
      setTimeout(() => {
        sliderHandler('right')
      }, 3000)
      // window.removeEventListener(sliderHandler())
    }
  }, [auto, sliderHandler])

  function sliderHandler(direction) {
    if (direction === 'left') {
      setCurrentSlide(currentSlide <= 0 ? images.length - 1 : currentSlide - 1)
    }
    if (direction === 'right') {
      setCurrentSlide(currentSlide >= images.length - 1 ? 0 : currentSlide + 1)
    }
  }
  return (
    <>
      <div className="relative flex h-80 w-full  overflow-hidden">
        <div className="slider flex h-80 w-full absolute">
          {images.map((image, key) => (
            <div
              key={key}
              className={`${
                currentSlide === key
                  ? 'opacity-1 transition duration-700'
                  : ' opacity-0 '
              }  `}
            >
              {key === currentSlide && (
                <img
                  src={image}
                  key={key}
                  className="h-full flex-shrink-0 object-cover"
                  style={{ width: `${images.length * 100}vw` }}
                  alt="Carousel"
                  onClick={() => setAuto(false)}
                />
              )}
            </div>
          ))}
        </div>

        <div className="absolute h-full w-full flex justify-between items-center text-white">
          <div
            className="leftarrow bg-black bg-opacity-50 px-2 py-3 md:px-4 md:py-6 cursor-pointer hover:bg-opacity-70"
            onClick={() => {
              sliderHandler('left')
              setAuto(false)
            }}
            tabIndex="0"
            onBlur={() => setAuto(true)}
          >
            <ArrowBackIosIcon />
          </div>
          <div
            className="rightarrow bg-black bg-opacity-50 px-2 py-3 md:px-4 md:py-6 cursor-pointer hover:bg-opacity-70"
            onClick={() => {
              sliderHandler('right')
              setAuto(false)
            }}
            tabIndex="0"
            onBlur={() => setAuto(true)}
          >
            <ArrowForwardIosIcon />
          </div>
        </div>
      </div>
      <ul className="flex justify-center space-x-2 lg:none bg-gray-50">
        {images.map((image, key) => (
          <li
            key={key}
            className={`${
              currentSlide === key ? 'bg-yellow-500' : 'bg-black'
            } my-1 w-3 h-3 flex items-center justify-center transition duration-700 `}
          >
            <span className="opacity-0"> {key + 1}</span>
          </li>
        ))}
      </ul>
    </>
  )
}
