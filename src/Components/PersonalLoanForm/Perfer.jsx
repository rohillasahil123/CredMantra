import React, { useState } from 'react';
import axios from 'axios';

const PrefrLoanForm = () => {
  const [stage, setStage] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [deDupeLoading, setDeDupeLoading] = useState(false);

  // Form States
  const [deDupeForm, setDeDupeForm] = useState({
    mobileNumber: '',
    personalEmailId: '',
    panNumber: ''
  });

  const [mainForm, setMainForm] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    personalEmailId: '',
    gender: '',
    maritalStatus: '',
    currentAddress: '',
    currentAddressPincode: '',
    city: '',
    state: '',
    employmentType: '',
    companyName: '',
    officeAddress: '',
    officeCity: '',
    officePincode: '',
    netMonthlyIncome: '',
    panNumber: '',
    desiredLoanAmount: '',
    consent: false
  });

  // Options for dropdowns
  const genderOptions = ['Male', 'Female'];
  const maritalOptions = ['married', 'single'];
  const professionOptions = ['salaried', 'selfEmployed'];
  const stateOptions = [
    'ANDHRA PRADESH', 'DELHI', 'GUJARAT', 'KARNATAKA',
    'KERALA', 'MAHARASHTRA', 'TAMIL NADU', 'TELANGANA'
  ];

  const steps = [
    'Personal Details',
    'Address',
    'Employment Details',
    'Loan Details'
  ];

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(prevStep => prevStep + 1);
    }
  };


  const handlePrev = () => {
    setActiveStep(prevStep => prevStep - 1);
  };





  const handleDeDupeSubmit = async (e) => {
    e.preventDefault();
    setDeDupeLoading(true);

    try {
      const response = await axios.post(
        'https://credmantra.com/api/v1/partner-api/prefr/dedupe',
        deDupeForm
      );
      console.log(response.data.duplicateFound)
      if (!response.data.duplicateFound) {
        const startResponse = await axios.post(
          'https://credmantra.com/api/v1/partner-api/prefr/start',
          { mobileNo: deDupeForm.mobileNumber }
        );
        
        if (startResponse.data.status === 200) {
          setStage(2);
        }
      } else {
        setStage(4);
      }
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setDeDupeLoading(false);
    }
  };

  const handleMainFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'https://credmantra.com/api/v1/partner-api/prefr/details',
        mainForm
      );

      if (response.data.status === 'success') {
        const webviewResponse = await axios.post(
          'https://credmantra.com/api/v1/partner-api/prefr/webview',
          { loanId: response.data.loanId }
        );

        if (webviewResponse.data.status === 'success') {
          window.location.href = webviewResponse.data.data.webviewUrl;
        } else {
          setStage(4);
        }
      }
    } catch (error) {
      console.error('API Error:', error);
      setStage(4);
    } finally {
      setLoading(false);
    }
  };
