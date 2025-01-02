import React from 'react';
import { useNavigate } from 'react-router-dom';
import error from '../../assets/erro.avif';

const AgeError = () => {

  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/personalloan'); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className='flex justify-center items-center mt-[-6%]'>
            <img src={error} alt="" className='h-[50%] w-[50%]' />
        </div>
      <h1 className="text-3xl font-bold text-red-600 mb-4">Not Eligible</h1>
      <p className="text-lg text-green-500 mb-8">
        You are not eligible because you are under 18 years old.
      </p>
      <button
        onClick={handleBack}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Go Back
      </button>
    </div>
  );
};

export default AgeError;