import React from 'react';
import { orderingSteps } from '../utils/constants';

const Steps = ({currentStep}) => {
    
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <ul className="steps">
                {orderingSteps.map((label, idx) => (
                    <li
                        key={label}
                        className={`step${currentStep >= idx + 1 ? " step-primary" : ""}`}
                    >
                        {label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Steps;