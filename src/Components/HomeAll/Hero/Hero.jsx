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
  { title: "Personal Loans", imgSrc: personalLoans, Route: "/personalloan" },
  { title: "Business Loans", imgSrc: businessLoans, Route: "/businessloan" },
  { title: `Home Loans`, imgSrc: homeLoans, Route: "/homeloan"   },
  { title: "Loan Against Security", imgSrc: securityLoans},
  { title: "Micro Loans", imgSrc: microLoans },
  { title: "Gold Loans", imgSrc: goldLoans },
];

const Hero = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto sm:flex sm:flex-row">
        <div className="md:w-1/2 w-full sm:h-[100%] h-[40vh] bg-red-300 ">
          <img
            className="sm:object-cover object-top rounded sm:h-full w-full sm:w-[90%]  h-[100%] mt[-11%]  "
            alt="hero"
            src={FrountGirl}
          />
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col items-center md:items-start text-center md:text-left bg-sky-300 md:flex-row-reverse justify-center p-[3%]">
          <div className="container mt-5 sm:mt-10">
            <div className="flex flex-wrap gap-3 sm:ml-0   sm:text-center justify-center">
              {loanOptions.map((loan, index) => (
                <div
                  key={index}
                className="w-full sm:w-[48%]  h-[12vh] sm:h-[23vh] flex  items-center justify-center shadow-2xl rounded-xl bg-white  hover:cursor-pointer transition-transform hover:scale-105"
                 
                >
                  <img
                    alt={loan.title}
                    className="w-[90%] sm:h-[90%]  h-[94%] mb-[-12px] mt-[-2%] ml-1"
                    src={loan.imgSrc}
                  />
                  <div className="space-y-2 text-center w-full">
                    <h1 className="title-font font-medium text-black text-[18px] uppercase">
                      {loan.title}
                    </h1>
                    <button className="bg-gray-600 h-7 w-[80px] px-4  text-white rounded-lg hover:bg-gray-800">
                      <Link to={loan.Route}> <span className="font-bold ">Apply</span></Link>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
