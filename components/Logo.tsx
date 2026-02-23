import React from 'react';
import { BsLightningCharge } from 'react-icons/bs';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <BsLightningCharge size={20} />
      <h2 className='font-bold'>LogoFast</h2>
    </div>
  );
};

export default Logo;
