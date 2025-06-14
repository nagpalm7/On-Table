import React from 'react';
import AddButton from '@/app/components/common/AddButton';
import QuantityButton from '@/app/components/common/QuantityButton';
import Logo from '../Logo';
import { CldImage } from 'next-cloudinary';

const ListCard = ({ item }) => {
    // Check if item is in the order
    const orderItem = null;

    return (
        <div className="card shadow-md w-full" key={item._id}>
            <figure>
                {item.image && (
                    <CldImage
                        src={item.image}
                        width={800}
                        height={800}
                        crop={"fill"}
                        alt="Food Image"
                        className="w-full h-auto"
                    />
                )}
            </figure>
            <div className="card-body p-2">
                <h2 className="card-title text-sm">{item.name}</h2>
                <p className="line-clamp-2 text-xs opacity-60">{item.description}</p>
                <div className="text-sm font-semibold opacity-70 flex items-center">
                    <div className="flex-1">₹{item.variants[0].price}</div>
                    <div className="flex-1">
                        {orderItem ? (
                            <QuantityButton
                                item={item}
                                quantity={orderItem.quantity}
                            />
                        ) : (
                            <AddButton
                                item={item}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    // return (
    //     <li className="list-row" key={item._id}>
    //         <div>
    //             <div className='text-xl font-bold'>{item.name}</div>
    //             <p className="text-xs font-semibold opacity-60 mt-2">
    //                 {item.description && item.description}
    //             </p>
    //             <div className="text-l font-bold opacity-60 mt-2">₹{item?.variants[0]?.price}</div>
    //         </div>
    //         <p></p>
    //         <div className="flex flex-col items-center relative">
    //         <div className='size-34 rounded-t-box'>
    //             {item?.image && (
    //                 <CldImage
    //                     src={item.image}
    //                     width={150}
    //                     height={150}
    //                     crop={"fill"}
    //                     alt="Image"
    //                 />
    //             )}
    //         </div>
    //             {orderItem ? (
    //                 <QuantityButton 
    //                     addOrIncreaseQuantity={addOrIncreaseQuantity}
    //                     decreaseQuantity={decreaseQuantity}
    //                     item={item}
    //                     quantity={orderItem.quantity}
    //                 />
    //             ) : (
    //                 <AddButton 
    //                     addOrIncreaseQuantity={addOrIncreaseQuantity} 
    //                     item={item}
    //                 />
    //             )}
    //         </div>
    //     </li>
    // );
};

export default ListCard;