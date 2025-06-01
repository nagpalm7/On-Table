import React from 'react';
import ListCard from '@/app/components/menu/ListCard';
import { food } from '@/app/data/menu';

const List = ({order, addOrIncreaseQuantity, decreaseQuantity}) => {
    return (
        <div>
            <ul className="list bg-base-100 rounded-box shadow-md">
                <li className="p-4 pb-2 text-2xl opacity-70 tracking-wide">Best Sellers</li>
            {
                food.map((item) => (
                    <ListCard 
                        item={item} 
                        key={item.id}
                        addOrIncreaseQuantity={addOrIncreaseQuantity}
                        decreaseQuantity={decreaseQuantity}
                        order={order}
                    />
                ))  
            }
            </ul>
        </div>
    );
};

export default List;