import React from 'react';
import { LuMinus } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";

const QuantityButton = ({item, quantity, handleAddItem, handleRemoveItem }) => (
    <div className='join'>
        <button 
            className="btn btn-sm btn-link join-item px-2"
            onClick={() => handleRemoveItem(item._id, item.variants[0].name, item.variants[0].price)}
        >
            <span className='text-error'><LuMinus /></span>
        </button>
        <div className='btn btn-sm btn-ghost btn-disabled btn-success join-item px-1'>
            <span className='text-base-content font-bold'>{quantity}</span>
        </div>
        <button 
            className="btn btn-sm btn-link join-item px-2"
            onClick={() => handleAddItem(item._id, item.variants[0].name, item.variants[0].price)}
        >
            <span className='text-success'><LuPlus /></span>
        </button>
    </div>
);

export default QuantityButton;