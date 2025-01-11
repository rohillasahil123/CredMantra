import React from "react";
import partnerImg from "../../../assets/Partner.png";
import Airtel_logo from "../../../assets/Airtel_logo.png";
import Bhanix_logo from "../../../assets/bhanix.jpg";
import fibe_logo from "../../../assets/FIBE.webp";
import moneytap_logo from "../../../assets/moneytap-logo.svg";
import payme_logo from "../../../assets/payme.svg";
import moneyview_logo from "../../../assets/moneyview.svg";
import zype_logo from "../../../assets/Zipe.webp";
import pocket_loan_logo from "../../../assets/pocket_loan.svg";
import ramfan_logo from "../../../assets/ramfan_logo.png";

const Partner = () => {
  const PartnerIamge = [
    {
      ImageSrc: "Airtel Bank",
      imgdata: Airtel_logo,
      imageMessage:
        "Airtel Payment Bank offers instant loans with quick approval, minimal documentation, and flexible repayment options. It caters to diverse financial needs, providing personal loans, business loans, and credit access directly through its app or partnered platforms",
    },
    {
      ImageSrc: "Cashe",
      imgdata: Bhanix_logo,
      imageMessage:
        "A cash lender provides quick loans, offering immediate financial support with simple terms. Borrowers repay with interest, enabling access to urgent funds for personal or business needs, ensuring convenience and flexibility for short-term financial solutions.",
    },
    {
      ImageSrc: "Ramfin",
      imgdata: ramfan_logo,
      imageMessage:
        "Ramfin Lender provides quick, reliable loans with flexible repayment options. Whether personal, business, or emergency needs, they offer competitive interest rates, fast approvals, and tailored solutions to meet financial goals, ensuring seamless borrowing experiences for all clients.",
    },
    {
      ImageSrc: "Fibe",
      imgdata: fibe_logo,
      imageMessage:
        "Fibe Lender offers quick, hassle-free loans tailored to your needs. Get personal, business, or home loans with flexible repayment terms and low interest rates. Simplified application process ensures easy access to funds when you need them most.",
    },
    {
      ImageSrc: "Zype",
      imgdata:zype_logo,
      imageMessage:
        "Zype Lender offers quick, hassle-free loans tailored to your needs. Get personal, business, or home loans with flexible repayment terms and low interest rates. Simplified application process ensures easy access to funds when you need them most.",
    },
    {
      ImageSrc: "MoneyTap",
      imgdata: moneytap_logo,
      imageMessage:
        "MoneyTap offers instant loans with flexible repayment options. Borrowers can access credit for personal needs, emergencies, or purchases. With quick approvals, low interest rates, and easy EMIs, it simplifies borrowing for salaried professionals and self-employed individuals.",
    },
    {
      ImageSrc: "Payme",
      imgdata: payme_logo,
      imageMessage:
        "PayMe offers instant loans, quick approval, flexible repayment, and competitive interest rates. Tailored for personal, business, or emergency needs, it ensures seamless loan applications with minimal documentation, empowering borrowers with financial solutions anytime, anywhere.",
    },
    {
      ImageSrc: "MoneyView",
      imgdata: moneyview_logo,
      imageMessage:
        "MoneyView offers instant personal loans with flexible repayment terms, low-interest rates, and quick approvals. Loans are available for various needs like education, medical emergencies, or travel, ensuring seamless access to credit through a user-friendly digital platform.",
    },
    {
      ImageSrc: "pocketLoan",
      imgdata: pocket_loan_logo,
      imageMessage:
        "A pocket loan lender offers small, short-term loans, typically with quick approval and minimal paperwork. These loans are designed to cover urgent expenses, often with higher interest rates, and are repaid quickly, usually within a few weeks or months.",
    },
  ];

  return (
    <>
      <div className="h-auto  w-full text-center items-center shadow-2xl ">
        <div className="text-center sm:flex sm:justify-around  ">
          <h1 className="text-3xl mt-[7%] font-semibold ">Our Partners :--</h1>
          <div className="">
            <img
              src={partnerImg}
              alt=""
              className="ml-[13%] h-[30%] sm:h-[60%] w-[80%] sm:w-[60%] mt-[10%] sm:ml-[60%]  hover:cursor-pointer transition-transform hover:scale-105  "
            />
          </div>
        </div>
        <h1 className="text-2xl font-semibold  ">
          Supporting Partners <span className="text-sky-500 ">—</span>
        </h1>
        <div
          style={{ "justify-items": "center" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-[3%]  sm:ml-0 sm:text-center items-center flex-col "
        >
          {PartnerIamge.map((loan, index) => (
            <div
              key={index}
              className="w-[60%] h-auto mt-[10%] flex  sm:w-[70%] sm:h-[80%] shadow-xl rounded-xl sm:flex flex-row sm:flex-col items-center justify-center     p-4  hover:shadow-[0_0_30px_15px_rgba(30,23,25)] hover:cursor-pointer transition-transform hover:scale-105  "
            >
              <div className=" sm:ml-auto  sm:w-full">
                <img
                  src={loan.imgdata}
                  alt=""
                  srcset=""
                  className="w-[80%] h-[40%]"
                  style={{ justifySelf: "center" }}
                />
                {/* <h1 className="title-font font-bold text-gray-700- text-2xl ">
                  {loan.ImageSrc}
                </h1> */}
                <p className="text-[10px]">{loan.imageMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Partner;
