import { placeOrder } from '@/actions/client/order';
import ActionButton from '@/app/components/common/ActionButton';
import React from 'react'

const PaymentMode = ( {orderId} ) => {
    return (
        <div className="m-4 shadow-md card bg-base-100 rounded-2xl">
            <form action={placeOrder} className='w-full'>
                <div className="card-body">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="card-title text-xl">How would you like to pay ?</h2>
                    </div>
                    <input type="hidden" name="orderId" value={orderId} />
                    <label className="label font-bold mb-2">
                        <input
                            type="radio"
                            name="paymentMode"
                            className="radio radio-success"
                            defaultChecked
                            value={"cash"}
                        />
                        PAY AT COUNTER
                    </label>
                    <label className="label font-bold">
                        <input
                            type="radio"
                            name="paymentMode"
                            className="radio radio-success"
                            value={"online"}
                        />
                        PAY ONLINE
                    </label>
                </div>
                <div className="card-actions justify-center p-4">
                    <ActionButton text="PAY NOW" />
                </div>
            </form>
        </div>
    )
}

export default PaymentMode;