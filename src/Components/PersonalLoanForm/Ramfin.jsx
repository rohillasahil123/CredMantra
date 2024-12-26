import React, { useState } from 'react';
import axios from 'axios';
import ramfinImg from '../../assets/ramfin.png'

const RamfinForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    loanAmount: '',
    email: '',
    employeeType: '',
    dob: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState({
    status: null,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setApiResponse({ status: null, message: '' });
    try {
      const response = await axios.post('http://credmantra.com/api/v1/partner-api/ram/create', { formData });
      console.log(response.data) 
      setApiResponse({
        status: 'success',
        message: 'Application submitted successfully!'
      });
    
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        loanAmount: '',
        email: '',
        employeeType: '',
        dob: ''
      });
     
    } catch (error) {
      setApiResponse({
        status: 'error',
        message: error.response?.data?.message || 'Something went wrong. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (<>


    <div className='flex flex-row items-center justify-between'>
    <h1 className='text-center text-2xl font-bold'>Connect with Ramfin</h1>
    <img src={ramfinImg} alt="" className='w-[14%] h-9' />
    </div>
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">

      <div className="grid gap-2 ">
        <div>
          <label className="block mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder='first name'
            value={formData.firstName}
            onChange={handleChange}
            className="w-[80%] p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder='last name'
            value={formData.lastName}
            onChange={handleChange}
            className="w-[80%] p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            placeholder='phone'
            value={formData.phone}
            onChange={handleChange}
            className="w-[80%] p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Loan Amount</label>
          <input
            type="number"
            name="loanAmount"
            placeholder='loan amount'
            value={formData.loanAmount}
            onChange={handleChange}
            className="w-[80%] p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder='email'
            value={formData.email}
            onChange={handleChange}
            className="w-[80%] p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Employee Type</label>
          <select
            name="employeeType"
            value={formData.employeeType}
            onChange={handleChange}
            className="w-[80%] p-2 border rounded"
            required
          >
            <option value="Salered">Salaried</option>
            <option value="SelfEmployed">Self Employed</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Date of Birth</label>
          <input
            type="date"
            name="dob"
            placeholder='dd/mm/yyyy'
            value={formData.dob}
            onChange={handleChange}
            className="w-[80%] p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-[80%] bg-blue-500 text-white py-2 px-4 rounded 
            ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
    {apiResponse.message && (
        <div className={`p-4 mb-4 text-center rounded ${
          apiResponse.status === 'success' 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {apiResponse.message}
        </div>
      )}
    </>
  );
};

export default RamfinForm;