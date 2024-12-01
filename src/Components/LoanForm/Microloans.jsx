import React, { useState } from "react";
import PersonalElegible from "../../assets/Micro_loan.png";
import { useNavigate } from "react-router-dom";

const Microloans = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    employmentType: "",
    phone: "",
    amount: "",
    pincode: "",
    income: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
   alert("submit sucess")
  };

  return (
    <div className="sm:min-h-[100vh] min-h-[160vh]">
      <h1 className="font-bold text-4xl text-center">Micro Loan</h1>
      <div className="h-[120vh] sm:h-[70vh] w-[90%] border shadow-xl rounded-xl flex flex-col sm:flex-row justify-around mt-[3%] sm:items-center "style={{justifySelf:"center"}}>
        <div className="h-[30%] sm:h-[90%] sm:w-[50%] w-[70%] items-center text-center " style={{alignSelf:"center"}} >
          <img
            src={PersonalElegible}
            alt="Personal Eligibility"
            className="h-[300px] w-[600px] rounded-xl sm:h-[80%] sm:w-[70%]" style={{justifySelf:"center"}}
          />
        </div>
        <form onSubmit={handleFormSubmit} className="w-full sm:w-[50%]" style={{justifySelf:"center"}}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-[90%] border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter full name"
                required
              />
            </div>

            {/* Phone Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number:
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-[90%] border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter phone number"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email ID:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-[90%] border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter email"
                required
              />
            </div>

            {/* Amount Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Amount Required:
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="mt-1 block w-[90%] border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter amount"
                required
              />
            </div>

            {/* DOB Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                DOB:
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="mt-1 block w-[90%] border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Pincode Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pincode:
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="mt-1 block w-[90%] border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter pincode"
                required
              />
            </div>

            {/* Employment Type Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employment Type:
              </label>
              <select
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
                className="mt-1 block w-[90%] border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select an option</option>
                <option value="Salaried">Salaried</option>
                <option value="Self-employed">Self-employed</option>
              </select>
            </div>

            {/* Income Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your Income:
              </label>
              <input
                type="text"
                name="income"
                value={formData.income}
                onChange={handleChange}
                className="mt-1 block w-[90%] border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your income"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-6 py-2 px-4 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Proceed
          </button>
        </form>
      </div>
    </div>
  );
};

export default Microloans;
