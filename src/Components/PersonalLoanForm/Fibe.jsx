import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FibeForm = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    mobile: '',
    maritalStatus: '',
    gender: '',
    address1: '',
    address2: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    profession: '',
    employerName: '',
    officeAddress: '',
    officeCity: '',
    officePincode: '',
    salary: '',
    pan: '',
    consent: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://credmantra.com/api/v1/partner-api/fibe', {
        mobilenumber: formData.mobile,
        profile: {
          firstname: formData.firstName,
          lastname: formData.lastName,
          dob: formData.dob,
          maritalstatus: formData.maritalStatus,
          gender: formData.gender,
          address1: formData.address1,
          address2: formData.address2,
          landmark: formData.landmark,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          profession: formData.profession
        },
        employeedetails: {
          employername: formData.employerName,
          officeaddress: formData.officeAddress,
          officeCity: formData.officeCity,
          officepincode: formData.officePincode,
          salary: formData.salary
        },
        finance: {
          pan: formData.pan
        },
        consent: formData.consent,
        consentDatetime: new Date().toISOString()
      });
      window.location.href = response.data.redirectionUrl
      
      redirectionUrl
      
     
      console.log('Success in fibe:', response.data);
    } catch (error) {
      // Handle error
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-8">
      {[1, 2, 3, 4].map((num) => (
        <div key={num} className="flex items-center">
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center
            ${step >= num ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}
          `}>
            {num}
          </div>
          {num < 4 && (
            <div className={`w-16 h-1 ${step > num ? 'bg-blue-500' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderPersonalDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block mb-2">First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-2">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-2">Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-2">Mobile Number</label>
        <input
          type="tel"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          maxLength="10"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-2">Marital Status</label>
        <select
          name="maritalStatus"
          value={formData.maritalStatus}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Status</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
        </select>
      </div>
      <div>
        <label className="block mb-2">Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
    </div>
  );

  const renderAddressDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        <label className="block mb-2">Address Line 1</label>
        <input
          type="text"
          name="address1"
          value={formData.address1}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="md:col-span-2">
        <label className="block mb-2">Address Line 2</label>
        <input
          type="text"
          name="address2"
          value={formData.address2}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-2">Landmark</label>
        <input
          type="text"
          name="landmark"
          value={formData.landmark}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-2">City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-2">State</label>
        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select State</option>
          <option value="Delhi">Delhi</option>
          <option value="Maharashtra">Maharashtra</option>
          {/* Add other states */}
        </select>
      </div>
      <div>
        <label className="block mb-2">Pincode</label>
        <input
          type="text"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          maxLength="6"
          className="w-full p-2 border rounded"
          required
        />
      </div>
    </div>
  );

  const renderEmploymentDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block mb-2">Profession</label>
        <select
          name="profession"
          value={formData.profession}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Profession</option>
          <option value="Salaried">Salaried</option>
          <option value="Self-employed">Self-employed</option>
        </select>
      </div>
      <div>
        <label className="block mb-2">Employer Name</label>
        <input
          type="text"
          name="employerName"
          value={formData.employerName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="md:col-span-2">
        <label className="block mb-2">Office Address</label>
        <input
          type="text"
          name="officeAddress"
          value={formData.officeAddress}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-2">Office City</label>
        <input
          type="text"
          name="officeCity"
          value={formData.officeCity}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-2">Office Pincode</label>
        <input
          type="text"
          name="officePincode"
          value={formData.officePincode}
          onChange={handleChange}
          maxLength="6"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-2">Monthly Salary</label>
        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
    </div>
  );

  const renderLoanDetails = () => (
    <div className="space-y-4">
      <div>
        <label className="block mb-2">PAN Number</label>
        <input
          type="text"
          name="pan"
          value={formData.pan}
          onChange={handleChange}
          className="w-full md:w-1/2 p-2 border rounded"
          maxLength="10"
          required
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="consent"
          checked={formData.consent}
          onChange={handleChange}
          className="h-4 w-4"
          required
        />
        <label>
          I agree to the Terms and Conditions
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Connect with Fibe</h1>
            <img src="/fibe-logo.png" alt="Fibe" className="h-12" />
          </div>

          {renderStepIndicator()}

          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              {step === 1 && renderPersonalDetails()}
              {step === 2 && renderAddressDetails()}
              {step === 3 && renderEmploymentDetails()}
              {step === 4 && renderLoanDetails()}
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(s => s - 1)}
                disabled={step === 1}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
              >
                Previous
              </button>
              
              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep(s => s + 1)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading || !formData.consent}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FibeForm;