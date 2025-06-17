import React from 'react';
import { orderingSteps } from '../utils/constants';

const Steps = ({ currentStep }) => {

    return (
        <div className="p-4 bg-base-100 shadow-md rounded-xl my-2 w-full max-w-2xl mx-auto">
            <ul className="steps w-full">
                {orderingSteps.map((label, idx) => (
                    <li
                        key={label}
                        className={`step text-xs sm:text-sm ${currentStep >= idx + 1 ? "step-primary" : ""}`}
                    >
                        {label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Steps;