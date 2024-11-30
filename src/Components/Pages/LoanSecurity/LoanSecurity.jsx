import React, { useState } from "react";
import abhi from "../../../assets/abhi.webp";
import toast from "react-hot-toast";

const LoanSecurity = () => {
  const [loanSecurityform, setLoanSecurityform] = useState({
    fullname: "",
    email: "",
    phone: "",
    dob: "",
    pan: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setLoanSecurityform((prev) => ({ ...prev, [name]: checked }));
      
    } else
    setLoanSecurityform((prev) => ({ ...prev, [name]: value }));

  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loanSecurityform.termsAccepted) {
        toast.error("Please accept the Terms and Conditions to proceed.");
        return
    }
    console.log(loanSecurityform);
    toast.success("Checking elegibility")
  };

  return (
    <div className="h-[100vh]">
      <div className="flex justify-between h-[12%] w-full">
        <div className="sm:ml-4 ml-3 mt-2 sm-mt-0">
          <h1 className="sm:text-2xl text-xl">Connect with Abhiloans</h1>
        </div>
        <div className="mr-4 mt-2 sm-mt-0">
          <img src={abhi} alt="" className="h-[50%]" />
        </div>
      </div>
      <div
        className="sm:w-[60%] w-[90%] justify-center  "
        style={{ justifySelf: "center" }}
      >
        <label htmlFor="name" className=" text-gray-700 text-[14px] ">
          Full Name
        </label>
        <input
          type="text"
          name="fullname"
          value={loanSecurityform.fullname}
          onChange={handleChange}
          className="border sm:w-full w-[90%] h-10 rounded px-2"
          placeholder="Enter your Full Name"
        />
        <div className="sm:flex sm:flex-row flex-col justify-between sm:mt-3 mt-2">
          <div className=" sm:w-[43%] w-[90%]">
            <label htmlFor="name" className=" text-gray-700 text-[14px] ">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={loanSecurityform.dob}
              onChange={handleChange}
              className="border w-full h-10  rounded "
            />
          </div>
          <div className="sm:w-[43%] w-[90%] sm:mt-0 mt-3">
            <label htmlFor="name" className=" text-gray-700 text-[14px] ">
              Mobile Number
            </label>
            <input
              type="text"
              name="phone"
              maxLength={10}
              value={loanSecurityform.phone}
              onChange={handleChange}
              className="border w-full h-10  rounded "
              placeholder="Enter your Mobile Number "
            />
          </div>
        </div>

        <div className="sm:flex sm:flex-row flex-col justify-between mt-3">
          <div className="sm:w-[43%] w-[90%] sm:mt-0 mt-3">
            <label htmlFor="name" className=" text-gray-700 text-[14px] ">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={loanSecurityform.email}
              onChange={handleChange}
              className="border w-full h-10  rounded "
              placeholder="Enter your Email"
            />
          </div>
          <div className="sm:w-[43%] w-[90%] sm:mt-0 mt-3 ">
            <label htmlFor="name" className=" text-gray-700 text-[14px] ">
              PAN
            </label>
            <input
              type="text"
              name="pan"
              value={loanSecurityform.pan}
              onChange={handleChange}
              className="border w-full h-10  rounded "
              placeholder="Enter your PAN"
            />
          </div>
        </div>
      </div>
      <div
        className="sm:w-[60%] w-[90%] flex justify-center mt-4 space-x-4 "
        style={{ justifySelf: "center" }}
      >
        <div className="w-[12%]">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={loanSecurityform.termsAccepted}
            onChange={handleChange}
            className="border w-full h-5  rounded mt-5 "
            placeholder="Enter your PAN"
          />
        </div>
        <div className="w-[80%]">
          <p className="text-[13px]">
            By agreeing and accepting the{" "}
            <span className="text-blue-800 underline hover:cursor-pointer">
              Terms and Conditions
            </span>{" "}
            set out herein, you provide your express consent to AbhiLoans
            Private Limited toh access the credit bureaus and credit information
            report and credit score. You also hereby irrevocably and
            unconditionally consent to usage of such credit information being
            provided by credit bureaus
          </p>
        </div>
      </div>
      <div className="sm:w-[60%] w-[90%] h-[20%]" style={{ justifySelf: "center" }}>
        <button
          className="bg-blue-800 rounded-lg ml-[30%] h-[30%] w-[50%] sm:w-[30%] text-white mt-5 hover:bg-blue-950 text-xl uppercase "
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default LoanSecurity;
