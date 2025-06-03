import React from "react";
import Steps from "@/app/components/Steps";

const ThankYouPage = ({ receiptNumber = "213981" }) => (
    <div>
        <Steps currentStep={4} />
        <div className="flex flex-col items-center mt-16 min-h-[50vh]">
            <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
            <p className="mb-2">Your order has been placed successfully.</p>
            <p>
                <span className="font-semibold">Order Receipt Number:</span> {receiptNumber}
            </p>
        </div>
    </div>
);

export default ThankYouPage;