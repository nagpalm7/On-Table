import { deleteRestaurant, fetchRestaurants } from '@/actions/restaurant';
import Card from '@/app/components/Card'
import Table from '@/app/components/Table';
import Link from 'next/link';
import React from 'react'

const RestaurantListPage = async () => {
  const restaurants = await fetchRestaurants();

  const base_url = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/w_200/`

  return (
    <div>
      <Card
        title={"Restaurants"}
        body={
          <Table
            header={["Name", "Location", "Owner", "Logo", "Status"]}
            rows={restaurants.map(restaurant => ({
              "Name": restaurant?.name,
              "Location": restaurant?.location,
              "Owner": restaurant?.owners.map(owner => `${owner.name} [ ${owner.email} ]`).join('\n'),
              "Logo": restaurant?.logo && <Link href={base_url + restaurant.logo + ".webp"} target="_blank" className='link link-primary'>{restaurant.logo}</Link>,
              "ID": restaurant?._id,
              "Status": restaurant?.status === "active" ? "Active" : "Inactive"
            })
            )}
            deleteAction={deleteRestaurant}
            actionLink={"/admin/menu/category/list?rid="}
            actionText={"Categories"}
          />
        }
      />
    </div>
  )
}

export default RestaurantListPage;