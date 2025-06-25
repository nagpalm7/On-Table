import Steps from '@/app/components/Steps'
import React from 'react'

const page = ({params}) => {
  return (
    <div>
      <Steps currentStep={4} />
    </div>
  )
}

export default page