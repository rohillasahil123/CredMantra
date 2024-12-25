import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Steps } from 'primereact/steps';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import FaircentImg from "../../assets/Lendingkart_Group_Latest_Logo 1 (1).svg"

const LendingKart = () => {
  const [stage, setStage] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [eligibleLoading, setEligibleLoading] = useState(false);
  const [uploadButton, setUploadButton] = useState('Upload');

  // File refs
  const panFileRef = useRef(null);
  const gstFileRef = useRef(null);
  const bankFileRef = useRef(null);

  // Form Data States
  const [eligibleFormData, setEligibleFormData] = useState({
    mobile: '',
    email: ''
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    personalDob: '',
    personalPAN: '',
    gender: '',
    companyEmail: '',
    consent: false,
    loanAmount: 0,
    personalAddress: {
      addressLine1: '',
      addressLine2: '',
      landmark: '',
      pincode: '',
      city: '',
      state: ''
    },
    otherFields: {
      employmentType: '',
      monthlySalary: 0,
      tenure: 0,
      itrFiled: true,
      itrRange: '',
      companyName: ''
    }
  });

  // Options for dropdowns
  const steps = [
    { label: 'Personal Details' },
    { label: 'Address' },
    { label: 'Employment Details' },
    { label: 'Loan Details' }
  ];

  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' }
  ];

  const employmentTypeOptions = [
    { label: 'Full Time', value: 'FULL_TIME' },
    { label: 'Self Employed', value: 'SELF_EMPLOYED' },
    { label: 'Part Time', value: 'PART_TIME' }
  ];

  const stateOptions = [
    'DELHI', 'MAHARASHTRA', 'KARNATAKA', 'TAMIL NADU','KERALA','ANDHRA PRADESH','UTTAR PRADESH','RAJASTHAN','MADHYA PRADESH','UTTARAKHAND','BIHAR','CHHATTISGARH','GOA','GUJARAT','HARYANA','JHARKHAND','KASHMIR','KARNATAKA','KERALA','MADHYA PRADESH','MAHARASHTRA','MANIPUR','MEGHALAYA','MIZORAM','NAGALAND','ODISHA','PUNJAB','RAJASTHAN','SIKKIM','TAMIL NADU','TELANGANA','TRIPURA','UTTAR PRADESH','WEST BENGAL','ANDAMAN AND NICOBAR ISLANDS','CHANDIGARH','DADRA AND NAGAR HAVELI','DAMAN AND DIU','DELHI','LAKSHADWEEP','PONDICHERRY'
  ].map(state => ({ label: state, value: state }));

  const itrRangeOptions = [
    { label: 'Less than 3 Lacs', value: 'LESS_THAN_THREE_LACS' },
    { label: '3-5 Lacs', value: 'THREE_TO_FIVE_LACS' },
    { label: '5-10 Lacs', value: 'FIVE_TO_TEN_LACS' },
    { label: '10-20 Lacs', value: 'TEN_TO_TWENTY_LACS' },
    { label: '20+ Lacs', value: 'TWENTY_LACS_PLUS' }
  ];

  // Form Handlers
  const handleEligibilitySubmit = async (e) => {
    e.preventDefault();
    setEligibleLoading(true);

    try {
      const response = await axios.post(
        'https://credmantra.com/api/v1/partner-api/lendingkart/lead-exists-status',
        eligibleFormData
      );
      console.log(response)
      setStage(response.data.leadExists ? 3 : 2);
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setEligibleLoading(false);
    }
  };

  const handleMainSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        'https://credmantra.com/api/v1/partner-api/lendingkart/p/create-application',
        formData
      );
      console.log(response.data)
      if (response.data.message === 'ELIGIBLE') {
        setStage(5);
      } else if (response.data.data?.message === 'INELIGIBLE') {
        setStage(4);
      }
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file, type) => {
    if (!file) return;
    setUploadButton(`Uploading ${type}...`);

    const formData = new FormData();
    formData.append('docImage', file);
    formData.append('documentType', type);

    try {
      await axios.post(
        'https://credmantra.com/api/v1/partner-api/lendingkart/documents',
        formData
      );
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Connect with LendingKart</h1>
          <img src={FaircentImg} alt="LendingKart Logo" className="h-8" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {stage === 1 && (
          <div className="max-w-md mx-auto">
            <form onSubmit={handleEligibilitySubmit} className="space-y-6 bg-white shadow rounded-lg p-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                <InputText
                  className="mt-1 block w-full rounded-md h-8  border"
                  value={eligibleFormData.mobile}
                  onChange={(e) => setEligibleFormData(prev => ({
                    ...prev,
                    mobile: e.target.value
                  }))}
                  maxLength={10}
                  pattern="^[0-9]{10}$"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <InputText
                  className="mt-1 block w-full rounded-md h-8 border"
                  value={eligibleFormData.email}
                  onChange={(e) => setEligibleFormData(prev => ({
                    ...prev,
                    email: e.target.value
                  }))}
                  type="email"
                  required
                />
              </div>

              <Button
                type="submit"
                loading={eligibleLoading}
                className="w-full bg-blue-500 h-8  rounded-md hover:bg-blue-600 text-white"
                label="Check Eligibility"
              />
            </form>
          </div>
        )}

        {stage === 2 && (
          <div className="bg-white shadow rounded-lg p-6">
            <Steps model={steps} activeIndex={activeIndex} className="mb-8" />

            <form onSubmit={handleMainSubmit} className="space-y-8">
              {/* Personal Details */}
              {activeIndex === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <InputText
                      className="mt-1 block w-[70%] rounded-md h-8 border"
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        firstName: e.target.value
                      }))}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <InputText
                      className="mt-1 block w-[70%] rounded-md h-8 border"
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        lastName: e.target.value
                      }))}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <input
                      type="date"
                      value={formData.personalDob}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        personalDob: e.value
                      }))}
                      className=" w-[70%] rounded-md h-8 border"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <Dropdown
                      value={formData.gender}
                      options={genderOptions}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        gender: e.value
                      }))}
                      className="w-[70%] rounded-md h-8 border"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Address Details */}
              {activeIndex === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address Line 1</label>
                    <InputText
                      className="mt-1 block w-[70%] rounded-md h-8 border"
                      value={formData.personalAddress.addressLine1}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        personalAddress: {
                          ...prev.personalAddress,
                          addressLine1: e.target.value
                        }
                      }))}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address Line 2</label>
                    <InputText
                      className="mt-1 block w-[70%] rounded-md h-8 border"
                      value={formData.personalAddress.addressLine2}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        personalAddress: {
                          ...prev.personalAddress,
                          addressLine2: e.target.value
                        }
                      }))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <InputText
                      className="mt-1 block w-[70%] rounded-md h-8 border"
                      value={formData.personalAddress.city}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        personalAddress: {
                          ...prev.personalAddress,
                          city: e.target.value
                        }
                      }))}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">State</label>
                    <Dropdown
                      value={formData.personalAddress.state}
                      options={stateOptions}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        personalAddress: {
                          ...prev.personalAddress,
                          state: e.value
                        }
                      }))}
                      className="w-[70%] rounded-md h-8 border"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Employment Details */}
              {activeIndex === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Employment Type</label>
                    <Dropdown
                      value={formData.otherFields.employmentType}
                      options={employmentTypeOptions}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        otherFields: {
                          ...prev.otherFields,
                          employmentType: e.value
                        }
                      }))}
                      className="w-[70%] rounded-md h-8 border"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Monthly Salary</label>
                    <InputText
                      type="number"
                      className="mt-1 block w-[70%] rounded-md h-8 border"
                      value={formData.otherFields.monthlySalary}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        otherFields: {
                          ...prev.otherFields,
                          monthlySalary: parseFloat(e.target.value)
                        }
                      }))}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company Name</label>
                    <InputText
                      className="mt-1 block w-[70%] rounded-md h-8 border"
                      value={formData.otherFields.companyName}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        otherFields: {
                          ...prev.otherFields,
                          companyName: e.target.value
                        }
                      }))}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">ITR Range</label>
                    <Dropdown
                      value={formData.otherFields.itrRange}
                      options={itrRangeOptions}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        otherFields: {
                          ...prev.otherFields,
                          itrRange: e.value
                        }
                      }))}
                      className="w-[70%] rounded-md h-8 border"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Loan Details */}
              {activeIndex === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">PAN Number</label>
                    <InputText
                      className="mt-1 block w-[70%] rounded-md h-8 border"
                      value={formData.personalPAN}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        personalPAN: e.target.value.toUpperCase()
                      }))}
                      pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                      maxLength={10}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Loan Amount</label>
                    <InputText
                      type="number"
                      className="mt-1 block w-[70%] rounded-md h-8 border"
                      value={formData.loanAmount}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        loanAmount: parseFloat(e.target.value)
                      }))}
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={formData.consent}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        consent: e.checked
                      }))}
                    />
                    <label className="text-sm text-gray-600">
                      I agree to the Terms and Conditions
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  onClick={() => setActiveIndex(prev => prev - 1)}
                  disabled={activeIndex === 0}
                  className="bg-gray-200 text-gray-700"
                  label="Previous"
                />
                
                {activeIndex === steps.length - 1 ? (
                  <Button
                    type="submit"
                    loading={loading}
                    disabled={!formData.consent}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                    label="Submit Application"
                  />
                ) : (
                  <Button
                    type="button"
                    onClick={() => setActiveIndex(prev => prev + 1)}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                    label="Next"
                  />
                )}
              </div>
            </form>
          </div>
        )}

        {/* Document Upload Stage */}
        {stage === 5 && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-8">Upload Documents</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* PAN Card Upload */}
              <div className="relative group">
                <div className="aspect-square bg-blue-50 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-blue-100 transition-colors">
                  <input
                    type="file"
                    ref={panFileRef}
                    className="hidden"
                    onChange={(e) => handleFileUpload(e.target.files[0], 'PAN')}
                    accept="image/*"
                  />
                  <img src="assets/pan-card.png" alt="PAN" className="w-16 h-16 mb-2" />
                  <p className="text-sm font-medium text-gray-600">PAN Card</p>
                </div>
              </div>

              {/* GST Certificate Upload */}
              <div className="relative group">
                <div className="aspect-square bg-blue-50 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-blue-100 transition-colors">
                  <input
                    type="file"
                    ref={gstFileRef}
                    className="hidden"
                    onChange={(e) => handleFileUpload(e.target.files[0], 'GST')}
                    accept="image/*"
                  />
                  <img src="assets/gst.png" alt="GST" className="w-16 h-16 mb-2" />
                  <p className="text-sm font-medium text-gray-600">GST Certificate</p>
                </div>
              </div>

              {/* Bank Statement Upload */}
              <div className="relative group">
                <div className="aspect-square bg-blue-50 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-blue-100 transition-colors">
                  <input
                    type="file"
                    ref={bankFileRef}
                    className="hidden"
                    onChange={(e) => handleFileUpload(e.target.files[0], 'BANK')}
                    accept="image/*"
                  />
                  <img src="assets/bank-statement.png" alt="Bank" className="w-16 h-16 mb-2" />
                  <p className="text-sm font-medium text-gray-600">Bank Statement</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LendingKart;