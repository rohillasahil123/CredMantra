import React, { useState, useEffect } from "react";
import faircent from "../../../assets/faircent.webp";
import moneytap from "../../../assets/moneytap-logo.svg";
import Cashe from "../../../assets/clickmyloans.webp";
import piramal from "../../../assets/piramal-vector-logo.png";
import prefr from "../../../assets/prefr.png";
import ramfin from "../../../assets/ramfin.png";
import Upwards from "../../../assets/Upwards.png";
import Fibe from "../../../assets/FIBE.webp";
import zype from "../../../assets/Zipe.webp";
import moneyview from "../../../assets/moneyview.svg";
import SmartCoin from "../../../assets/smartcoin.jpg";
import landingkart from "../../../assets/Lendingkart.svg"
import mpocket from "../../../assets/mpkt.svg"
import meter from "../../../assets/meter.png";
import { GiMoneyStack } from "react-icons/gi";
import { GrDocumentConfig } from "react-icons/gr";
import Cookies from "js-cookie";
import axios from "axios";
const LenderList = () => {
  const [user, setUser] = useState({});
  const [filteredLenders, setFilteredLenders] = useState([]);

  const leandersdetails = [
    {
      name: "Fibe",
      approvalRate: "Good",
      LoanAmount: "3,00,000",
      interestRate: "starting from 22% to 28%",
      Tenure: "Upto 18 month",
      processingFee: "Upto 2%",
      image: Fibe,
      Collatera: "No Collatera",
      Flexible: "Flexible Repayment",
      Restriction: "No Usage Restriction",
    },
    {
      name: "Upwards",
      approvalRate: "Excellent",
      LoanAmount: "2,00,000",
      interestRate: "starting from 24% to 30%",
      Tenure: "Upto 30 month",
      processingFee: "Upto 3%",
      image: Upwards,
      Collatera: "No Collatera",
      Flexible: "Flexible Repayment",
      Restriction: "No Usage Restriction",
    },
    {
      name: "Cashe",
      approvalRate: "Good",
      LoanAmount: "5,00,000",
      interestRate: "starting from 26%",
      Tenure: "Upto 24 month",
      processingFee: "Upto 2.5%",
      image: Cashe,
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
      image: faircent.webp,
      Collatera: "No Collatera",
      Flexible: "Flexible Repayment",
      Restriction: "No Usage Restriction",
    },
    {
      name: "MoneyTap  ",
      approvalRate: "Excellent",
      LoanAmount: "3,00,000",
      interestRate: "starting from 22% to 28%",
      Tenure: "Upto 18 month",
      processingFee: "Upto 2.2%",
      image: moneytap,
      Collatera: "No Collatera",
      Flexible: "Flexible Repayment",
      Restriction: "No Usage Restriction",
    },
    {
      name: "MoneyView ",
      approvalRate: "Good",
      LoanAmount: "8,00,000",
      interestRate: "starting from 26% to 28%",
      Tenure: "Upto 38 month",
      processingFee: "Upto 2.4%",
      image: moneyview,
      Collatera: "No Collatera",
      Flexible: "Flexible Repayment",
      Restriction: "No Usage Restriction",
    },
    {
      name: "SmartCoin ",
      approvalRate: "Excellent",
      LoanAmount: "3,00,000",
      interestRate: "starting from 22% to 28%",
      Tenure: "Upto 18 month",
      processingFee: "Upto 3.0%",
      image: SmartCoin,
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
      image: landingkart,
      Collatera: "No Collatera",
      Flexible: "Flexible Repayment",
      Restriction: "No Usage Restriction",
    },
    {
      name: "MPocket ",
      approvalRate: "Excellent",
      LoanAmount: "2,00,000",
      interestRate: "starting from 22% to 28%",
      Tenure: "Upto 24 month",
      processingFee: "Upto 2.6%",
      image: mpocket,
      Collatera: "No Collatera",
      Flexible: "Flexible Repayment",
      Restriction: "No Usage Restriction",
    },
    {
      name: "RamFin  ",
      approvalRate: "Good",
      LoanAmount: "3,00,000",
      interestRate: "starting from 26% to 28%",
      Tenure: "Upto 30 month",
      processingFee: "Upto 2.6%",
      image: ramfin,
      Collatera: "No Collatera",
      Flexible: "Flexible Repayment",
      Restriction: "No Usage Restriction",
    },
    {
      name: "piramal ",
      approvalRate: "Excellent",
      LoanAmount: "2,00,000",
      interestRate: "starting from 24% to 26%",
      Tenure: "Upto 24 month",
      processingFee: "Upto 2.6%",
      image: piramal,
      Collatera: "No Collatera",
      Flexible: "Flexible Repayment",
      Restriction: "No Usage Restriction",
    },
    {
      name: "prefr ",
      approvalRate: "Good",
      LoanAmount: "2,00,000",
      interestRate: "starting from 23% to 28%",
      Tenure: "Upto 36 month",
      processingFee: "Upto 2.6%",
      image: prefr,
      Collatera: "No Collatera",
      Flexible: "Flexible Repayment",
      Restriction: "No Usage Restriction",
    },
    {
      name: "zype ",
      approvalRate: "Excellent",
      LoanAmount: "2,00,000",
      interestRate: "starting from 26% to 30%",
      Tenure: "Upto 30 month",
      processingFee: "Upto 2.6%",
      image: zype,
      Collatera: "No Collatera",
      Flexible: "Flexible Repayment",
      Restriction: "No Usage Restriction",
    },
    {
      name: "Upwards2",
      approvalRate: "Excellent",
      LoanAmount: "2,00,000",
      interestRate: "starting from 22% to 28%",
      Tenure: "Upto 36 month",
      processingFee: "Upto 3%",
      image: Upwards,
      Collatera: "No Collatera",
      Flexible: "Flexible Repayment",
      Restriction: "No Usage Restriction",
    },
  ];

  useEffect(() => {
    const fetchUserIdFromCookiesAndLenderData = async () => {
      const dob = Cookies.get("userdob");
      const income = Cookies.get("userincome");
      const pincode = Cookies.get("userpincode");
      if (pincode , dob , income ) {
        setUser(pincode , dob , income );
        console.log("User ID from cookies:", user);
        try {
          const response = await axios.post(
            "https://credmantra.com/api/v1/auth/lender",
            { dob , income, pincode }
          );
          console.log("API Response:", response.data.data);
          const apiNames = response.data.data.map((name) =>
            name.trim().toLowerCase()
          );
          const matchedLenders = leandersdetails.filter((lender) =>
            apiNames.includes(lender.name.trim().toLowerCase())
          );
          setFilteredLenders(matchedLenders);
          console.log("Matched Lenders:", matchedLenders);
        } catch (error) {
          console.error("Error fetching lender data:", error);
        }
      }
    };
    fetchUserIdFromCookiesAndLenderData();
  }, []);

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
      {filteredLenders.map((lander, index) => (
        <div
          className="sm:w-[93%] h-[23vh] w-[90%] sm:h-[40vh] mt-[3%] border border-gray-800 rounded-2xl items-center text-center "
          style={{ justifySelf: "center" }}
          key={index}
        >
          <div className=" flex sm:w-full h-[20%] w-[20%] sm:h-[25vh] mt-[3%] rounded-lg sm:justify-around text-gray-600 space-y-2 space-x-4 sm:space-x-0 ">
            <img
              src={lander.image}
              alt="Safety List"
              className="sm:h-[86%] sm:w-[16%] h-full w-full ml-1 sm:ml-0 mt-3 sm:mt-0 " />
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


export default LenderList;
