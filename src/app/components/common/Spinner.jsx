import React from 'react'

const Spinner = ( { height = "[80vh]"} ) => {
  return (
    <div className={`flex items-center justify-center min-h-${height}`}>
        <span className="loading loading-spinner text-success loading-md" />
    </div>
  )
}

export default Spinner