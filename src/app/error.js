"use client"
import Link from 'next/link'
import React from 'react'
import { MdErrorOutline } from 'react-icons/md';

const error = () => {
return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-base-200 px-4">
        <div className="card bg-base-100 shadow-xl p-8">
            <div className="flex flex-col items-center">
                <MdErrorOutline className="w-16 h-16 text-error mb-4" />
                <h2 className="text-2xl font-bold text-error mb-2">Something went wrong</h2>
                <p className="text-base-content mb-4">An unexpected error has occurred. Please try again later.</p>
                <Link href="/" className="btn btn-error btn-outline">Go Home</Link>
            </div>
        </div>
    </div>
)
}

export default error