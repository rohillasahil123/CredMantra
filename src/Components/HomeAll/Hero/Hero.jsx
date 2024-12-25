import React from "react";
import FrountGirl from "../../../assets/FrountGirl.png";
import personalLoans from "../../../assets/personal.gif";
import businessLoans from "../../../assets/Business.gif";
import homeLoans from "../../../assets/homeloan.gif";
import microLoans from "../../../assets/microloan.gif";
import goldLoans from "../../../assets/Gold-Loan.gif";
import securityLoans from "../../../assets/security.gif";

import { Link } from "react-router-dom";

const loanOptions = [
  {
    title: "Personal Loans",
    imgSrc: personalLoans,
    Route: "/personalloan",
  },
  {
    title: "Business Loans",
    imgSrc: businessLoans,
    Route: "/business-list",
  },
  {
    title: `Home Loans`,
    imgSrc: homeLoans,
    Route: "/homeloan",
  },
  {
    title: "Loan Against Security",
    imgSrc: securityLoans,
    Route: "/abhiLoans",
  },
  {
    title: "Micro Loans",
    imgSrc: microLoans,
    Route: "/micro_loan",
  },
  {
    title: "Gold Loans",
    imgSrc: goldLoans,
  },
];

const Hero = () => {
  return (
    <div className="  sm:h-[80vh] sm:flex sm:flex-row w-[100%] md:flex-row ">
      <div className="w-full h-[70vh] bg-red-300 sm:h-[87vh] mt-[3%] sm:mt-0 md:h-[100vh] lg:h-[83vh] xl:h-[100vh] 2xl:h-[100vh] sm:w-[50%] md:w-[50%]  ">
        <img
          className=" w-[100%] h-[100%] sm:w-[100%] sm:h-[100%] md:w-[100%] md:h-[90%] lg:h-[100%] xl:w-[100%] xl:h-[90%] mt-[-10%] object-cover object-top sm:rounded-md lg:rounded-lg"
          alt="hero"
          src={FrountGirl}
        />
      </div>
      <div className="lg:flex-grow sm:w-1/2  md:w-1/2 bg-sky-300  flex flex-col items-center md:items-start text-center md:text-left md:flex-row-reverse justify-center p-[2%]">
        <div className="container mt-5 sm:mt-10">
          <div className="flex flex-wrap gap-3  sm:ml-0   sm:text-center justify-center">
            {loanOptions.map((loan, index) => (
              <div
                key={index}
                className="w-full sm:w-[46%]  h-[12vh] sm:h-[19vh] flex  items-center justify-center shadow-2xl rounded-xl bg-white  hover:cursor-pointer transition-transform hover:scale-105"
              >
                <img
                  alt={loan.title}
                  className="w-[90%] sm:h-[46%] md:h-[62%] md:w-[72%]  h-[94%] mb-[-12px] mt-[-2%] ml-1"
                  src={loan.imgSrc}
                />
                <div className="space-y-1 text-center h-[62%] w-full">
                  <h1 className="title-font  text-black text-[13px] sm:text-[10px] md:text-[14px] font-bold uppercase">
                    {loan.title}
                  </h1>
                  <button className="bg-gray-600 h-7 w-[80px] sm:text-[9px] sm:w-[56%] sm:h-[33%] md:text-[11px] font-bold  md:h-[36%] md:w-[50%]   text-white rounded-lg hover:bg-gray-800">
                    <Link to={loan.Route}> Apply</Link>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
