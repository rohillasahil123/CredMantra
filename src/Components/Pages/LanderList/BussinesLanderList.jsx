import React from "react";
import iifl from "../../../assets/iifl.png";
import landingKart from "../../../assets/Lendingkart.svg";
import faircent from "../../../assets/faircent.webp";
import vitto from "../../../assets/vitto.png";
import meter from "../../../assets/meter.png";
import { GiMoneyStack } from "react-icons/gi";
import { GrDocumentConfig } from "react-icons/gr";

const BussinesLanderList = () => {
  const leandersdetails = [
    {
      name: "iifl",
      approvalRate: "Good",
      LoanAmount: "3,00,000",
      interestRate: "starting from 22% to 28%",
      Tenure: "Upto 18 month",
      processingFee: "Upto 2%",
      image: iifl,
      Collatera: "No Collatera",
      Flexible: "Flexible Repayment",
      Restriction: "No Usage Restriction",
    },
    {
      name: "Faircent",
      approvalRate: "Good",
      LoanAmount: "3,00,000",
      interestRate: "starting from 24% to 28%",
      Tenure: "Upto 36 month",
      processingFee: "Upto 4%",
      image: faircent,
      Collatera: "No Collatera",
      Flexible: "Flexible Repayment",
      Restriction: "No Usage Restriction",
    },
    {
      name: "LendingKart ",
      approvalRate: "Good",
      LoanAmount: "4,00,000",
      interestRate: "starting from 24% to 28%",
      Tenure: "Upto 32 month",
      processingFee: "Upto 2.5%",
      image: landingKart,
      Collatera: "No Collatera",
      Flexible: "Flexible Repayment",
      Restriction: "No Usage Restriction",
    },
    {
      name: "vitto",
      approvalRate: "Good",
      LoanAmount: "3,00,000",
      interestRate: "starting from 24% to 28%",
      Tenure: "Upto 36 month",
      processingFee: "Upto 4%",
      image: vitto,
      Collatera: "No Collatera",
      Flexible: "Flexible Repayment",
      Restriction: "No Usage Restriction",
    },
  ];

  return (
    <div className="text-center items-center h-auto">
      <div className="flex items-center text-4xl font-semibold justify-center mt-3">
        <GiMoneyStack />
        <h1 className="mx-2">Select a Lender</h1>
        <GiMoneyStack /> <br />
      </div>
      <p className="text-2xl mt-[1.3%]">
        Here are the offers that will best suit your needs.
      </p>
      {leandersdetails.map((lander, index) => (
        <div
          className="sm:w-[93%] h-[23vh] w-[90%] sm:h-[40vh] mt-[3%] border border-gray-800 rounded-2xl items-center text-center "
          style={{ justifySelf: "center" }}
          key={index}
        >
          <div className=" flex sm:w-full h-[20%] w-[20%] sm:h-[25vh] mt-[3%] rounded-lg sm:justify-around text-gray-600 space-y-2 space-x-4 sm:space-x-0 ">
            <img
              src={lander.image}
              alt="Safety List"
              className="sm:h-[86%] sm:w-[16%] h-full w-full ml-1 sm:ml-0 mt-3 sm:mt-0 "
            />

            <div className="text-center">
              <h2 className="text-[10px] sm:text-lg">Approval Rating</h2>
              <div className="flex items-center justify-center">
                <h2 className="text-[10px] sm:text-lg">
                  {lander.approvalRate}
                </h2>
                <img
                  src={meter}
                  alt="Meter"
                  className="sm:h-5 sm:w-7 sm:mt-1 h-3 w-5 "
                />
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-[10px] sm:text-lg">Loan Amount</h2>
              <div className="flex items-center justify-center">
                <h2 className="text-[10px] sm:text-lg">{lander.LoanAmount}</h2>
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-[10px] sm:text-lg">Interest Rate</h2>
              <div className="flex items-center justify-center">
                <h2 className="text-[10px] sm:text-lg">
                  {lander.interestRate}
                </h2>
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-[10px] sm:text-lg">Tenure</h2>
              <div className="flex items-center justify-center">
                <h2 className="text-[10px] sm:text-lg">{lander.Tenure}</h2>
              </div>
            </div>

            <div className="text-center ">
              <h2 className="text-[10px] sm:text-lg">Processing Fee</h2>
              <div className="flex items-center justify-center">
                <h2 className="text-[10px] sm:text-lg">
                  {lander.processingFee}
                </h2>
              </div>
            </div>
          </div>

          <div className="w-full h-0.5 bg-transparent border-t-2 border-dotted sm:mt-0 mt-[20%]  border-gray-500"></div>

          <div
            className="flex  sm:justify-around mt-4 "
            style={{ justifyItems: "center" }}
          >
            <div className="flex text-center sm:space-x-5  ">
              <div className="flex  ">
                <GrDocumentConfig className="mt-1" />
                <h2 className="text-[10px] sm:text-lg">{lander.Collatera}</h2>
              </div>
              <div className="flex ">
                <GrDocumentConfig className="mt-1" />
                <h2 className="text-[10px] sm:text-lg">{lander.Flexible}</h2>
              </div>
              <div className="flex ">
                <GrDocumentConfig className="mt-1" />
                <h2 className="text-[10px] sm:text-lg">{lander.Restriction}</h2>
              </div>
            </div>
            <button className="h-[35px] border w-[40%] text-[13px] sm:text-[17px]  sm:w-[20%] bg-sky-400 text-white font-bold rounded-lg hover:bg-sky-800 flex items-center justify-center">
              Apply Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BussinesLanderList;
