import React from 'react';
import FrountGirl from "../../assets/FrountGirl.png";
import personalLoans from "../../assets/Personal-Loan.gif";
import BusinessLoans from "../../assets/Business-Loan-2.gif";
import HomeLoans from "../../assets/Home-Loan.gif";

const loanOptions = [
  { title: "Personal Loans", imgSrc: personalLoans },
  { title: "Business Loans", imgSrc: BusinessLoans },
  { title: "Home Loans", imgSrc: HomeLoans },
  { title: "Security Loans", imgSrc: HomeLoans },
  { title: "Micro Loans", imgSrc: HomeLoans },
  { title: "Gold Loans", imgSrc: HomeLoans }
];

const Hero = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-col md:flex-row">
        <div className="md:w-1/2 w-full h-auto bg-red-300">
          <img
            className="object-cover object-top rounded h-full w-full mt-[-90px]"
            alt="hero"
            src={FrountGirl}
          />
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col items-center md:items-start text-center md:text-left bg-sky-300 md:flex-row-reverse">
          <div className="container mx-auto mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pr-6 ml-8 sm:ml-0 ">
              {loanOptions.map((loan, index) => (
                <div key={index} className="w-[90%] h-[60%]   sm:w-full sm:h-[92%] shadow-2xl rounded-xl sm:flex flex-col items-center justify-center bg-white p-4 space-y-2  hover:cursor-pointer ">
                  <img alt={loan.title} className="w-30 h-30 object-cover sm:mb-0 mb-[-20px]  " src={loan.imgSrc} />
                  <h1 className="title-font font-medium text-gray-900 text-lg">{loan.title}</h1>
                  <button className="bg-blue-500 h-7 w-[80px] px-4  text-white rounded-sm text-center  hover:bg-blue-700">Apply</button>
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
