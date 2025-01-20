import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import fibeImage from "../../../assets/FIBE.webp";
const FibeForm = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    dob: "",
    phone: "",
    maritalStatus: "",
    gender: "",
    addr: "",
    addr2: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    profession: "",
    officeAddress: "",
    officeCity: "",
    officePincode: "",
    income: "",
    pan: "",
    consent: false,
  });

  const activeStap = [
    ["name", "dob", "lastName", "phone", "gender", "maritalStatus"],
    ["addr", "addr2", "landmark", "city", "state", "pincode"],
    [
      "profession",
      "name",
      "officeAddress",
      "officeCity",
      "officePincode",
      "income",
    ],
    ["pan"],
  ];

  useEffect(() => {
    const autofilldetails = async () => {
      const token = Cookies.get("userToken");
      const response = await axios.get(
        "https://credmantra.com/api/v1/auth/verify-user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data.data.user;
      setFormData(data);
      console.log(formData);
    };
    autofilldetails();
  }, []);

  //  steps change
  useEffect(() => {
    const currentStepFields = activeStap[step];
    const isFormValid = currentStepFields.every(
      (field) => formData[field] && formData[field].trim() !== ""
    );
    setIsButtonDisabled(!isFormValid);
  }, [formData, step]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setLoading(true);
    try {
      const response = await axios.post(
        "https://credmantra.com/api/v1/partner-api/fibe",
        {
          mobilenumber: formData.mobile,
          profile: {
            name: formData.name,
            lastname: formData.lastName,
            dob: formData.dob,
            maritalstatus: formData.maritalStatus,
            gender: formData.gender,
            address1: formData.addr,
            address2: formData.addr2,
            landmark: formData.landmark,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            employment: formData.employment,
          },
          employeedetails: {
            employername: formData.employerName,
            officeaddress: formData.officeAddress,
            officeCity: formData.officeCity,
            officepincode: formData.officePincode,
            income: formData.income,
          },
          finance: {
            pan: formData.pan,
          },
          consent: formData.consent,
          consentDatetime: new Date().toISOString(),
        }
      );
      window.location.href = response.data.redirectionUrl;

      redirectionUrl;

      console.log("Success in fibe:", response.data);
    } catch (error) {
      // Handle error
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // handle next
  const handleNext = () => {
    const currentStepFields = activeStap[step]; // Fields for current step
    const newErrors = {};

    // Validate required fields for current step
    currentStepFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        newErrors[field] = `${field} is required.`;
      }
    });

    // Validate DOB (if applicable)
    if (currentStepFields.includes("dob")) {
      const birthDate = new Date(formData.dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      if (age < 18) {
        newErrors.dob = "You must be at least 18 years old.";
      }
    }

    // Update error state
    setError(newErrors);
    console.log("Errors:", newErrors); // Debugging errors

    // Check if all fields are filled for the current step
    const isStepComplete = currentStepFields.every((field) =>
      formData[field]?.trim()
    );

    // Only increment step if no errors and all fields are filled
    if (Object.keys(newErrors).length === 0 && isStepComplete) {
      setStep((prevStep) => {
        const newStep = prevStep + 1;
        console.log("Moving to Step:", newStep); // Debugging step increment
        return newStep;
      });
    }
  };
  useEffect(() => {
    console.log("isButto", isButtonDisabled);
  });

  useEffect(() => {
    console.log("error", error);
  });

  useEffect(() => {
    console.log("loading", loading);
  });

  const renderStepIndicator = () => (
    <div className="hidden md:flex justify-center mb-8">
      {[1, 2, 3, 4].map((num) => (
        <div key={num} className="flex items-center">
          <div
            className={`
          w-8 h-8 rounded-full flex items-center justify-center
          ${
            step >= num ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
          }
        `}
          >
            {num}
          </div>
          {num < 4 && (
            <div
              className={`w-16 h-1 ${
                step > num ? "bg-blue-500" : "bg-gray-200"
              }`}
            />
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
          name="name"
          value={formData.name}
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
          value={formData.lastName}
          placeholder="last Name"
          onChange={handleChange}
          className={`w-[90%] p-2 border rounded ${
            error.lastName ? "border-red-500" : ""
          }`}
        />
        {error.lastName && <p className="text-red-500">{error.lastName}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">DOB:</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className={`mt-1 block w-[90%] border ${
            error.dob ? "border-red-500" : "border-gray-300"
          } border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500`}
        />
        {error.dob && <p className="text-red-500 text-sm mt-1">{error.dob} </p>}
      </div>
      <div>
        <label className="block mb-2">Mobile Number</label>
        <input
          type="tel"
          name="phone"
          maxLength={10}
          pattern="\d*"
          placeholder="mobile number"
          value={formData.phone}
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
          className={`w-[90%] p-2 border rounded ${
            error.maritalStatus ? "border-red-500" : ""
          }`}
        >
          <option value="">Select Status</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
        </select>
        {error.maritalStatus && (
          <p className="text-red-500">{error.maritalStatus}</p>
        )}
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
          name="addr"
          value={formData.addr}
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
          name="addr2"
          value={formData.addr2}
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
          name="name"
          placeholder="employer name"
          value={formData.name}
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
          type="number"
          name="officePincode"
          placeholder="office pincode"
          value={formData.officePincode}

          onChange={handleChange}
          maxLength={6}
          className="w-[90%] p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-2">Monthly Salary</label>
        <input
          type="number"
          name="income"
          value={formData.income}
          placeholder="monthly salary"
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
        <label>I agree to the Terms and Conditions</label>
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
              {step === 0 && renderPersonalDetails()}
              {step === 1 && renderAddressDetails()}
              {step === 2 && renderEmploymentDetails()}
              {step === 3 && renderLoanDetails()}
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                disabled={step === 0}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
              >
                Previous
              </button>

              <div className="w-[14%]">
                {step < 3 ? (
                  <button
                    type="button"
                    disabled={isButtonDisabled}
                    onClick={handleNext}
                    className={`p-2 w-[18%] rounded-md text-white font-bold ${
                      isButtonDisabled
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={
                      loading ||
                      !formData.consent ||
                      Object.keys(error).length > 0
                    }
                    className={`px-4 py-2 h-9 w-[40%]  rounded hover:bg-blue-600 ${
                      loading ||
                      !formData.consent ||
                      Object.keys(error).length > 0
                        ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                        : "bg-blue-800 text-white"
                    }`}
                    onClick={(e) => {
                      if (!loading && !Object.keys(error).length) {
                        handleSubmit(e);
                      }
                    }}
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FibeForm;
