// src/components/LoanTap.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import LoanTapImage from "../../../assets/LoanTap.svg"

const LoanTap = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    loan_required: '',
    loanTerm: '',
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);


  useEffect(()=>{
    const filldata = async()=>{
      const token = Cookies.get('userToken')
      const response = await axios.get('https://credmantra.com/api/v1/auth/verify-user',
        {
          headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',

          }
        }
      )
      const data = response.data.data.user
      setFormData(data)
      console.log(data)

    }
    filldata()
  },[])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex flex-col items-center mt-5 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between w-[90%] items-center mb-8">
      <h1 className="text-2xl font-semibold mb-5">LoanTap Application</h1>
      <img src={LoanTapImage} alt="LoanTap" className="h-12" />
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-md ">
        <div className='w-[93%]' style={{justifySelf:"center"}}>
        <div className="flex flex-col mb-4">
          <label htmlFor="name" className="mb-2">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded w-[95%]"
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="email" className="mb-2">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded w-[95%]"
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="loanAmount" className="mb-2">Loan Amount:</label>
          <input
            id="loanAmount"
            name="loan_required"
            type="number"
            placeholder="Loan Amount"
            value={formData.loan_required}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded w-[95%]"
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="loanTerm" className="mb-2">Loan Term (years):</label>
          <input
            id="loanTerm"
            name="loanTerm"
            type="number"
            placeholder="Loan Term (years)"
            value={formData.loanTerm}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded w-[95%]"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        </div>
      </form>
      {response && (
        <div className="mt-5">
          <p className="text-green-500">Response: {JSON.stringify(response)}</p>
        </div>
      )}
    </div>
  );
};

export default LoanTap;