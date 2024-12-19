import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";

const Footer1 = () => {
  return (
    <div className="bg-customBlue py-10 sm:py-6 text-white">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-around items-center px-5">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-10">
        
          <div>
            <img
              src={logo}
              alt="Company Logo"
              className="w-32 sm:w-40 h-auto mb-4 sm:mb-0"
            />
          </div >
           </div>

        {/* Links Section */}
        <div className=" w-[50%] flex flex-col sm:flex-row justify-around text-center sm:text-left mt-10 sm:mt-0 sm:space-x-10">
          {/* Categories */}
          <div>
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <Link to="/personalloan" className="block mb-2 hover:underline">
              Personal Loan
            </Link>
            <Link to="/businessloan" className="block mb-2 hover:underline">
              Business Loan
            </Link>
            <p className="mb-2 hover:underline cursor-pointer">Credit Card</p>
            <p className="mb-2 hover:underline cursor-pointer">Paylater</p>
            <Link to="/partner" className="block mb-2 hover:underline">
              Our Partner
            </Link>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <Link to="/emicalculator" className="block mb-2 hover:underline">
              EMI Calculator
            </Link>
            <Link to="/hiring" className="block mb-2 hover:underline">
              Hiring
            </Link>
            <p className="mb-2 hover:underline cursor-pointer">Contact Us</p>
          </div>
        </div>
      </div>
      <div className="text-center text-xs sm:text-sm mt-10 sm:mt-6 border-t border-white pt-4">
        © {new Date().getFullYear()} Your Company Name. All rights reserved.
      </div>
    </div>
  );
};

export default Footer1;
