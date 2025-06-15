import React from 'react';
import { LuPlus } from "react-icons/lu";

const AddButton = ({item, handleAddItem}) => (
    <button 
        className='btn btn-outline btn-sm btn-success w-full' 
        onClick={() => handleAddItem(item._id, item.variants[0].name, item.variants[0].price)}
    >
        ADD
    </button>
);

export default AddButton;