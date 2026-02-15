import React from 'react';
import { CgSpinnerTwoAlt } from 'react-icons/cg';

const LoadingSpinner = () => {
  return (
    <div className="h-96 flex justify-center items-center bg-stone-950">
      <CgSpinnerTwoAlt size={100} className="text-white animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
