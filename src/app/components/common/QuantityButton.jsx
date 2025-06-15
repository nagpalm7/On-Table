import React from 'react';
import { LuMinus } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";

const QuantityButton = ({item, quantity, handleAddItem, handleRemoveItem }) => (
    <div className='join'>
        <button 
            className="btn btn-outline btn-sm btn-success join-item"
            onClick={() => handleRemoveItem(item._id, item.variants[0].name, item.variants[0].price)}
        >
            <span className='text-error'><LuMinus /></span>
        </button>
        <div className='btn btn-outline btn-sm btn-success join-item'>
            <span className='text-neutral'>{quantity}</span>
        </div>
        <button 
            className="btn btn-outline btn-sm btn-success join-item"
            onClick={() => handleAddItem(item._id, item.variants[0].name, item.variants[0].price)}
        >
            <LuPlus />
        </button>
    </div>
);

export default QuantityButton;