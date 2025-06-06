import React from 'react'

const Card = ({title, body}) => {
  return (
    <div className='card bg-base-100 shadow-sm m-4' >
        <div className="card-body">
            <h2 className="card-title">{title}</h2>
            {body}
        </div>
    </div>
  )
}

export default Card