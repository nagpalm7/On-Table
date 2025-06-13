import React from 'react'
import { delteCategory, fetchCategories } from '@/actions/category';
import Card from '@/app/components/Card'
import Table from '@/app/components/Table';

const CategoryListPage = async ({searchParams}) => {
    const { rid } = await searchParams;
    const categories = await fetchCategories(rid);
    return (
        <div>
            <Card
                title={"Categories"}
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
                        deleteAction={delteCategory}
                    />
                }
            />
        </div>
    )
}

export default CategoryListPage;