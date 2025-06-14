import React from 'react';
import { LuMinus } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";

const QuantityButton = ({item, quantity}) => (
    <div className='join'>
        <button 
            className="btn btn-soft btn-success join-item rounded-t-none"
        >
            <span className='text-error'><LuMinus /></span>
        </button>
        <div className='btn btn-soft btn-success join-item rounded-t-none'>
            <span className='text-neutral'>{quantity}</span>
        </div>
        <button 
            className="btn btn-soft btn-success join-item rounded-t-none"
        >
            <LuPlus />
        </button>
    </div>
);

export default QuantityButton;