return(
    <div className="max-w-4xl mx-auto">
  
      <form onSubmit={handleMainFormSubmit} className="bg-white p-6 rounded-lg shadow">
  
        {activeStep === 0 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  required
                  placeholder='Enter first name'
                  value={mainForm.firstName}
                  onChange={(e) => setMainForm(prev => ({
                    ...prev,
                    firstName: e.target.value
                  }))}
                  className="mt-1 block w-full h-9 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  required
                  placeholder='Enter last name'
                  value={mainForm.lastName}
                  onChange={(e) => setMainForm(prev => ({
                    ...prev,
                    lastName: e.target.value
                  }))}
                  className="mt-1 block w-full h-9 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  required
                  placeholder=' date of birth'
                  value={mainForm.dob}
                  onChange={(e) => setMainForm(prev => ({
                    ...prev,
                    dob: e.target.value
                  }))}
                  className="mt-1 block w-full h-9 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  required
                  value={mainForm.gender}
                  onChange={(e) => setMainForm(prev => ({
                    ...prev,
                    gender: e.target.value
                  }))}
                  className="mt-1 block w-full h-9 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select Gender</option>
                  {genderOptions.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Marital Status
                </label>
                <select
                  required
                  value={mainForm.maritalStatus}
                  onChange={(e) => setMainForm(prev => ({
                    ...prev,
                    maritalStatus: e.target.value
                  }))}
                  className="mt-1 block w-full h-9 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select Marital Status</option>
                  {maritalOptions.map(option => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email ID
                </label>
                <input
                  type="email"
                  required
                  placeholder='Enter email id'
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  value={mainForm.personalEmailId}
                  onChange={(e) => setMainForm(prev => ({
                    ...prev,
                    personalEmailId: e.target.value
                  }))}
                  className="mt-1 block w-full h-9 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  pattern="^[0-9]{10}$"
                  placeholder='mobile number'
                  value={mainForm.mobileNumber}
                  onChange={(e) => setMainForm(prev => ({
                    ...prev,
                    mobileNumber: e.target.value
                  }))}
                  className="mt-1 block w-full h-9 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}
  
       
        {activeStep === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Current Address
              </label>
              <textarea
                required
                placeholder='current address'
                value={mainForm.currentAddress}
                onChange={(e) => setMainForm(prev => ({
                  ...prev,
                  currentAddress: e.target.value
                }))}
                rows={3}
                className="mt-1 block w-full h-9 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pincode
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  pattern="^[0-9]{6}$"
                  placeholder='pincode'
                  value={mainForm.currentAddressPincode}
                  onChange={(e) => setMainForm(prev => ({
                    ...prev,
                    currentAddressPincode: e.target.value
                  }))}
                  className="mt-1 block w-full h-9 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  required
                  placeholder='city'
                  value={mainForm.city}
                  onChange={(e) => setMainForm(prev => ({
                    ...prev,
                    city: e.target.value
                  }))}
                  className="mt-1 block w-full h-9 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <select
                  required
                  value={mainForm.state}
                  onChange={(e) => setMainForm(prev => ({
                    ...prev,
                    state: e.target.value
                  }))}
                  className="mt-1 block w-full h-9 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select State</option>
                  {stateOptions.map(state => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
  
   
        {activeStep === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Employment Type
                </label>
                <select
                  required
                  value={mainForm.employmentType}
                  onChange={(e) => setMainForm(prev => ({
                    ...prev,
                    employmentType: e.target.value
                  }))}
                  className="mt-1 block w-full h-9 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select Employment Type</option>
                  {professionOptions.map(option => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  placeholder='company name'
                  value={mainForm.companyName}
                  onChange={(e) => setMainForm(prev => ({
                    ...prev,
                    companyName: e.target.value
                  }))}
                  className="mt-1 block w-full h-9 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Office Address
                </label>
                <textarea
                  required
                  value={mainForm.officeAddress}
                  placeholder='office address'
                  onChange={(e) => setMainForm(prev => ({
                    ...prev,
                    officeAddress: e.target.value
                  }))}
                  rows={3}
                  className="mt-1 block w-full h-9 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Office City
                </label>
                <input
                  type="text"
                  required
                  placeholder='office city'
                  value={mainForm.officeCity}
                  onChange={(e) => setMainForm(prev => ({
                    ...prev,
                    officeCity: e.target.value
                  }))}
                  className="mt-1 block w-full h-9 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Office Pincode
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  pattern="^[0-9]{6}$"
                  placeholder='office pincode'
                  value={mainForm.officePincode}
                  onChange={(e) => setMainForm(prev => ({
                    ...prev,
                    officePincode: e.target.value
                  }))}
                  className="mt-1 block w-full h-9 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Net Monthly Income
                </label>
                <input
                  type="number"
                  required
                  placeholder='monthly income'
                  value={mainForm.netMonthlyIncome}
                  onChange={(e) => setMainForm(prev => ({
                    ...prev,
                    netMonthlyIncome: e.target.value
                  }))}
                  className="mt-1 block w-full h-9 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}
  
        {/* Loan Details Step */}
        {activeStep === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                PAN Number
              </label>
              <input
                type="text"
                required
                placeholder='pan number'
                maxLength={10}
                pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                value={mainForm.panNumber}
                onChange={(e) => setMainForm(prev => ({
                  ...prev,
                  panNumber: e.target.value.toUpperCase()
                }))}
                className="mt-1 block w-full h-9 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Desired Loan Amount
              </label>
              <input
                type="number"
                required
                placeholder='loan amount'
                value={mainForm.desiredLoanAmount}
                onChange={(e) => setMainForm(prev => ({
                  ...prev,
                  desiredLoanAmount: e.target.value
                }))}
                className="mt-1 block w-full h-9 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
  
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  checked={mainForm.consent}
                  onChange={(e) => setMainForm(prev => ({
                    ...prev,
                    consent: e.target.checked
                  }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="font-medium text-gray-700">
                  I agree to the Terms and Conditions and authorize Credit Vidya Private Limited to access my credit information.
                </label>
              </div>
            </div>
          </div>
        )}
  
       
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handlePrev}
            disabled={activeStep === 0}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
  
          {activeStep === steps.length - 1 ? (
            <button
              type="submit"
              disabled={loading || !mainForm.consent}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Submit'}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
} 

export default PrefrLoanForm 