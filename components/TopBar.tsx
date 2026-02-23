import React from 'react';
import Logo from './Logo';
import Presets from './Presets';
import { Downloads } from './Downloads';

const TopBar = () => {
  return (
    <div className="border-b border-border pb-2">
      <div className="flex flex-wrap items-center gap-4 md:gap-6">
        <div className="order-1 flex items-center">
          <Logo />
        </div>
        <div className="order-3 w-full text-center md:order-2 md:flex md:flex-1 md:justify-center md:w-auto">
          <Presets />
        </div>
        <div className="order-2 ml-auto md:order-3">
          <Downloads />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
