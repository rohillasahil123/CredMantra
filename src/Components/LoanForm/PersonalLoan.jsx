import React, { useState } from "react";
import businesLoan from "../../assets/businessLoan.jpg";
import determinehelp from "../../assets/Determine.png";
import Gdocument from "../../assets/Gdocument.png";
import ApplyLoan from "../../assets/Applyloan.png";
import InBusinessLoan from "../../assets/inbusinessLoan.png";
import helpBusiness from "../../assets/HelpBusiness.jpg";
import personalLoan from "../../assets/personalloan.jpg";

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
      title: "Determine Needs",
    },
    {
      id: 2,
      image: Gdocument,
      theam:
        "Most lenders will require you to submit documentation like financial statement tex returns and a business plen.",
      title: "Gather Document",
    },
    {
      id: 3,
      image: ApplyLoan,
      theam:
        "Once you've determined your loan needs and gathered the necessary documents, you can start the application process.",
      title: "Apply for the Loan",
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

  const DisplayForm = () => {
    SetIsFormVisible(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="sm:min-h-[200vh] min-h-[160vh]">
      {isFormVisible ? (
        <>
          <h1 className="font-bold text-4xl text-center">Business Loan </h1>
          <div
            className=" h-[80vh] sm:h-[90vh] w-[90%] border shadow-xl rounded-xl items-center flex-col sm:flex-row sm:flex justify-around mt-[3%] "
            style={{ justifySelf: "center", justifyItems: "center" }}
          >
            <div className="h-[30%] sm:h-[90%] sm:w-[50%] w-[70%] items-center text-center ">
              <img
                src={InBusinessLoan}
                alt=""
                srcset=""
                className=" h-[100%] w-[100%]  sm:h-full sm:w-full"
              />
            </div>
            <form onSubmit={handleSubmit}>
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
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
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
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
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
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
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
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
                    placeholder="Enter amount"
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
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Pincode:
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
                    placeholder="Enter Pincode"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    What to Do?
                  </label>
                  <select
                    name="whattodo"
                    value={formData.whattodo}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    <option value="">Select an option</option>
                    <option value="Salaried">Salaried</option>
                    <option value="Self-employed">Self-employed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Your Income:
                  </label>
                  <input
                    type="text"
                    name="income"
                    value={formData.income}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
                    placeholder="Enter your income"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-6 py-2 px-4 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105"
              >
                Proceed
              </button>
            </form>
          </div>
          <div
            className="h-[60vh] w-full flex-col sm:flex-row sm:flex justify-around mt-[70%] sm:mt-[8%] items-center "
            style={{ justifyItems: "center" }}
          >
            <div className="h-[50%] sm:h-full sm:w-[40%] w-[80%] sm:mt-[18%] space-y-2 ml-4">
              <h1 className=" text-sm sm:text-xl font-semibold">
                How Can We help
              </h1>
              <h1 className=" text-xl sm:text-3xl font-bold">
                We Love Help Small Business
              </h1>
              <p className="sm:text-md text-sm ">
                Small businesses are the backbone of many local economies and
                can have a significant impact on the communities they serve. As
                a small business owner. There are many resources available to
                help you grow and succeed.
              </p>
              <button className="text-md font-bold rounded-lg bg-yellow-500 h-[16%] w-[30%] sm:h-[10%] sm:w-[40%] mt-[3%] hover:bg-yellow-700">
                Apply
              </button>
            </div>
            <div className="h-[80%] sm:h-[90%]   w-[60%] sm:w-[30%]  mr-[6%] ">
              <img
                src={helpBusiness}
                alt=""
                className=" h-[50%] sm:h-[100%] w-[100%] rounded-lg"
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="h-[100vh]">
            <div className="sm:w-[100%] sm:h-[90%] relaltive ">
              <img
                src={personalLoan}
                alt=""
                srcset=""
                className="w-[100%]  h-[100%] rounded-lg mt-2 "
              />
            </div>
            <div className="absolute top-[7%] sm:top-[23%] left-[2%] sm:left-[7%]  text-white ">
              <h1 className="font-bold uppercase text-lg sm:text-[40px] font-serif ">
                Because Your Dreams are 
              </h1>
              <h1 className="font-bold uppercase text-lg sm:text-[30px] sm:mt-[2%] font-serif ">
                Importent to us
              </h1>
              <h1 className="mt-[4%] text-[8px] sm:text-xl w-[40%]  text-white uppercase ">
              ✅ Approval in Seconds
              </h1>
              <h1 className="mt-[1%] text-[8px] sm:text-xl w-[40%]  text-white uppercase ">
              ✅ No faxing
              </h1>
              <h1 className="mt-[1%] text-[8px] sm:text-xl w-[40%]  text-white uppercase   ">
              ✅ High Approval rate
              </h1> 

              <button
                className="bg-yellow-500 text-sm sm:text-sm  sm:ml-[4%] sm:mt-[4%] mt-4 text-white h-9 w-[50%] sm:w-[30%] rounded-md uppercase"
                onClick={DisplayForm}
              >
                Get Started
              </button>
            </div>
            <div
              className="text-center h-[26vh] sm:h-[40vh] mt-[4%] sm:mt-[2%] w-[80%]"
              style={{ justifySelf: "center" }}
            >
              <h1 className="font-semibold text-md sm:text-lg">
                {" "}
                Take Your Business To New Heights With Our{" "}
              </h1>
              <h1 className="font-bold text-xl sm:text-5xl">
                Flexible and Affordable Loans !
              </h1>
              <p className="sm:text-xl text-[10px] font-serif mt-[1%] ">
                Running a successful business often involves strategic financial
                management, and loans can be a key resource for growth and
                stability. Business loans offer the capital needed to expand
                operations, invest in new equipment, increase inventory, or
                explore new markets. For entrepreneurs, securing a{" "}
              </p>
            </div>
            <div
              className="h-[67vh] w-[80%] flex-col sm:flex sm:flex-row justify-center sm:mt-[2%] space-x-4"
              style={{ justifySelf: "center" }}
            >
              {businessHelp.map((loan, index) => (
                <div
                  key={index}
                  className=" space-x-3 text-center items-center justify-center "
                >
                  <div className="" style={{ justifyItems: "center" }}>
                    <h1 className="font-bold text-lg">{loan.title}</h1>
                    <img
                      src={loan.image}
                      alt=" "
                      className="h-[15%] w-[130px]"
                    />
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
