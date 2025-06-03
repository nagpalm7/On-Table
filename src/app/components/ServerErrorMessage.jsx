import React from 'react'

const ServerErrorMessage = ({errorMessage}) => {
  return (
    <ul className="list-disc validator-hint visible text-error px-4">
        <li>{errorMessage}</li>
    </ul>
  )
}

export default ServerErrorMessage