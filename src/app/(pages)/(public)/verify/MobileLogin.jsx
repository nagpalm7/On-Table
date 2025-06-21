'use client';

import React from 'react';
import { useState } from 'react';

export default function MobileLoginStep({ onVerified }) {
  const [step, setStep] = useState(1); // 1 = enter phone, 2 = enter OTP
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function requestOtp() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/request-otp', {
        method: 'POST',
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send OTP');
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        body: JSON.stringify({ phone, otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'OTP verification failed');
      onVerified(); // callback to show payment options
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 bg-base-100 rounded-xl shadow-md max-w-md mx-auto mt-4">
      {step === 1 && (
        <>
          <label className="block mb-2 font-semibold">Enter Mobile Number</label>
          <input
            type="tel"
            placeholder="9876543210"
            className="input input-bordered w-full mb-3"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={10}
          />
          <button onClick={requestOtp} disabled={loading || phone.length !== 10} className="btn btn-primary w-full">
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <label className="block mb-2 font-semibold">Enter OTP sent to {phone}</label>
          <input
            type="text"
            placeholder="123456"
            className="input input-bordered w-full mb-3"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
          />
          <button onClick={verifyOtp} disabled={loading || otp.length !== 6} className="btn btn-success w-full">
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
