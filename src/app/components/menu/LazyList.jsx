'use client';
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import SkeletonList from '../skeleton/list';

// Dynamically import the category's list (e.g., list of items)
const ListCategory = dynamic(() => import('@/app/components/menu/List.client'), {
    ssr: false,
    loading: () => <SkeletonList />,
});

const LazyList = ({ category, order, handleAddItem, handleRemoveItem }) => {
    const [shouldRender, setShouldRender] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        let idleCallback;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    idleCallback = requestIdleCallback(() => {
                        setShouldRender(true);
                    });
                }
            },
            {
                rootMargin: '200px', // preload before visible
                threshold: 0.1,
            }
        );
        if (ref.current) observer.observe(ref.current);

        return () => {
            observer.disconnect();
            if (idleCallback) cancelIdleCallback(idleCallback);
        };
    }, []);

    return (
        <div ref={ref} className="min-h-[200px]">
            {shouldRender ? (
                <ListCategory
                    category={category}
                    order={order}
                    handleAddItem={handleAddItem}
                    handleRemoveItem={handleRemoveItem}
                />
            ) : 
                <SkeletonList />
            }
        </div>
    );
};

export default LazyList;
