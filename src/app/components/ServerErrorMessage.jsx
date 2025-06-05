import React from 'react'

const ServerErrorMessage = ({ errors }) => {
  return (
    <ul className="list-disc validator-hint visible text-error px-4">
      {
        errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))
      }
    </ul>
  )
}

export default ServerErrorMessage