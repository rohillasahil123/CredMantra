import React from "react";
import FrountGirl from "../../assets/FrountGirl.png";
import personalLoans from "../../assets/Personal-Loan.gif";
import BusinessLoans from "../../assets/business loan.png";
import HomeLoans from "../../assets/Home-Loan.gif";
import BackgroundImage from "../../assets/back.avif";

import { Link } from "react-router-dom";

const loanOptions = [
  { title: "Personal Loans", imgSrc: BusinessLoans , Route:"/personalloan" },
  { title: "Business Loans", imgSrc: BusinessLoans , Route:"/businessloan" },
  { title: "Home Loans", imgSrc: BusinessLoans },
  { title: "Security Loans", imgSrc: BusinessLoans },
  { title: "Micro Loans", imgSrc: BusinessLoans },
  { title: "Gold Loans", imgSrc: BusinessLoans },
];

const Hero = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex  flex-col-reverse sm:flex-row">
        <div className="md:w-1/2 w-full sm:h-[100%] h-[50vh] bg-red-300 ">
          <img
            className="sm:object-cover object-top rounded sm:h-full w-full sm:w-[90%]  h-[100%] mt[-11%]  "
            alt="hero"
            src={FrountGirl}
          />
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col items-center md:items-start text-center md:text-left bg-sky-300 md:flex-row-reverse justify-center p-[3%]">
          <div className="container mt-5 sm:mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:ml-0 sm:text-center  ">
              {loanOptions.map((loan, index) => (
                <div
                  key={index}
                  className="w-[100%] h-[50%] flex   sm:w-full sm:h-[92%] shadow-2xl rounded-xl sm:flex flex-row sm:flex-col items-center justify-center bg-white p-4  hover:cursor-pointer transition-transform hover:scale-105 " style={{
                    backgroundImage:
                      `url(${BackgroundImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundColor: "#e8f0ff",
                    backgroundBlendMode: "color-burn",
                  
                  }}  
                > 
                    <img
                      alt={loan.title}
                      className="w-[90%] mr-[14%] sm:mr-0 h-[95%] sm:mb-0 mb-[-11px] mt-[-6%]  sm:ml-0 "
                      src={loan.imgSrc}
                    />
                    <div className="mr-[20%] sm:ml-auto space-y-2 sm:w-full ">
                      <h1 className="title-font font-medium text-black text-[17px] ">
                        {loan.title}
                      </h1>
                      <button className="bg-blue-800 h-7 w-[80px] px-4  text-white rounded-sm text-center ml-[10%] hover:bg-blue-700">
                       <Link to={loan.Route} > Apply</Link>
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
