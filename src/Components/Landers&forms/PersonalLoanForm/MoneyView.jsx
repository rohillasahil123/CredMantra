import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import moneyview from "../../../assets/mv_new_pwa_logo.svg";

const MoneyViewForm = () => {
  const [stage, setStage] = useState(1);
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(false);

  // Form Data State
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    phone: "",
    pincode: "",
    residenceType: "",
    addressType: "current",
    email: "",
    type: "primary_device",
    income: "",
    pan: "",
    employmentType: "",
    incomeMode: "",
  });

  // Response Data State
  const [offers, setOffers] = useState(null);
  const [leadData, setLeadData] = useState("");
  // Options for dropdowns
  const residenceOptions = ["rented", "owned"];
  const empOptions = ["salaried", "self_employed"];
  const incomeOptions = ["online", "cash"];

  useEffect(() => {
    const filldata = async () => {
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
      console.log(data);
    };
    filldata();
  }, []);

  const handleInputChange = (e, nestedField = null, index = 0) => {
    const { name, value } = e.target;
    if (name === "dateOfBirth") {
      const birthDate = new Date(value);
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
        toast.error(
          "You are not eligible because you are not 18 years old yet."
        );
        return;
      }
    }

    setFormData((prev) => {
      if (nestedField) {
        const updatedList = [...prev[nestedField]];
        updatedList[index] = {
          ...updatedList[index],
          [name]: value,
        };
        return {
          ...prev,
          [nestedField]: updatedList,
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
    setError({ ...error, [name]: "" });
  };

  const validateStepOne = (formData) => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.dob) errors.dob = "Date of birth is required";
    if (!formData.phone) errors.phone = "Mobile Number is required";
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Enter a valid 10-digit phone number.";
    }
    if (!formData.residenceType)
      errors.residenceType = "Residence Type is required";
    if (!formData.pincode) errors.pincode = "Pincode is required";
    return errors;
  };

  const validatePAN = (pan) => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan);

  const validateForm = () => {
    const errors = {};

    if (
      !formData.email ||
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)
    ) {
      errors.email = "Valid email is required.";
    }

    if (!formData.income || formData.income <= 0) {
      errors.income = "Declared income must be a positive number.";
    }

    if (!formData.pan || !validatePAN(formData.pan)) {
      errors.pan =
        "PAN must be in the format: 5 uppercase letters, 4 digits, and 1 uppercase letter.";
    }

    if (!formData.employmentType) {
      errors.employmentType = "Please select an employment type.";
    }

    if (!formData.incomeMode) {
      errors.incomeMode = "Please select an income mode.";
    }

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    const newErrors = validateStepOne(formData);
    setError(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully:", formData);
      setLoading(true);
      console.log(formData, "ui");
      setLoading(false);
    }
    //   const createResponse = await axios.post(
    //     "https://credmantra.com/api/v1/partner-api/moneyview/create",
    //     formData
    //   );
    //   const newLeadId = createResponse.data.leadId;
    //   console.log(newLeadId, "tryry");
    //   setLeadData(newLeadId);
    //   console.log(leadData, "ytu");

    //   // Get offers
    //   const offersResponse = await axios.post(
    //     "https://credmantra.com/api/v1/partner-api/moneyview/offers",
    //     {
    //       leadId: leadData,
    //       phone: formData.phone,
    //     }
    //   );
    //   console.log(offersResponse.data, "offers");
    //   setOffers(offersResponse.data.data);
    //   setStage(2);
    // } catch (error) {
    //   console.error("API Error:", error);
    // } finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    console.log(error, "erey");
  });

  const handleJourney = async () => {
    try {
      const response = await axios.post(
        "https://credmantra.com/api/v1/partner-api/moneyview/journey",
        {
          leadId: leadId,
          phone: formData.phone,
        }
      );
      window.location.href = response.data.pwa;
    } catch (error) {
      console.error("Journey API Error:", error);
    }
  };

  // Steps Component
  const Steps = () => (
    <div className="flex justify-around  mb-8 ">
      {["Personal Details", "Employment Details"].map((step, index) => (
        <div key={step} className="flex items-center">
          <div
            className={`
            w-8 h-8 rounded-full flex items-center justify-center
            ${
              index <= activeStep
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-600"
            }
          `}
          >
            {index + 1}
          </div>
          <span className="ml-2 text-[12px] font-medium">{step}</span>
          {index === 0 && <div className="flex-1 h-0.5  bg-gray-200" />}
        </div>
      ))}
    </div>
  );

  const renderForm = () => (
    <div className="max-w-5xl mx-auto ">
      <Steps />

      <form
        onSubmit={handleSubmit}
        className="space-y-6 h-[100%] w-[99%  rounded-lg"
        style={{ justifyItems: "center" }}
      >
        {/* Step 1: Personal Details */}
        {activeStep === 0 && (
          <div className="   w-[90%]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="full name"
                  onChange={handleInputChange}
                  required
                  className={`mt-1 block w-[90%] h-8 rounded-md ${
                    error.name ? "border-red-500" : "border-gray-300"
                  } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                />
                {error.name && (
                  <p className="text-red-500 text-[12px]">{error.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                  className={`mt-1 block w-[90%] h-8 rounded-md ${
                    error.dob ? "border-red-500" : "border-gray-300"
                  } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                />
                {error.dob && (
                  <p className="text-red-500 text-[12px]">{error.dob}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  maxLength={10}
                  pattern="\d*"
                  value={formData.phone}
                  placeholder="mobile number"
                  onChange={handleInputChange}
                  required
                  className={`mt-1 block w-[90%] h-8 rounded-md ${
                    error.phone ? "border-red-500" : "border-gray-300"
                  } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                />
                {error.phone && (
                  <p className="text-red-500 text-[12px]">{error.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Residence Type
                </label>
                <select
                  name="residenceType"
                  value={formData.residenceType}
                  onChange={handleInputChange}
                  required
                  className={`mt-1 block w-[90%] h-8 rounded-md ${
                    error.residenceType ? "border-red-500" : "border-gray-300"
                  } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                >
                  <option value="">Select Residence Type</option>
                  {residenceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
                {error.residenceType && (
                  <p className="text-red-500 text-[12px]">
                    {error.residenceType}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  placeholder="pincode"
                  value={formData.pincode}
                  // onChange={(e) => handleInputChange(e, "addressList")}
                  onChange={handleInputChange}
                  maxLength={6}
                  pattern="^[0-9]{6}$"
                  required
                  className={`mt-1 block w-[90%] h-8 rounded-md ${
                    error.pincode ? "border-red-500" : "border-gray-300"
                  } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                />
                {error.pincode && (
                  <p className="text-red-500 text-[12px]">{error.pincode}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Employment Details */}
        {activeStep === 1 && (
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`mt-1 block w-[90%] h-8 rounded-md ${
                    error.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {error.email && (
                  <p className="text-red-500 text-sm">{error.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Declared Income
                </label>
                <input
                  type="number"
                  name="income"
                  placeholder="declared income"
                  value={formData.income}
                  onChange={handleInputChange}
                  required
                  className={`mt-1 block w-[90%] h-8 rounded-md ${
                    error.income ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {error.income && (
                  <p className="text-red-500 text-sm">{error.income}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  PAN
                </label>
                <input
                  type="text"
                  name="pan"
                  placeholder="pan"
                  value={formData.pan}
                  onChange={handleInputChange}
                  maxLength={10}
                  required
                  className={`mt-1 block w-[90%] h-8 uppercase rounded-md ${
                    error.pan ? "border-red-500" : "border-gray-300"
                  } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                />
                {error.pan && (
                  <p className="text-red-500 text-sm">{error.pan}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Employment Type
                </label>
                <select
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleInputChange}
                  required
                  className={`mt-1 block w-[90%] h-8 rounded-md ${
                    error.employmentType ? "border-red-500" : "border-gray-300"
                  } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                >
                  <option value="">Select Employment Type</option>
                  {["salaried", "self-employed", "unemployed"].map((option) => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
                {error.employmentType && (
                  <p className="text-red-500 text-sm">{error.employmentType}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Income Mode
                </label>
                <select
                  name="incomeMode"
                  value={formData.incomeMode}
                  onChange={handleInputChange}
                  required
                  className={`mt-1 block w-[90%] h-8 rounded-md ${
                    error.incomeMode ? "border-red-500" : "border-gray-300"
                  } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                >
                  <option value="">Select Income Mode</option>
                  {["monthly", "yearly", "weekly"].map((option) => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
                {error.incomeMode && (
                  <p className="text-red-500 text-sm">{error.incomeMode}</p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="consent"
                  className="ml-2 block text-sm text-gray-900"
                >
                  I agree to the Terms and Conditions and authorize MoneyView to
                  access my credit information.
                </label>
              </div>
            </div>
          </div>
        )}
        {/* Navigation Buttons */}
      </form>
      <div className="flex justify-between mt-4">
        <button
          className=" border bg-gray-100 h-8 w-[10%] rounded-sm text-md "
          disabled={activeStep === 0}
          onClick={() => setActiveStep(activeStep - 1)}
        >
          {" "}
          Prevous
        </button>

        <div>
          {activeStep === 1 ? (
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading || !consent}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                loading || !consent
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {loading ? "Processing..." : "Submit"}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-blue-700"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const renderOffers = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {offers?.status === "success" ? (
        <div className="space-y-6">
          {offers.offerObjects.map((offer, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-medium mb-4">
                Loan Offer {index + 1}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Loan Amount</p>
                  <p className="text-lg font-medium">₹{offer.loanAmount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Loan Tenure</p>
                  <p className="text-lg font-medium">
                    {offer.loanTenure} months
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Rate of Interest</p>
                  <p className="text-lg font-medium">{offer.rateOfInterest}%</p>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-center">
            <button
              onClick={handleJourney}
              disabled={loading}
              className="px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Go to MoneyView"}
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-red-600">
          <p className="text-xl">Application Rejected</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-around sm:flex-row flex-col items-center mb-8">
          <h1 className="text-lg sm:text-2xl font-semibold font-sans">
            Connect with MoneyView
          </h1>
          <img src={moneyview} alt="MoneyView" className="sm:h-12 h-9" />
        </div>

        {stage === 1 && renderForm()}
        {stage === 2 && renderOffers()}
      </div>
    </div>
  );
};

export default MoneyViewForm;
