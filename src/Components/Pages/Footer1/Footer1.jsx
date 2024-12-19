import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";

const Footer1 = () => {
  return (
    <div className="bg-customBlue h-[80vh] sm:h-[50vh] w-full">
    <div className= "  h-[50vh] sm:h-[80%] w-full  text-white flex flex-col sm:flex-row items-center sm:justify-around  ">
      <div className="w-[40%] h-[40%] ml-0 sm:ml-[7%]">
        <div className=" sm:mt-0 mt-[40%]">
            <img src={logo} alt=""className=" h-[70%] sm:h-[30%] ml-0 sm:ml-[3%] w-[100%] sm:w-[40%] mt-0 sm:mt-[-5%]" />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row w-[60%] justify-around mt-3 items-center">
        <div className="mb-8 lg:mb-0 font-serif">
          <div className="font-bold">CATEGORIES</div>
          <Link to="/personalloan">
            <div className="mt-4 ">
              Personal loan
            </div>{" "}
          </Link>
          <Link to="/businessloan">
            <div className="mt-2">
              Business Loan
            </div>
          </Link>
          <div className=" mt-2">
            Credit card
          </div>

          <div className=" mt-2">
            Paylater
          </div>
          <Link to="/partner">
            <div className=" mt-2">
              Our Partner
            </div>{" "}
          </Link>
          <Link to="/contect ">
            {" "}
       
          </Link>
        </div>
        <div className=" lg:mb-0 font-serif items-center mt-0  sm:mt-[-9%]   ">
          <div className="font-bold uppercase ">Resources</div>
          <Link to="/emicalculator">
            {" "}
            <div className=" mt-4">
            EMI Caluculator
            </div>
          </Link>
          <Link to="/hiring">
            <div className=" hover:cursor-pointer mt-2">
            Hiring
            </div>
          </Link>
          <div className=" mt-2">
              {" "}
            Contect Us{" "}
            </div>{" "}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Footer1;
