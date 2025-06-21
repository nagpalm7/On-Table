'use client';
import React, { useState } from 'react';

export function AvatarImage({ src, alt }) {
  const [imgSrc, setImgSrc] = useState(src);
  const [errored, setErrored] = useState(false);

  if (errored || !imgSrc) {
    return (
      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-base-200 text-base-content">
        <span className="flex-1 text-lg">{alt}</span>
      </div>
    );
  }

  return (
    <div className="w-8 h-8 overflow-hidden rounded-full ring ring-success ring-offset-2">
      <img
        loading="lazy"
        src={imgSrc}
        className="w-full h-full object-cover"
        onError={() => setErrored(true)}
      />
    </div>
  );
}
