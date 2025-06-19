'use client';

import React from 'react';
import ListCard from './ListCard';

const CategoryItems = ({ items, order, handleAddItem, handleRemoveItem }) => {
    return (
        <>
            {items.map((item) => (
                <ListCard
                    key={item._id}
                    item={item}
                    order={order}
                    handleAddItem={handleAddItem}
                    handleRemoveItem={handleRemoveItem}
                />
            ))}
        </>
    );
};

export default CategoryItems;
