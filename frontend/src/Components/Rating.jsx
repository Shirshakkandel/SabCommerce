import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import StarHalfIcon from '@material-ui/icons/StarHalf'

export default function Rating({ value, text, color }) {
  return (
    <div className="flex items-center space-x-3 ">
      <div className="flex items-center text text-gray-500">
        {[...Array(5).keys()].map((x) => (
          <span className="-ml-1">
            {value >= x + 1 ? (
              <StarIcon style={{ color: color }} />
            ) : value >= x + 1 / 2 ? (
              <StarHalfIcon style={{ color: color }} />
            ) : (
              <StarBorderIcon />
            )}
          </span>
        ))}
      </div>
      {text && <span className="text-gray-500">{`${text} reviews`}</span>}
    </div>
  )
}
Rating.defaultProps = {
  color: '#FFC60B',
}
