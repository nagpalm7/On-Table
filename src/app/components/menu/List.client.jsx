'use client';

import React from 'react';
import ListCard from '@/app/components/menu/ListCard';

export default function ListCategory({ category, order, handleAddItem, handleRemoveItem }) {
    return (
        <div key={category.name} className="collapse collapse-arrow">
            <input type="checkbox" className="peer" defaultChecked={true} />
            <div className="collapse-title font-semibold" id={category.name}>
                {category.name}
            </div>
            <div className="collapse-content gap-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-4">
                {category.items.map((item) => (
                    <ListCard
                        key={item._id}
                        item={item}
                        order={order}
                        handleAddItem={handleAddItem}
                        handleRemoveItem={handleRemoveItem}
                    />
                ))}
            </div>
        </div>
    );
}
