import { deleteRestaurant, fetchRestaurants } from '@/actions/restaurant';
import Card from '@/app/components/Card'
import Table from '@/app/components/Table';
import { base_url_cloudinary } from '@/app/utils/constants';
import Link from 'next/link';
import React from 'react'

const RestaurantListPage = async () => {
  const restaurants = await fetchRestaurants();

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
                "Owner": (
                    <span className="whitespace-pre-line">
                        {restaurant?.owners.map(owner => `${owner.name} [ ${owner.email} ]`).join('\n')}
                    </span>
                ),
                "Logo": restaurant?.logo && <Link href={base_url_cloudinary + restaurant.logo + ".webp"} target="_blank" className='link link-primary'>{restaurant.logo}</Link>,
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