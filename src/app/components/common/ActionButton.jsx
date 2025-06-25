'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useFormStatus } from 'react-dom';

function ActionButton({ text, state }) {
    const { pending } = useFormStatus();
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const scriptId = 'razorpay-checkout-js';
            if (!document.getElementById(scriptId)) {
                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                script.id = scriptId;
                script.async = true;
                document.body.appendChild(script);
            }
        }
    }, []);

    console.log(state)

    useEffect(() => {
        if (state?.mode === 'online' && typeof window !== 'undefined') {
            const rzp = new window.Razorpay({
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: state.amount,
                currency: state.currency,
                name: 'On Table',
                description: 'Order Payment',
                order_id: state.razorpayOrderId,
                handler: (response) => {
                    router.push(`/order/${state.receipt}/track`);
                },
                callback_url: `${window.location.origin}/order/${state.receipt}/track`,
                theme: { color: '#36d399' },
                modal: {
                    ondismiss: () => {
                        console.log('Razorpay modal closed by user without completing payment');
                        // Optional: trigger cleanup, redirect, or show warning
                    },
                },
            });

            rzp.open();
        }
    }, [state]);

    return (
        <button
            type="submit"
            className="btn btn-success btn-block rounded-full"
            disabled={pending}
        >
            {pending && <span className="loading loading-spinner"></span>} {text}
        </button>
    );
}

export default ActionButton;
