import React from 'react';
import { CiFaceSmile } from "react-icons/ci";
import { FaRegAddressBook } from "react-icons/fa6";
import { BsBank2 } from "react-icons/bs";
import { RiPlantLine } from "react-icons/ri";
import AOS from 'aos'; 
import 'aos/dist/aos.css'; // Import AOS CSS

const Management = () => {
  return (
    <div className="w-full max-h-screen py-9 flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div 
          data-aos="fade-up-right"
        className="flex flex-col rounded text-black justify-center items-center p-4">
          <CiFaceSmile size={50} />
          <h1 className="text-xl font-bold">2,00,000+</h1>
          <h1 className="text-gray-700 font-bold text-center">Happy Customers</h1>
        </div>
              
        <div className="flex flex-col rounded text-black justify-center items-center p-4">
          <BsBank2 size={50} />
          <h1 className="text-xl font-bold">21+</h1>
          <h1 className="text-gray-700 font-bold text-center">Banks & NBFCs</h1>
        </div>

        <div className="flex flex-col rounded text-black justify-center items-center p-4">
          <RiPlantLine size={50} />
          <h1 className="text-xl font-bold">₹30,00,00,000+</h1>
          <h1 className="text-gray-700 font-bold text-center">Business Conducted</h1>
        </div>

        <div className="flex flex-col rounded text-black justify-center items-center p-4">
          <FaRegAddressBook size={50} />
          <h1 className="text-xl font-bold">2,000+</h1>
          <h1 className="text-gray-700 font-bold text-center">Relationship Managers</h1>
        </div>
            
      </div>
    </div>
  );
}

export default Management;
