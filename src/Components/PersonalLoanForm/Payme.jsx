// src/components/Payme.js
import React, { useState } from 'react';
import axios from 'axios';
import PaymeImage from "../../assets/payme copy.svg"

const Payme = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

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
    // setLoading(true);
    // try {
    //   const res = await axios.post('https://credmantra.com/api/payme', formData);
    //   setResponse(res.data);
    // } catch (error) {
    //   console.error('API Error:', error);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="flex flex-col items-center mt-5 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between w-[90%] items-center mb-8">
      <h1 className="text-2xl font-semibold mb-5">Connect with PayMe</h1>
      <img src={PaymeImage} alt="PayMe" className="h-12" />
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="flex flex-col mb-4">
            <label htmlFor="name" className="mb-2">Name:</label>
            <input
                id="name"
                name="name"
                type="text"
                placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
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
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="amount" className="mb-2">Amount:</label>
          <input
            id="amount"
            name="amount"
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
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
      </form>
      {response && (
        <div className="mt-5">
          <p className={`text-${response.status === 'success' ? 'green' : 'red'}-500`}>
            {response.message}
          </p>
        </div>
      )}
    </div>
  );
};

export default Payme;