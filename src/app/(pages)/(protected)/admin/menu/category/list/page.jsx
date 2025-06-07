import React from 'react'
import { fetchCategories } from '@/actions/menu';
import Card from '@/app/components/Card'
import Table from '@/app/components/Table';

const RestaurantListPage = async ({searchParams}) => {
    const { rid } = await searchParams;
    const categories = await fetchCategories(rid);
    return (
        <div>
            <Card
                title={"Restaurants"}
                body={
                    <Table
                        header={["Name", "Restaurant Name", "Restaurant Location"]}
                        rows={categories.map(category => ({
                                "Name": category.name,
                                "Restaurant Name": category.restaurant.name,
                                "Restaurant Location": category.restaurant.location,
                                "ID": category._id,
                            })
                        )}
                        deleteAction={null}
                    />
                }
            />
        </div>
    )
}

export default RestaurantListPage;