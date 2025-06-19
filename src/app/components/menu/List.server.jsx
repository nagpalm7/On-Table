import React from 'react';
import dynamic from 'next/dynamic';
import Spinner from '@/app/components/common/Spinner';
import SkeletonList from '../skeleton/list';

const ListCategory = dynamic(() => import('@/app/components/menu/List.client'), {
    ssr: false,
    loading: () => <SkeletonList />,
});

const LazyListCategory = dynamic(() => import('@/app/components/menu/LazyList'), {
    ssr: false,
    loading: () => <SkeletonList />,
});

export default function List({ menu, order, handleAddItem, handleRemoveItem }) {
    return (
        <div>
            <ul className="list">
                {menu.map((category, index) =>
                    index === 0 ? (
                        <ListCategory
                            key={category.name}
                            category={category}
                            order={order}
                            handleAddItem={handleAddItem}
                            handleRemoveItem={handleRemoveItem}
                        />
                    ) : (
                        <LazyListCategory
                            key={category.name}
                            category={category}
                            order={order}
                            handleAddItem={handleAddItem}
                            handleRemoveItem={handleRemoveItem}
                        />
                    )
                )}
            </ul>
        </div>
    );
}
