import React from 'react';
import Steps from '@/app/components/Steps';

const Pay = ({ params }) => {
    const rid = params.id.toString();
    const handleButtonClick = () => {
        console.log()
    };

    return (
        <div>
            <Steps currentStep={3} />
            <div className="m-4 shadow-md card bg-base-100 rounded-2xl md:mx-auto md:max-w-2xl">
                <div className="card-body">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="card-title text-xl">How would you like to pay ?</h2>
                    </div>

                </div>
                <div className="card-actions justify-center p-4 gap-6">
                    <button
                        className="btn btn-success btn-block rounded-full">
                        PAY AT COUNTER
                    </button>
                    <button
                        className="btn btn-success btn-block rounded-full">
                        PAY ONLINE
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Pay;