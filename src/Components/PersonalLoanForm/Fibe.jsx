import React, { useState } from 'react';
import axios from 'axios';
import fibeImage from "../../assets/FIBE.webp"
import toast from 'react-hot-toast';
const FibeForm = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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


    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const birthDate = new Date(formData.dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 18) {
      setError("You are not eligible because you are not 18 years old yet.");
      return;
    }
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
          placeholder="first name"
          onChange={handleChange}
          className="w-[90%] p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-2">Last Name</label>
        <input
          type="text"
          name="lastName"
          placeholder="last name"
          value={formData.lastName}
          onChange={handleChange}
          className="w-[90%] p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-2">Date of Birth</label>
        <input
          type="date"
          name="dob"
          placeholder="date of birth"
          value={formData.dob}
          onChange={handleChange}
          className="w-[90%] p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-2">Mobile Number</label>
        <input
          type="tel"
          name="mobile"
          maxLength={10}
          pattern="\d*"
          placeholder="mobile number"
          value={formData.mobile}
          onChange={handleChange}
          className="w-[90%] p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-2">Marital Status</label>
        <select
          name="maritalStatus"
          value={formData.maritalStatus}
          onChange={handleChange}
          className="w-[90%] p-2 border rounded"
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
          className="w-[90%] p-2 border rounded"
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
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
          placeholder="address line"
          onChange={handleChange}
          className="w-[90%] p-2 border rounded"
          required
        />
      </div>
      <div className="md:col-span-2">
        <label className="block mb-2">Address Line 2</label>
        <input
          type="text"
          name="address2"
          value={formData.address2}
          placeholder="address line 2"
          onChange={handleChange}
          className="w-[90%] p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-2">Landmark</label>
        <input
          type="text"
          name="landmark"
          placeholder="landmark"
          value={formData.landmark}
          onChange={handleChange}
          className="w-[90%] p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-2">City</label>
        <input
          type="text"
          name="city"
          placeholder="city"
          value={formData.city}
          onChange={handleChange}
          className="w-[90%] p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-2">State</label>
        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="w-[90%] p-2 border rounded"
          required
        >
          <option value="">Select State</option>
          <option value="Delhi">Delhi</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Andhra Pradesh">Andhra Pradesh</option>
          <option value="Telangana">Telangana</option>
          <option value="Uttar Pradesh">Uttar Pradesh</option>
          <option value="Kerala">Kerala</option>
          <option value="Haryana">Haryana</option>
          <option value="Other">Other</option>
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
          placeholder="pincode"
          className="w-[90%] p-2 border rounded"
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
          className="w-[90%] p-2 border rounded"
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
          placeholder="employer name"
          value={formData.employerName}
          onChange={handleChange}
          className="w-[90%] p-2 border rounded"
          required
        />
      </div>
      <div className="md:col-span-2">
        <label className="block mb-2">Office Address</label>
        <input
          type="text"
          name="officeAddress"
          placeholder="office address"
          value={formData.officeAddress}
          onChange={handleChange}
          className="w-[90%] p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-2">Office City</label>
        <input
          type="text"
          name="officeCity"
          placeholder="office city"
          value={formData.officeCity}
          onChange={handleChange}
          className="w-[90%] p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-2">Office Pincode</label>
        <input
          type="text"
          name="officePincode"
          placeholder="office pincode"
          value={formData.officePincode}
          onChange={handleChange}
          maxLength="6"
          className="w-[90%] p-2 border rounded"
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
          className="w-[90%] p-2 border rounded"
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
          className="w-[90%] md:w-1/2 p-2 border rounded uppercase"
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
            <img src={fibeImage} alt="Fibe" className="h-12" />
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
                  disabled={loading || !formData.consent || error}
                  className={`px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 ${loading || error ? 'bg-gray-500 text-gray-300' : 'bg-blue-500 text-white'
                    }`}
                  onClick={() => {
                    if (loading) {
                      setLoading(false);
                    }}}>
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              )}
            </div>
          </form>
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FibeForm;