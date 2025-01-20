import React, { useState , useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import ramfinImg from '../../../assets/ramfin.png'
import toast from 'react-hot-toast';

const RamfinForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    phone: '',
    amount: '',
    email: '',
    employeeType: '',
    dob: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState({
    status: null,
    message: ''
  });

  useEffect(()=>{
    const filldata = async () => {
    const token = Cookies.get('userToken')
      const response = await axios.get('https://credmantra.com/api/v1/auth/verify-user',{
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type":"application/json"
        }
      })
      console.log(response.data.data.user)
      const data = response.data.data.user
      setFormData(data)
    }
    filldata()
  },[])


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'dob') {
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age < 18) {
       toast.error('You are not eligible because you are not 18 years old yet.');
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
        name: '',
        lastName: '',
        phone: '',
        amount: '',
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
  return (
  <>
    <div className='flex flex-col sm:flex-row items-center justify-around'>
    <h1 className='text-center text-2xl font-bold'>Connect with Ramfin</h1>
    <img src={ramfinImg} alt="" className='sm:w-[14%] sm:h-9 h-10 mt-4 sm:mt-0 :w-[30%]' />
    </div>
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <div className="grid gap-2 ">
        <div>
          <label className="block mb-1">First Name</label>
          <input
            type="text"
            name="name"
            placeholder='first name'
            value={formData.name}
            onChange={handleChange}
            className="w-[97%] p-2 border rounded"
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
            className="w-[97%] p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            maxLength={10}
          pattern="\d*"
            placeholder='phone'
            value={formData.phone}
            onChange={handleChange}
            className="w-[97%] p-2 border rounded"
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
            className="w-[97%] p-2 border rounded"
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
            className="w-[97%] p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Employee Type</label>
          <select
            name="employeeType"
            value={formData.employeeType}
            onChange={handleChange}
            className="w-[97%] p-2 border rounded"
            required
          >
            <option value="Salered">Select Employment Type</option>
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
            className="w-[97%] p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-[97%] bg-blue-500 text-white py-2 px-4 rounded mt-5
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