import React from "react";
import {
  CiHeart,
  CiShoppingCart,
  CiMail,
  CiFolderOn,
  CiHome,
  CiGlobe,
  CiFacebook,
  CiLinkedin,
  CiTwitter,
  CiInstagram,
} from "react-icons/ci";
import { FaArrowAltCircleRight, FaRegFilePdf } from "react-icons/fa";
import { ImQuotesLeft } from "react-icons/im";
import { IoMail } from "react-icons/io5";

const Footer = () => {
  return (
    <>
    <div className="w-full h-[60vh]">
      <div className="flex flex-col lg:flex-row justify-around bg-gray-500 text-white py-8">
        <div className="mb-8 lg:mb-0">
          <div className="font-bold">CATEGORIES</div>
          <div className="mt-6 flex">
            <CiHeart className="mt-[5px] mr-[3px]" /> Subscribe
          </div>
          <div className="flex">
            <CiShoppingCart className="mt-[5px] mr-[3px]" /> Store
          </div>
          <div className="flex">
            <CiMail className="mt-[5px] mr-[3px]" /> Contact
          </div>
          <div className="flex">
            <FaArrowAltCircleRight className="mt-[5px] mr-[3px]" /> Advertise
          </div>
          <div className="flex">
            <CiFolderOn className="mt-[5px] mr-[3px]" /> Submit
          </div>
          <div className="flex">
            <CiHome className="mt-[5px] mr-[3px]" /> Address
          </div>
          <div className="flex">
            <FaRegFilePdf className="mt-[5px] mr-[3px]" /> Sample
          </div>
          <div className="flex h-12">
            <CiGlobe className="mt-[5px] mr-[3px]" /> Style
          </div>
        </div>

        <div className="text-center mb-8 lg:mb-0">
          <h1 className="flex justify-center">
            <ImQuotesLeft className="h-[40px] w-[40px] lg:h-[50px] lg:w-[50px]" />
          </h1>
          <h1 className="font-bold mt-4 lg:mt-2">
            " The Hungarian interest is that, if necessary, we should <br /> make loan agreements with the IMF on a regular basis."
          </h1>
          <p className="font-semibold">@Hungarian - Politician </p>
        </div>

        <div className="text-center lg:text-left  ">
          <div className="font-bold mb-4 ml-9">CONTACT</div>
          <div className="text-2xl flex justify-center lg:justify-start items-center mb-4">
            <div className="ml-3">
              <h1 className="font-bold">CredMantra</h1>
            
            </div>
          </div>
          <div className="flex justify-center lg:justify-start items-center">
            <IoMail className="mr-2" />
            <h1>CredMantra.co.in</h1>
          </div>
        </div>
      </div>
    <div className="bg-black w-full h-[12%] text-white text-center flex flex-col lg:flex-row justify-between items-center px-4 lg:px-24">
    <div className="font-semibold mb-4 lg:mb-0">@CopyRight CredMantra</div>
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