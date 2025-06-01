import React from 'react';
import AddButton from '@/app/components/AddButton';
import QuantityButton from '@/app/components/QuantityButton';

const ListCard = ({item, order, addOrIncreaseQuantity, decreaseQuantity}) => {
    // Check if item is in the order
    const orderItem = order?.find((o) => o.id === item.id);

    return (
        <li className="list-row" key={item.id}>
            <div>
                <div className='text-xl font-bold'>{item.name}</div>
                <p className="text-xs font-semibold opacity-60 mt-2">
                    {item.description && item.description}
                </p>
                <div className="text-l font-bold opacity-60 mt-2">₹{item.price}</div>
            </div>
            <p></p>
            <div className="flex flex-col items-center relative">
                <img className="size-34 rounded-t-box" src={item.imageUrl}/>
                {orderItem ? (
                    <QuantityButton 
                        addOrIncreaseQuantity={addOrIncreaseQuantity}
                        decreaseQuantity={decreaseQuantity}
                        item={item}
                        quantity={orderItem.quantity}
                    />
                ) : (
                    <AddButton 
                        addOrIncreaseQuantity={addOrIncreaseQuantity} 
                        item={item}
                    />
                )}
            </div>
        </li>
    );
};

export default ListCard;