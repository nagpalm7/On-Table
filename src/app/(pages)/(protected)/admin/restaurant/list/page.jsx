import Card from '@/app/components/Card'
import Table from '@/app/components/Table';
import React from 'react'

const RestaurantListPage = () => {
  return (
    <div>
        <Card 
            title={"Restaurants"} 
            body={<Table />} 
        />
    </div>
  )
}

export default RestaurantListPage;