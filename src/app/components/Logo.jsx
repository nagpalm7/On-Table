import { CldImage } from 'next-cloudinary';
import React from 'react';
import { PLACEHOLDER_PUBLIC_ID } from '../utils/constants';

const Logo = ({logo}) => {
    return (
        <CldImage
            src={logo || PLACEHOLDER_PUBLIC_ID}
            width={200}
            height={200}
            alt="Logo"
        />
    );
};

export default Logo;