import React from "react";
import {
  CiHeart,
  CiShoppingCart,
  CiMail,
  CiFolderOn,
  CiHome,
  CiFacebook,
  CiLinkedin,
  CiTwitter,
  CiInstagram,
} from "react-icons/ci";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoMail } from "react-icons/io5";

const Footer = () => {
  return (
    <>
      <div className="w-full h-auto ">
        <div className="flex flex-col lg:flex-row justify-around  bg-gray-500 text-white py-8 items-center sm:items-start mt-[13%] h-[60%] ">
          <div className="mb-8 lg:mb-0">
            <div className="font-bold">CATEGORIES</div>
            <Link to="/personalloan">
              <div className="mt-4 flex">
                <CiHeart className="mt-[5px] mr-[3px]" /> Personal loan
              </div>{" "}
            </Link>
            <Link to="/businessloan">
              <div className="flex">
                <CiShoppingCart className="mt-[5px] mr-[3px]" /> Business Loan
              </div>
            </Link>
            <div className="flex">
              <CiMail className="mt-[5px] mr-[3px]" /> Credit card
            </div>

            <div className="flex">
              <FaArrowAltCircleRight className="mt-[5px] mr-[3px]" />
              Paylater
            </div>
            <Link to="/partner">
              <div className="flex">
                <CiFolderOn className="mt-[5px] mr-[3px]" /> Our Partner
              </div>{" "}
            </Link>
            <Link to="/contect">
              {" "}
              <div className="flex">
                {" "}
                <CiHome className="mt-[5px] mr-[3px]" /> Contect Us{" "}
              </div>{" "}
            </Link>
            {/* <div className="flex">
            <FaRegFilePdf className="mt-[5px] mr-[3px]" /> Sample
          </div>
          <div className="flex h-12">
            <CiGlobe className="mt-[5px] mr-[3px]" /> Style
          </div> */}
          </div>

          <div className="text-center mb-8 lg:mb-0">
            <div className="font-bold">Resources</div>
            <Link to="/emicalculator">
              {" "}
              <div className="flex">
                <CiHeart className="mt-[5px] mr-[3px]" /> EMI Caluculator
              </div>
            </Link>
          </div>

          <div className="text-center lg:text-left  ">
            <div className="font-bold mb-4 ml-9">CONTACT</div>
            <div className="text-2xl flex justify-center lg:justify-start items-center mb-4">
              <div className="ml-3">
                <h1 className="font-bold">cashfelly</h1>
              </div>
            </div>
            <div className="flex justify-center lg:justify-start items-center">
              <IoMail className="mr-2" />
              <h1>cashfelly.co.in</h1>
            </div>
          </div>
        </div>
        <div className="bg-black w-full h-auto text-white text-center flex flex-col lg:flex-row justify-between items-center px-4 lg:px-24">
          <div className="font-semibold mb-4 lg:mb-0">
            @CopyRight cashfelly
          </div>
          <div className="flex space-x-3 ">
            <CiFacebook className="h-[40px] w-[40px] sm:h-[60px] sm:w-[40px] hover:cursor-pointer" />
            <CiInstagram className="h-[40px] w-[40px] sm:h-[60px] sm:w-[40px] hover:cursor-pointer" />
            <CiLinkedin className="h-[40px] w-[40px] sm:h-[60px] sm:w-[40px] hover:cursor-pointer" />
            <CiTwitter className="h-[40px] w-[40px] sm:h-[60px] sm:w-[40px] hover:cursor-pointer" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
