import React from 'react'
import Card from '@/app/components/common/Card'
import Table from '@/app/components/Table';
import { deletMenuItem, fetchMenuItems, updateMenuItemAvailability } from '@/actions/menuItem';
import Link from 'next/link';
import { base_url_cloudinary } from '@/app/utils/constants';
import ToggleForm from '@/app/components/common/ToggleForm';

const MenuItemListPage = async ({searchParams}) => {
    const { rid, cid } = await searchParams;
    const menuItems = await fetchMenuItems(rid, cid);
    return (
        <div>
            <Card
                title={"Food Items"}
                body={
                    <Table
                        header={[
                            "Name", 
                            "Description" ,
                            "Restaurant", 
                            "Categories",
                            "Variants",
                            "Image",
                            "Available"
                        ]}
                        rows={menuItems.map(menuItem => ({
                                "Name": menuItem?.name,
                                "Description": menuItem?.description,
                                "Restaurant": `${menuItem?.restaurant?.name} [ ${menuItem?.restaurant?.location} ]`,
                                "Categories": (
                                    <span className="whitespace-pre-line">
                                        {menuItem?.categories.map(category => category?.name).join("\n")}
                                    </span>
                                ),
                                "Variants": (
                                    <span className="whitespace-pre-line">
                                        {menuItem?.variants.map(variant => (`${variant?.name} [ ₹${variant?.price} ]`)).join("\n")}
                                    </span>
                                ),
                                "Image": menuItem?.image && <Link href={base_url_cloudinary + menuItem?.image + ".webp"} target="_blank" className='link link-primary'>Image Link</Link>,
                                "Available": <ToggleForm
                                                name={"available"}
                                                id={menuItem?._id}
                                                action={updateMenuItemAvailability}
                                                defaultValue={menuItem?.available}
                                            />,
                                "ID": menuItem?._id,
                            })
                        )}
                        deleteAction={deletMenuItem}
                    />
                }
            />
        </div>
    )
}

export default MenuItemListPage;