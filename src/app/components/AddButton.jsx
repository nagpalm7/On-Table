import React from 'react';
import { LuPlus } from "react-icons/lu";

const AddButton = ({item, addOrIncreaseQuantity}) => (
    <button 
        className='btn btn-soft btn-success btn-wide rounded-t-none relative' 
        onClick={() => addOrIncreaseQuantity(item)}
    >
        Add
        <span className="absolute right-1 top-1">
            <LuPlus />
        </span>
    </button>
);

export default AddButton;