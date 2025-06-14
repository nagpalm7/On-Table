import { CldImage } from 'next-cloudinary';
import React from 'react';

const Logo = ({logo}) => {
    return (
        <CldImage
            src={logo}
            width={200}
            height={200}
            alt="Logo"
        />
    );
};

export default Logo;