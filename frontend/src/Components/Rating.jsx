import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import StarHalfIcon from '@material-ui/icons/StarHalf'

export default function Rating({ value, text, color }) {
  return (
    <div className="flex items-center space-x-3 pt-2">
      <div className="flex items-center ">
        {[...Array(Math.ceil(value)).keys()].map((x) => (
          <span className=" text-red-500">
            {value >= x + 1 ? (
              <StarIcon />
            ) : value > (x + 1) / 2 ? (
              <StarHalfIcon />
            ) : (
              <StarBorderIcon />
            )}
          </span>
        ))}
      </div>
      <span className="text-gray-500">{text && `( ${text} reviews )`}</span>
    </div>
  )
}
Rating.defaultProps = {
  color: '#f8e825',
}
