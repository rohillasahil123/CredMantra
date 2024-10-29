import React from "react";
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
  { title: "Gold Loans", imgSrc: HomeLoans },
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
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col items-center md:items-start text-center md:text-left bg-sky-300 md:flex-row-reverse p-[3%]">
          <div className="container mt-5 sm:mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-[3%] ml-8 sm:ml-0 sm:text-center  ">
              {loanOptions.map((loan, index) => (
                <div
                  key={index}
                  className="w-[100%] h-auto mt-[10%] flex   sm:w-full sm:h-[92%] shadow-2xl rounded-xl sm:flex flex-row sm:flex-col items-center justify-center bg-white p-4 space-y-2  hover:cursor-pointer "  style={{
                    backgroundImage:
                      "url('https://img.freepik.com/free-vector/stylish-flower-line-pattern-background_361591-1162.jpg?w=1480&t=st=1706072054~exp=1706072654~hmac=5dccb80...')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundColor: "#e8f0ff",
                    backgroundBlendMode: "color-burn",
                  }}
                >
                 
                    <img
                      alt={loan.title}
                      className="w-30 h-30 object-cover sm:mb-0 mb-[-20px] mt-[-30%] ml-[-30%] sm:ml-0 "
                      src={loan.imgSrc}
                    />
                    <div className="ml-[-30%] sm:ml-auto space-y-2 sm:w-full ">
                      <h1 className="title-font font-medium text-gray-900 text-sm ">
                        {loan.title}
                      </h1>
                      <button className="bg-blue-500 h-7 w-[80px] px-4  text-white rounded-sm text-center ml-[10%] hover:bg-blue-700">
                        Apply
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
