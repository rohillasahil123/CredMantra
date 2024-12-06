import React, { useState } from "react";
import applyOnline from "../../assets/Applyloan.png";
import ApproveLoan from "../../assets/Approval.png";
import Recivingloan from "../../assets/recivingloan.png";
import helpPersonal from "../../assets/HelpPersonal.jpg";
import personalLoan from "../../assets/personalloan.jpg";
import PersonalElegible from "../../assets/ElegibillityPersonal.png";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";

const PersonalEligibilityForm = () => {
  const [isFormVisible, SetIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob:"",
    employmentType:"",
    phone: "",
    amount: "",
    pincode: "",
    income:""
  });

  const navigate = useNavigate()  
  
  const businessHelp = [
    {
      id: 1,
      image: applyOnline,
      theam:
        "Apply Online for Quick and Easy Personal Loans! Get instant approvals, flexible terms, and affordable rates to meet your financial needs. Secure your future from the comfort of your home.",
      title: "Apply Online",
    },
    {
      id: 2,
      image: ApproveLoan,
      theam:
        "Get Instant Loan Approval Today! Enjoy a hassle-free process with minimal documentation, flexible repayment options, and competitive rates. Your financial solution is just a click away. Apply now and relax.",
      title: "Get Approval",
    },
    {
      id: 3,
      image: Recivingloan,
      theam:
        "Receive Funds Instantly with Our Hassle-Free Personal Loans! Enjoy quick approvals, flexible repayment options, and competitive rates to cover your needs. Apply today and access your funds in no time.",
      title: "Recive Funds",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const DisplayForm = () => {
    SetIsFormVisible(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://credmantra.com/api/v1/auth/eli", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        dob: formData.dob, 
        employmentType: formData.employmentType,  
        amount: formData.amount,  
        income: formData.income,  
        pincode: formData.pincode 
      });
    
      Cookies.set("userpincode", formData.pincode, { secure: true, sameSite: "Strict", expires: 1 });
      Cookies.set("userdob", formData.dob, { secure: true, sameSite: "Strict", expires: 1 });
      Cookies.set("userincome", formData.income, { secure: true, sameSite: "Strict", expires: 1 });
      toast.success("Checking eligibleity Please Wait few Sec")
      navigate("/landerlist")
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form");
    }
  };
  

  return (
    <div className="sm:min-h-[200vh] min-h-[160vh]">
      {isFormVisible ? (
        <>
          <h1 className="font-bold text-4xl text-center">Personal Loan </h1>
          <div
            className=" h-[120vh] sm:h-[90vh] w-[90%] border shadow-xl rounded-xl items-center flex-col sm:flex-row sm:flex justify-around mt-[3%] "
            style={{ justifySelf: "center", justifyItems: "center" }}
          >
            <div
              className="h-[30%] sm:h-[90%] sm:w-[50%] w-[70%] items-center text-center"
              style={{ justifyItems: "center", alignContent: "center" }}
            >
              <img
                src={PersonalElegible}
                alt=""
                srcset=""
                className=" h-[90%] w-[100%] rounded-xl sm:h-[80%] sm:w-[70%]"
              />
            </div>
            <form onSubmit={handleFormSubmit}>
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
                    name="phone"
                    value={formData.phone}
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
                    name="amount"
                    value={formData.amount}
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
                  employmentType
                  </label>
                  <select
                    name="employmentType"
                    value={formData.employmentType}
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
            className="h-[60vh] w-full flex-col sm:flex-row sm:flex justify-around mt-[4%] sm:mt-[8%] items-center "
            style={{ justifyItems: "center" }}
          >
            <div className="h-[50%] sm:h-full sm:w-[40%] w-[80%] sm:mt-[8%] space-y-2 ml-4">
              <h1 className=" text-sm sm:text-xl font-semibold">
                How Can We Help?
              </h1>
              <h1 className=" text-xl sm:text-3xl font-bold">
                We Love Helping Individuals Achieve Their Dreams.
              </h1>
              <p className="sm:text-md text-sm ">
                Personal loans can provide the financial support you need to
                overcome challenges and reach your goals. Whether it’s
                consolidating debt, covering unexpected expenses, or making a
                big purchase, we’re here to help. With flexible terms and
                competitive rates, we offer the resources you need to secure
                your financial future and achieve success.
              </p>
              <button className="text-md font-bold rounded-lg bg-yellow-500 h-[16%] w-[30%] sm:h-[10%] sm:w-[40%] mt-[3%] hover:bg-yellow-700">
                Apply
              </button>
            </div>
            <div className="h-[80%] sm:h-[90%] mt-[20%] sm:mt-0 w-[80%] sm:w-[30%]  ">
              <img
                src={helpPersonal}
                alt=""
                className=" h-[40%] sm:h-[100%] w-[80%] rounded-lg"
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
                Fuel Your Dreams with Flexible and Affordable Personal Loans{" "}
              </h1>
              <h1 className="font-bold text-xl sm:text-4xl">
                Your Path to Financial Freedom Starts Here!
              </h1>
              <p className="sm:text-xl text-[10px] font-semiboold mt-[1%] ">
                Empower Your Future with Our Flexible and Affordable Personal
                Loans! Personal loans can be the perfect solution for reaching
                life goals or managing financial needs. Our loans offer fast
                access to funds for covering expenses, consolidating debt, or
                planning a major purchase. With our flexible terms and
                competitive rates, achieving financial stability has never been
                easier. Secure your loan today!
              </p>
            </div>
            <div
              className="h-[67vh]   w-[80%] flex-col sm:flex sm:flex-row justify-center sm:mt-[2%] space-x-4"
              style={{ justifySelf: "center" }}
            >
              {businessHelp.map((loan, index) => (
                <div
                  key={index}
                  className=" space-x-3 text-center items-center justify-center sm:w-[50%] "
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

export default PersonalEligibilityForm;
