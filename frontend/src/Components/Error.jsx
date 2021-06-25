import React from 'react'
import { Alert, AlertTitle } from '@material-ui/lab'
export default function Error({ error = 'Error' }) {
  return (
    <div className="w-full my-10 px-10 md:px-20">
      <Alert severity="error" className="bg-red-400">
        <AlertTitle>Error</AlertTitle>
        <strong>{error}</strong>
      </Alert>
    </div>
  )
}
