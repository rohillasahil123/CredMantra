import React from "react";
import saftylist from "../../assets/safty.png";
import meter from "../../assets/meter.png";
import { GiMoneyStack } from "react-icons/gi";
import { GrDocumentConfig } from "react-icons/gr";

const LenderList = () => {

  return (
    <div
      className="text-center items-center h-[100vh]  "
      style={{ justifyItems: "center" }}
    >
      <div className="flex items-center text-4xl font-semibold justify-center mt-3">
        <GiMoneyStack />
        <h1 className="mx-2">Select a Lender</h1>
        <GiMoneyStack /> <br />
      </div>
      <p className="text-2xl mt-[1.3%]">
        Here are the offers that will best suit your needs.
      </p>
    <div className="w-[93%] h-auto sm:h-[40vh] mt-[3%] shadow-2xl rounded-2xl" >
      <div className="border sm:flex w-full h-auto sm:h-[25vh] mt-[3%] rounded-lg sm:justify-around text-gray-600 space-y-2"
        style={{ justifyItems: "center" }}>
        <img src={saftylist} alt="" className="sm:h-[90%] sm:w-[20%]" />

        <div className="text-center " style={{ justifyItems: "center" }}>
          <h2>Approval Rating</h2>
          <div className="flex  items-center ">
            <h2>Excellent</h2>
            <img src={meter} alt="" className="h-5 w-7 mt-1" />
          </div>
        </div>
        <div className="text-center " style={{ justifyItems: "center" }}>
          <h2>Approval Rating</h2>
          <div className="flex  items-center ">
            <h2>Excellent</h2>
            <img src={meter} alt="" className="h-5 w-7 mt-1" />
          </div>
        </div>
        <div className="text-center " style={{ justifyItems: "center" }}>
          <h2>Approval Rating</h2>
          <div className="flex  items-center ">
            <h2>Excellent</h2>
            <img src={meter} alt="" className="h-5 w-7 mt-1" />
          </div>
        </div>
        <div className="text-center " style={{ justifyItems: "center" }}>
          <h2>Approval Rating</h2>
          <div className="flex  items-center ">
            <h2>Excellent</h2>
            <img src={meter} alt="" className="h-5 w-7 mt-1" />
          </div>
        </div>
        <div className="text-center " style={{ justifyItems: "center" }}>
          <h2>Approval Rating</h2>
          <div className="flex  items-center ">
            <h2>Excellent</h2>
            <img src={meter} alt="" className="h-5 w-7 mt-1" />
          </div>
        </div>
      </div> 
      <div className="w-full h-0.5 bg-transparent border-t-2 border-dotted border-gray-500 "></div>
      <div className="flex justify-around mt-4 ">
        <div className="flex space-x-3">
        <div className="flex space-x-2">
        <GrDocumentConfig className="mt-1" />
                <h2>No Collateral</h2>
          </div>
          <div className="flex space-x-2">
        <GrDocumentConfig className="mt-1" />
                <h2>No Collateral</h2>
          </div>
          <div className="flex space-x-2">
        <GrDocumentConfig className="mt-1" />
                <h2>No Collateral</h2>
          </div>
          </div>
            <button className="h-[35px] border w-[20%] bg-sky-400 text-white font-bold rounded-lg hover:bg-sky-800 ">Apply Now</button>
        </div>
    </div>
    </div>
  );
};

export default LenderList;
