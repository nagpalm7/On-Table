import React from 'react';
import dynamic from 'next/dynamic';
import Spinner from '@/app/components/common/Spinner';

const ListCategory = dynamic(() => import('@/app/components/menu/List.client'), {
    ssr: false,
    loading: () => <Spinner height={`16`}/>,
});
export default function List({ menu, order, handleAddItem, handleRemoveItem }) {
    return (
        <div>
            <ul className="list">
                {menu.map((category) => (
                    <ListCategory
                        key={category.name}
                        category={category}
                        order={order}
                        handleAddItem={handleAddItem}
                        handleRemoveItem={handleRemoveItem}
                    />
                ))}
            </ul>
        </div>
    );
}
