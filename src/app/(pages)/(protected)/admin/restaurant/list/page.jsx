import { deleteRestaurant, fetchRestaurants, updateRestaurantStatus } from '@/actions/restaurant';
import Card from '@/app/components/Card'
import Table from '@/app/components/Table';
import ToggleForm from '@/app/components/ToggleForm';
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
            header={["Name", "Location", "Owner", "Logo", "Active"]}
            rows={restaurants.map(restaurant => ({
                "Name": restaurant?.name,
                "Location": restaurant?.location,
                "Owner": (
                    <span className="whitespace-pre-line">
                        {restaurant?.owners.map(owner => `${owner.name} [ ${owner.email} ]`).join('\n')}
                    </span>
                ),
                "Logo": restaurant?.logo && <Link href={base_url_cloudinary + restaurant.logo + ".webp"} target="_blank" className='link link-primary'>Image Link</Link>,
                "ID": restaurant?._id,
                "Active": <ToggleForm
                            name={"active"}
                            id={restaurant?._id}
                            action={updateRestaurantStatus}
                            defaultValue={restaurant?.active}
                          />,
              })
            )}
            deleteAction={deleteRestaurant}
            actions={
              [
                { link: "/admin/menu/category/list?rid=", text: "Categories" },
                { link: "/admin/menu/menu-item/list?rid=", text: "Food Items" }
              ]
            }
          />
        }
      />
    </div>
  )
}

export default RestaurantListPage;