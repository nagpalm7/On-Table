'use client'
import React from 'react';
import { useFormStatus } from 'react-dom';

function ActionButton( { text } ) {
    const { pending } = useFormStatus();

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
