import React, { useState, useEffect } from 'react';
import axios from 'axios';

import abhi from "../../../../assets/abhi.webp";
import { useNavigate } from 'react-router-dom';

const AbhiloansForm = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpShow, setOtpShow] = useState(false);
  const [otpError, setOtpError] = useState(false);

  // Form States
  const [otpForm, setOtpForm] = useState({
    mobileNumber: '',
    panNumber: '',
    otp: ''
  });

  const [formData, setFormData] = useState({
    phoneNumber: '',
    customerName: '',
    emailAddress: '',
    panNumber: '',
    dateOfBirth: '',
    sendEmailToCustomer: false
  });

  const [consent, setConsent] = useState(false);

  // Get user data on component mount
  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      getUserData(token);
    } else {
      setStage(1);
    }
  }, []);

  // Get user data from API
  const getUserData = async (token) => {
    try {
      const response = await axios.get('https://credmantra.com/api/v1/auth/verify-user', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const userData = response.data.data.user;
      
      // Update both forms with user data
      setOtpForm({
        ...otpForm,
        mobileNumber: userData.phone,
        panNumber: userData.pan
      });

      setFormData({
        phoneNumber: userData.phone,
        customerName: userData.name,
        emailAddress: userData.email,
        panNumber: userData.pan,
        dateOfBirth: userData.dob
      });
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  // Handle OTP form input changes
  const handleOtpChange = (e) => {
    const { name, value } = e.target;
    setOtpForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle main form input changes
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Submit OTP request
  const submitOTP1 = async (e) => {
    e.preventDefault();
    setOtpLoading(true);

    try {
      const response = await axios.post(
        'https://credmantra.com/api/v1/partner-api/abhiloans/eligibility',
        otpForm
      );
      console.log(response.data.data.status.message , "try");

      if (response.data.data.success === true) {
        setOtpShow(true);
      }
    } catch (error) {
      console.error('abhiloans/eligibility Error:', error);
    } finally {
      setOtpLoading(false);
    }
  };

  // Verify OTP
  const submitOTP2 = async (e) => {
    e.preventDefault();
    setOtpLoading(true);

    try {
      const response = await axios.post(
        'https://credmantra.com/api/v1/partner-api/abhiloans/verify',
        otpForm
      );
      console.log(response.data.data.status.message , "catch");
      if (response.data.data.success === true) {
        setStage(2);
      } else {
        setOtpError(true);
      }
    } catch (error) {
      console.error('abhiloans/verify Error:', error);
    } finally {
      setOtpLoading(false);
    }
  };

  // Submit main form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'https://credmantra.com/api/v1/partner-api/abhiloans/lead',
        formData
      );
      console.log(response.data.data.status.message , "uio");

      if (response.data.data.status.message === 'Lead added Successfully!!!') {
        window.location.href = response.data.data.status.loginUrl;
      }
    } catch (error) {
      console.error('abhiloans/lead Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
    

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold font-['Segoe UI']">
            Connect with Abhiloans
          </h1>
          <img src={abhi} alt="Abhiloans" className="w-36" />
        </div>

        {stage === 1 && (
          <div className="max-w-md mx-auto items-center">
            <form onSubmit={otpShow ? submitOTP2 : submitOTP1} className="space-y-6 ">
              <div className='' >
                <label className="block text-sm font-medium text-gray-700">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="mobileNumber"
                  value={otpForm.mobileNumber}
                  onChange={handleOtpChange}
                  placeholder=' mobile number'
                  disabled={otpShow}
                  maxLength={10}
                  pattern="^[0-9]{10}$"
                  className="mt-1 block w-[90%] uppercase rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-8 disabled:bg-gray-100" 
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  PAN Number
                </label>
                <input
                  type="text"
                  name="panNumber"
                  value={otpForm.panNumber}
                  onChange={handleOtpChange}
                  placeholder='pan number'
                  disabled={otpShow}
                  maxLength={10}
                  className="mt-1 block h-8  w-[90%] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 uppercase"
                  required
                />
              </div>

              {otpShow && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    OTP
                  </label>
                  <input
                    type="text"
                    name="otp"
                    value={otpForm.otp}
                    onChange={handleOtpChange}
                    maxLength={6}
                    pattern="^[0-9]{6}$"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                  {otpError && (
                    <p className="mt-2 text-sm text-red-600">
                      Incorrect OTP
                    </p>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={otpLoading}
                className="w-[90%] flex justify-center py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
              >
                {otpLoading ? 'Processing...' : otpShow ? 'Verify OTP' : 'GET OTP'}
              </button>
            </form>
          </div>
        )}

        {stage === 2 && (
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleFormChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleFormChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleFormChange}
                    maxLength={10}
                    pattern="^[0-9]{10}$"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleFormChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    PAN Number
                  </label>
                  <input
                    type="text"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleFormChange}
                    maxLength={10}
                    pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 uppercase"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="consent" className="ml-2 block text-sm text-gray-900">
                  I agree to the Terms and Conditions
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || !consent}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
              >
                {loading ? 'Processing...' : 'Submit'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AbhiloansForm;