import React from 'react';
import { LuMinus } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";

const QuantityButton = ({item, quantity, handleAddItem, handleRemoveItem }) => (
    <div className='join w-full'>
        <button 
            className="btn btn-sm btn-link join-item px-2"
            onClick={() => handleRemoveItem(item._id, item.variants[0].name, item.variants[0].price)}
        >
            <span className='text-error text-base'><LuMinus /></span>
        </button>
        <div className='btn btn-sm btn-ghost btn-disabled btn-success join-item px-1'>
            <span className='text-neutral text-base'>{quantity}</span>
        </div>
        <button 
            className="btn btn-sm btn-link join-item px-2"
            onClick={() => handleAddItem(item._id, item.variants[0].name, item.variants[0].price)}
        >
            <span className='text-success text-base'><LuPlus /></span>
        </button>
    </div>
);

export default QuantityButton;