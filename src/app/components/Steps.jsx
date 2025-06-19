import React from 'react';
import { orderingSteps } from '../utils/constants';

const Steps = ({ currentStep }) => {

    return (
        <div className="m-4 p-4 bg-base-100 shadow-md rounded-2xl">
            <ul className="steps w-full">
                {orderingSteps.map((label, idx) => (
                    <li
                        key={label}
                        className={`step text-xs sm:text-sm ${currentStep >= idx + 1 ? "step-success" : ""}`}
                    >
                        {label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Steps;