import React from 'react'

const SkeletonList = () => {
  return (
    <div className='m-4'>
        <div className="skeleton w-full h-10 mb-2" />
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-4 gap-2'>
            <div className="skeleton h-60 rounded-md" />
            <div className="skeleton h-60 rounded-md" />
            <div className="skeleton h-60 rounded-md" />
            <div className="skeleton h-60 rounded-md" />
        </div>
    </div> 
  )
}

export default SkeletonList