import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import PaymeImage from "../../../assets/payme copy.svg";

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


  useEffect(() => {
    const fillData = async () => {
      const token = Cookies.get('userToken');
      if (token) {
        try {
          const response = await axios.get('https://credmantra.com/api/v1/auth/verify-user', {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          const data = response.data.data.user;
          setFormData(data);
          console.log(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fillData();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    console.log(formData);
    try {
      const res = await axios.post('https://credmantra.com/api/payme', formData);
      setResponse(res.data); 
      setLoading(false)
    } catch (error) {
      console.error('API Error:', error); 
      setResponse({ status: 'error', message: 'An error occurred during submission.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-5 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between w-[90%] items-center mb-8">
        <h1 className="text-2xl font-semibold mb-5">Connect with PayMe</h1>
        <img src={PaymeImage} alt="PayMe" className="h-12" />
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="w-[94%]" style={{ justifySelf: "center" }}>
          <div className="flex flex-col mb-4">
            <label htmlFor="name" className="mb-2">Name:</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-[100%]"
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
              className="p-2 border border-gray-300 rounded w-[100%]"
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
              className="p-2 border border-gray-300 rounded w-[100%]"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded w-[100%]"
            disabled={loading} 
          >
            {loading ? 'Submitting...' : 'Submit'} 
          </button>
        </div>
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
