import React, { useState, useEffect } from 'react';
import axios from 'axios';
import faircentImg from "../../assets/faircent.webp"

const FaircentComponent = () => {
  // State Management
  const [stage, setStage] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [deDupeLoading, setDeDupeLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [uploadButton, setUploadButton] = useState('Submit');
  const [userIp, setUserIp] = useState('');
  const [files, setFiles] = useState({
    aadhar: null,
    pan: null,
    bank: null,
    itr: null,
    udyam: null
  });


  // Form Data
  const [formData, setFormData] = useState({
    consent: 'Y',
    tnc_link: 'https://www.faircent.in/terms-conditions',
    sign_ip: '122.161.8.133',
    sign_time: 1234567890,
    loan_purpose: 1364,
    fname: '',
    lname: '',
    dob: '',
    gender: '',
    pan: '',
    mobile: '',
    address: '',
    locality: '',
    pin: '',
    city: '',
    state: '',
    mail: '',
    monthly_income: '',
    employment_status: '',
    loan_amount: ''
  });

  const [deDupeFormData, setDeDupeFormData] = useState({
    mobile: '',
    email: '',
    pan: ''
  });

  const [response, setResponse] = useState({});

  // Constants
  const steps = [
    { label: 'Personal Details' },
    { label: 'Address' },
    { label: 'Employment Details' },
    { label: 'Loan Details' }
  ];

  const genderOptions = ['Male', 'Female'];
  const employmentOptions = ['Salaried', 'Self Employed'];
  const stateOptions = [
    'ANDAMAN & NICOBAR ISLANDS',
    'ANDHRA PRADESH',
    'ARUNACHAL PRADESH',
    'ASSAM',
    'BIHAR',
    'CHANDIGARH',
    'CHATTISGARH',
    'DADRA & NAGAR HAVELI',
    'DAMAN & DIU',
    'DELHI',
    'GOA',
    'GUJARAT',
    'HARYANA',
    'HIMACHAL PRADESH',
    'JAMMU AND KASHMIR',
    'JHARKHAND',
    'KARNATAKA',
    'KERALA',
    'LAKSHADWEEP',
    'MADHYA PRADESH',
    'MAHARASHTRA',
    'MANIPUR',
    'MEGHALAYA',
    'MEGHALAYA',
    'MIZORAM',
    'NAGALAND',
    'ODISHA',
    'PUNJAB',
    'RAJASTHAN',
    'SIKKIM',
    'TAMIL NADU',
    'TELANGANA',
    'TRIPURA',
    'UTTAR PRADESH',
    'UTTARAKHAND',
    'WEST BENGAL',
  ];

  // Effects
  useEffect(() => {
    const getUserIp = async () => {
      try {
        const res = await axios.get('https://ifconfig.me/ip');
        setUserIp(res.data);
      } catch (error) {
        console.error('Error fetching IP:', error);
      }
    };
    getUserIp();
  }, []);

  // Form Handlers
  const handleDeDupeSubmit = async (e) => {
    e.preventDefault();
    setDeDupeLoading(true);
    try {
      const res = await axios.post('https://credmantra.com/api/v1/partner-api/faircent/dedupe', deDupeFormData);
      if (res?.data?.result?.message === 'No Duplicate Record Found.') {
        setStage(2);
      } else {
        setStage(4);
      }
    } catch (error) {
      console.error('DeDupe Error:', error);
    } finally {
      setDeDupeLoading(false);
    }
  };

  const handleMainFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const submitData = {
        ...formData,
        sign_ip: userIp || '127.0.0.1',
        sign_time: currentTimestamp
      };

      const res = await axios.post('https://credmantra.com/api/v1/partner-api/faircent/register', submitData);
      setResponse(res.data);

      if (res.data?.result?.status === 'Approved') {
        setStage(3);
      } else {
        setStage(6);
      }
    } catch (error) {
      console.error('Form Submit Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // File Upload Handlers
  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    setFiles(prev => ({ ...prev, [type]: file }));
  };

  const uploadFile = async (file, type) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('docImage', file, file.name);
    formData.append('loan_id', response.result.loan_id);
    formData.append('token', response.result.token);
    formData.append('type', type);

    try {
      const res = await axios.post('https://credmantra.com/api/v1/partner-api/faircent/upload', formData);
      console.log(`${type} upload response:`, res);
      return true;
    } catch (error) {
      console.error(`${type} upload error:`, error);
      return false;
    }
  };

  const handleDocumentUpload = async () => {
    setUploadButton('Uploading 1...');
    
    // Upload sequence
    const uploadSequence = [
      { file: files.aadhar, type: 'AADHAAR' },
      { file: files.pan, type: 'PANCARD' },
      { file: files.bank, type: 'BANK_STATEMENT' },
    ];

    if (formData.employment_status === 'Self Employed') {
      uploadSequence.push(
        { file: files.itr, type: 'ITR1' },
        { file: files.udyam, type: 'SELFVERIFICATION' }
      );
    }

    for (let i = 0; i < uploadSequence.length; i++) {
      setUploadButton(`Uploading ${i + 1}...`);
      const success = await uploadFile(uploadSequence[i].file, uploadSequence[i].type);
      if (!success) {
        // Handle error
        return;
      }
    }

    setUploadButton('Finished');
    setStage(5);
  };

  // Navigation Handlers
  const handleNext = () => setActiveIndex(prev => prev + 1);
  const handlePrev = () => setActiveIndex(prev => prev - 1);

  return (
    <div className="min-h-screen">
      <div className='w-full px-16 flex items-center justify-between'>
        <h1 className="font-['Segoe UI'] text-2xl">Connect with Faircent</h1>
        <div className="flex justify-center items-center">
          <img className="w-36" src={faircentImg} alt="Faircent" />
        </div>
      </div>

      {stage === 1 && (
        <div className="flex flex-col items-stretch mt-5">
          <div className="flex flex-col items-center w-full">
            <div className='w-[70%]'>
              <form onSubmit={handleDeDupeSubmit} className="flex flex-col gap-4">

                <div className="flex flex-col">
                  <label htmlFor="mobile">Mobile Number:</label>
                  <input
                    id="mobile"
                    type="text"
                    className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength={10}
                    pattern="^[0-9]{10}$"
                    placeholder='enter mobile number'
                    required
                    value={deDupeFormData.mobile}
                    onChange={(e) => setDeDupeFormData(prev => ({...prev, mobile: e.target.value}))}
                  />
                </div>
  
                {/* Email Input */}
                <div className="flex flex-col">
                  <label htmlFor="email">Email:</label>
                  <input
                    id="email"
                    type="email"
                    placeholder='enter email'
                    className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    value={deDupeFormData.email}
                    onChange={(e) => setDeDupeFormData(prev => ({...prev, email: e.target.value}))}
                  />
                </div>
  
                {/* PAN Input */}
                <div className="flex flex-col">
                  <label htmlFor="pan">PAN:</label>
                  <input
                    id="pan"
                    type="text"
                    placeholder='enter PanNumber'
                    className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    maxLength={10}
                    pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                    value={deDupeFormData.pan}
                    onChange={(e) => setDeDupeFormData(prev => ({...prev, pan: e.target.value.toUpperCase()}))}
                  />
                </div>
  
                <button
                  type="submit"
                  disabled={deDupeLoading}
                  className="bg-blue-500 text-white px-5 py-3 rounded disabled:opacity-50 hover:bg-blue-600 transition-colors"
                >
                  {deDupeLoading ? 'Processing...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
  
      {/* Stage 2: Main Form */}
      {stage === 2 && (
        <div className="flex flex-col items-stretch mt-5">
          <div className="flex flex-col items-center w-full">
            <div className='w-[90%]'>
              {/* Stepper */}
              <div className="mb-8">
                <div className="flex justify-between">
                  {steps.map((step, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center
                        ${index <= activeIndex ? 'bg-blue-500 text-white' : 'bg-gray-200'}
                      `}>
                        {index + 1}
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`w-full h-1 ${index < activeIndex ? 'bg-blue-500' : 'bg-gray-200'}`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
  
              {/* Multi-step Form */}
              <form onSubmit={handleMainFormSubmit} className="space-y-6">
                {/* Step 1: Personal Details */}
                {activeIndex === 0 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label>First Name:</label>
                        <input
                          type="text"
                          placeholder='enter first name'  
                          className="p-2 border rounded"
                          value={formData.fname}
                          onChange={(e) => setFormData({...formData, fname: e.target.value})}
                          required
                        />
                      </div>
                      <div className="flex flex-col">
                        <label>Last Name:</label>
                        <input
                          type="text"
                          placeholder='enter last name'
                          className="p-2 border rounded"
                          value={formData.lname}
                          onChange={(e) => setFormData({...formData, lname: e.target.value})}
                          required
                        />
                      </div>
                    </div>
  
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label>Date of Birth:</label>
                        <input
                          type="date"
                          placeholder='enter dob'
                          className="p-2 border rounded"
                          value={formData.dob}
                          onChange={(e) => setFormData({...formData, dob: e.target.value})}
                          required
                        />
                      </div>
                      <div className="flex flex-col">
                        <label>Gender:</label>
                        <select
                          className="p-2 border rounded"
                          value={formData.gender}
                          onChange={(e) => setFormData({...formData, gender: e.target.value})}
                          required
                        >
                          <option value="">Select Gender</option>
                          {genderOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}
  
                {/* Step 2: Address Details */}
                {activeIndex === 1 && (
                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <label>Address:</label>
                      <input
                        type="text"
                        placeholder='enter Address'
                        className="p-2 border rounded"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        required
                      />
                    </div>
  
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label>City:</label>
                        <input
                          type="text"
                          placeholder='enter city'
                          className="p-2 border rounded"
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                          required
                        />
                      </div>
                      <div className="flex flex-col">
                        <label>State:</label>
                        <select
                          className="p-2 border rounded"
                          value={formData.state}
                          onChange={(e) => setFormData({...formData, state: e.target.value})}
                          required
                        >
                          <option value="">Select State</option>
                          {stateOptions.map(state => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}
  
                {/* Step 3: Employment Details */}
                {activeIndex === 2 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label>Monthly Income:</label>
                        <input
                          type="number"
                          placeholder='enter monthly income'
                          className="p-2 border rounded"
                          value={formData.monthly_income}
                          onChange={(e) => setFormData({...formData, monthly_income: e.target.value})}
                          required
                        />
                      </div>
                      <div className="flex flex-col">
                        <label>Employment Status:</label>
                        <select
                          className="p-2 border rounded"
                          value={formData.employment_status}
                          onChange={(e) => setFormData({...formData, employment_status: e.target.value})}
                          required
                        >
                          <option value="">Select Status</option>
                          {employmentOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}
  
                {/* Step 4: Loan Details */}
                {activeIndex === 3 && (
                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <label>Loan Amount:</label>
                      <input
                        type="number"
                        placeholder='enter loan amount'
                        className="p-2 border rounded w-1/2"
                        value={formData.loan_amount}
                        onChange={(e) => setFormData({...formData, loan_amount: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => setChecked(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <label>I agree to the Terms and Conditions</label>
                    </div>
                  </div>
                )}
  
                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={activeIndex === 0}
                    className="bg-blue-500 text-white px-5 py-2 rounded disabled:opacity-50"
                  >
                    Previous
                  </button>
                  {activeIndex === steps.length - 1 ? (
                    <button
                      type="submit"
                      disabled={loading || !checked}
                      className="bg-blue-500 text-white px-5 py-2 rounded disabled:opacity-50"
                    >
                      {loading ? 'Submitting...' : 'Submit'}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-blue-500 text-white px-5 py-2 rounded"
                    >
                      Next
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
  
      {/* Stage 3: Document Upload */}
      {stage === 3 && (
        <div className="flex flex-col items-center mt-8">
          <h1 className="text-2xl mb-6">Upload Documents</h1>
          <div className='flex flex-col sm:flex-row gap-8 w-[40%'>
            {/* Aadhar Upload */}
            <div className="relative flex-1 aspect-square bg-blue-100 rounded-2xl flex flex-col items-center justify-center group">
              <img src="assets/Aadhar-Black.svg" className="w-[70%] group-hover:hidden" alt="Aadhar" />
              <p className="absolute bottom-2">Aadhar Card</p>
              <div className="hidden group-hover:flex flex-col items-center justify-center absolute inset-0">
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, 'aadhar')}
                  accept="image/*"
                  className="hidden"
                  id="aadhar"
                />
                <label htmlFor="aadhar">
                  <img src="assets/plus.svg" className="w-20 cursor-pointer" alt="Upload" />
                </label>
              </div>
            </div>
  
            {/* Similar blocks for PAN, Bank Statement, ITR, and Udyam */}
            {/* ... */}
          </div>
          
          <button
            onClick={handleDocumentUpload}
            className="mt-6 bg-blue-500 text-white px-5 py-3 rounded"
          >
            {uploadButton}
          </button>
        </div>
      )}
  
      {/* Stage 4: Already Registered */}
      {stage === 4 && (
        <div className="flex flex-col items-center mt-8">
          <h1 className="text-2xl text-center mb-6">
            You are already a registered user of Faircent.
          </h1>
          <img 
            src="assets/fibe_rej.svg" 
            alt="Already Registered" 
            className='w-[60%]'
          />
        </div>
      )}
  
      {/* Stage 5: Success */}
      {stage === 5 && (
        <div className="flex flex-col items-center mt-8">
          <h1 className="text-2xl text-center mb-4">
            Congratulations! Submission successful.
          </h1>
          <h1 className="text-xl mb-6">Application Complete</h1>
          <img 
            src="assets/fibe_check.svg" 
            alt="Success" 
            className='w-[60%]'
          />
        </div>
      )}
  
      {/* Stage 6: Rejection */}
      {stage === 6 && (
        <div className="flex flex-col items-center mt-8">
          <h1 className="text-2xl text-center mb-6">
            Your profile does not meet the eligibility criteria of Faircent.
          </h1>
          <img 
            src="assets/fibe_rej.svg" 
            alt="Rejected" 
            className= 'w-[60%]'
          />
        </div>
      )}
  
    </div>
  );
};

export default FaircentComponent;