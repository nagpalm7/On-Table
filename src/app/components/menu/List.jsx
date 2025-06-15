import React from 'react';
import ListCard from '@/app/components/menu/ListCard';

const List = ({menu, order, handleAddItem, handleRemoveItem }) => {
    return (
        <div>
            <ul className="list">
                {menu.map((category) => (
                    <div key={category.name} className="collapse collapse-arrow">
                        <input type="checkbox" className="peer" defaultChecked={true} /> 
                        <div className="collapse-title font-semibold" id={category.name}>
                            {category.name}
                        </div>
                        <div className="collapse-content gap-2 grid grid-cols-2 sm:grid-cols-3 sm:gap-4">
                            {category.items.map((item) => (
                                <ListCard 
                                    item={item} 
                                    key={item._id}
                                    order={order}
                                    handleAddItem={handleAddItem}
                                    handleRemoveItem={handleRemoveItem}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default List;
