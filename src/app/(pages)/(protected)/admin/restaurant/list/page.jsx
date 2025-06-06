import { deleteRestaurant, fetchRestaurants } from '@/actions/restaurant';
import Card from '@/app/components/Card'
import Table from '@/app/components/Table';
import React from 'react'

const RestaurantListPage = async () => {
  const restaurants = await fetchRestaurants();
  console.log(restaurants);
  return (
    <div>
      <Card
        title={"Restaurants"}
        body={
          <Table
            header={["Name", "Location", "Owner", "Logo", "ID"]}
            rows={restaurants.map(restaurant => ({
                "Name": restaurant.name,
                "Location": restaurant.location,
                "Owner": restaurant.owners.map(owner => `${owner.name} [ ${owner.email} ]`).join('\n'),
                "Logo": restaurant.logo && <img src={restaurant.logo} alt="Logo" className="w-12 h-12 rounded-full" />,
                "ID": restaurant._id,
              })
            )}
            deleteAction={deleteRestaurant}
            editAction={""}
        />
        }
      />
    </div>
  )
}

export default RestaurantListPage;