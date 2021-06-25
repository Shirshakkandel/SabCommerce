import React from 'react'
import { CircularProgress } from '@material-ui/core'
export default function Loader() {
  return (
    <div className="flex justify-center items-center w-full py-40">
      <CircularProgress size="100px" color="red" />
    </div>
  )
}
