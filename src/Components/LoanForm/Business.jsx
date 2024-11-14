import React, { useState } from "react";
import businesLoan from "../../assets/businessLoan.jpg";
import determinehelp from "../../assets/Determine.png";
import Gdocument from "../../assets/Gdocument.png";
import ApplyLoan from "../../assets/Applyloan.png";


const BusinessEligibilityForm = () => {
  const [isFormVisible, SetIsFormVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    amountRequired: "",
    gender: "MALE",
    companyType: "Proprietorship",
    panNumber: "",
    dob: "",
    businessName: "",
    gstRegistered: "NO",
    businessAge: "",
    annualTurnover: "",
    residentialPincode: "",
    currentAccount: "NO",
  });

  const businessHelp = [
    {
      id: 1,
      image: determinehelp,
      theam:
        "The first step is to determine  how much money you need to borrow and for what purpopse.",
        title:"Determine Needs"
    },
    {
      id: 2,
      image: Gdocument,
      theam:
        "Most lenders will require you to submit documentation like financial statement tex returns and a business plen.",
        title:"Gather Document"
    },
    {
      id: 3,
      image: ApplyLoan,
      theam:
        "Once you've determined your loan needs and gathered the necessary documents, you can start the application process.",
        title:"Apply for the Loan"
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };

  const DisplayForm = (e) => {
    e.preventDefault();
    console.log("Final Form Data:", formData);
  };

  return (
    <div className="sm:min-h-[200vh] min-h-[140vh]">
      {isFormVisible ? (
        <>
          <div className="w-full max-w-lg bg-white p-6 rounded-md shadow-md">
            <div className="flex justify-between border-b pb-2 mb-4">
              <button
                className={`w-1/2 text-center py-2 font-medium ${
                  step === 1
                    ? "text-white bg-blue-500"
                    : "text-gray-500 bg-gray-200"
                } rounded-l-md`}
                onClick={() => setStep(1)}
              >
                1 Basic Details
              </button>
              <button
                className={`w-1/2 text-center py-2 font-medium ${
                  step === 2
                    ? "text-white bg-blue-500"
                    : "text-gray-500 bg-gray-200"
                } rounded-r-md`}
                onClick={() => setStep(2)}
              >
                2 Additional Details
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name:
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number:
                    </label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email ID:
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Amount Required:
                    </label>
                    <input
                      type="number"
                      name="amountRequired"
                      value={formData.amountRequired}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter amount"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Gender:
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="MALE">MALE</option>
                      <option value="FEMALE">FEMALE</option>
                      <option value="OTHER">OTHER</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Company Type:
                    </label>
                    <select
                      name="companyType"
                      value={formData.companyType}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Proprietorship">Proprietorship</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Private Limited">Private Limited</option>
                      <option value="Public Limited">Public Limited</option>
                    </select>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      PAN Number:
                    </label>
                    <input
                      type="text"
                      name="panNumber"
                      value={formData.panNumber}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter PAN Number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      DOB:
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Business Name:
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter Business Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Registered for GST?
                    </label>
                    <select
                      name="gstRegistered"
                      value={formData.gstRegistered}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="YES">YES</option>
                      <option value="NO">NO</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Business Age (in months):
                    </label>
                    <input
                      type="number"
                      name="businessAge"
                      value={formData.businessAge}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter Business Age"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Annual Turnover:
                    </label>
                    <input
                      type="number"
                      name="annualTurnover"
                      value={formData.annualTurnover}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter Annual Turnover"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Residential Pincode:
                    </label>
                    <input
                      type="text"
                      name="residentialPincode"
                      value={formData.residentialPincode}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter Pincode"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Current Account?
                    </label>
                    <select
                      name="currentAccount"
                      value={formData.currentAccount}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="YES">YES</option>
                      <option value="NO">NO</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-6">
                {step > 1 && (
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                    onClick={handlePrevious}
                  >
                    Previous
                  </button>
                )}
                {step < 2 ? (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Submit
                  </button>
                )}
              </div>
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="h-[100vh]">
            <div className="sm:w-[100%] sm:h-[90%] relaltive ">
              <img
                src={businesLoan}
                alt=""
                srcset=""
                className="w-[100%]  h-[100%] rounded-lg mt-2"
              />
            </div>
            <div className="absolute top-[7%] sm:top-[28%] left-[2%] sm:left-[3%] mt-[1%]  ">
              <h1 className="font-bold uppercase text-lg sm:text-[70px] ">
                Expert IN
              </h1>
              <h1 className="font-bold uppercase text-lg sm:text-[60px] sm:mt-[7%]  ">
                Business Loan
              </h1>
              <h1 className="mt-[4%] text-[8px]  sm:text-[12px] text-gray-700">
                A business loan can be vital for export companies seeking growth
                in international markets. <br /> It provides the capital needed
                for expanding production, covering <br /> shipping costs, and
                managing foreign currency fluctuations. <br /> With tailored
                financing solutions, export businesses can meet large orders,
                maintain <br />
                competitive pricing, and explore new markets, <br /> ultimately
                driving global trade and strengthening their financial
                stability.
              </h1>

              <button
                className="bg-yellow-500 text-sm sm:text-sm  sm:ml-[9%] sm:mt-[10%] mt-4 text-white h-9 w-[50%] sm:w-[30%] rounded-md uppercase"
                onClick={DisplayForm}
              >
                Get Started
              </button>
            </div>
            <div className="text-center h-[26vh] sm:h-[40vh] mt-[4%] sm:mt-[2%]">
              <h1 className="font-semibold text-xl sm:text-lg">
                {" "}
                Take Your Business To New Heights With Our{" "}
              </h1>
              <h1 className="font-bold text-2xl sm:text-5xl">
                Flexible and Affordable Loans !
              </h1>
              <p className="sm:text-md text-sm font-serif mt-[1%] ">
                Running a successful business often involves strategic financial
                management, and loans can be a key <br /> resource for growth and
                stability. Business loans offer  the capital needed to
                expand operations, invest in new <br /> equipment, increase inventory,
                or explore new markets. For entrepreneurs, securing a <br />{" "}
        
              </p>
            </div>
            <div className="h-[67vh] w-[80%] flex-col sm:flex justify-center sm:mt-[2%] space-x-4" style={{justifySelf:"center"}}>
              {businessHelp.map((loan, index) => (
                <div key={index} className=" space-x-3 text-center items-center justify-center " >
                  <div className="" style={{justifyItems:"center"}}>
                    <h1 className="font-bold text-lg">{loan.title}</h1>
                    <img src={loan.image} alt=" " className="h-[15%] w-[130px]" />
                  </div>
                  <h1>{loan.theam}</h1>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BusinessEligibilityForm;
