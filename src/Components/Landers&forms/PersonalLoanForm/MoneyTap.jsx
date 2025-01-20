// src/components/MoneyTap.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import MoneyTapImage from "../../../assets/moneytap-logo.svg";;

const MoneyTap = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    phone: "",
    gmail: "",
    gender: "",
    addr: "",
    addr2: "",
    pincode: "",
    addressLine1: "",
    addressLine2: "",
    income: "",
    pan: "",
    jobType: "",
    EmployName: "",
    OfficeAddress1: "",
    OfficeAddress2: "",
    OfficePincode: "",
    consent: false,
  });
  const activeStep = [
    ["name", "dob", "phone", "email", "gender"],
    ["addressLine1", "addressLine2", "pincode"],
    [
      "jobType",
      "EmployName",
      "OfficeAddress1",
      "OfficeAddress2",
      "income",
    ],
    ["pan"],
  ];

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [response, setResponse] = useState(null);

  const jobTypeOptions = [
    "SALARIED",
    "SELF_EMPLOYED",
    "STUDENT",
    "HOMEMAKER",
    "RETIRED",
  ];

  const steps = [
    "Personal Details",
    "Address",
    "Employment Details",
    "Loan Details",
  ];

  useEffect(() => {
    const fillData = async () => {
      const token = Cookies.get("userToken");
      const response = await axios.get(
        "https://credmantra.com/api/v1/auth/verify-user",
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data.data.user;
      console.log(data);
      setFormData(data);
    };
    fillData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError({ ...error, [name]: "" });
  };

  const handleNestedInputChange = (e, category, field) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [category]: {
        ...prevData[category],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const birthDate = new Date(formData.dateOfBirth);
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
      navigate("/age-error");
      return;
    }
    formData.consentDatetime = new Date().toISOString();
    try {
      const res = await axios.post(
        "https://credmantra.com/api/v1/partner-api/moneytap/create",
        formData
      );
      setResponse(res.data);
      setFormSubmitted(true);
      console.log(res.data);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    const newErrors = {};
    if (activeIndex === 0) {
      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.gmail) newErrors.gmail = "Email is required";
      if (!formData.dob) newErrors.dob = "Date of birth is required";
      if (!formData.phone) newErrors.phone = "Phone number is required";
      if (!/^\d{10}$/.test(formData.phone))
        newErrors.phone = "Enter a valid 10-digit phone number."; 
      if (!formData.gender) newErrors.gender = "Gender is required";
    } else if (activeIndex === 1) {
      if (!formData.addr) newErrors.addr = "Address1 is required";
      if (!formData.addr2) newErrors.addr2 = "Address2 is required";
      if (!formData.pincode) newErrors.pincode = "Pincode is required";
    } else if (activeIndex === 2) {
      if (!formData.jobType) newErrors.jobType= "Job type is required";
      if (!formData.EmployName) newErrors.EmployName = "EmployName is required";
      if (!formData.OfficeAddress1) newErrors.OfficeAddress1 = "Office address is required";
      if (!formData.OfficeAddress2) newErrors.OfficeAddress2 = "Office address2 is required";
      if (!formData.OfficePincode) newErrors.OfficePincode = "Office pincode is required";
      if (!formData.income) newErrors.income = "Income is required";
    }else if(activeIndex === 3){
      if (!formData.pan) newErrors.pan = "pan is required";
    }
    setError(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log(formData);
      setActiveIndex((prev) => prev + 1);
    }
  };
  
  useEffect(() => {
    console.log(error , "error" ) ;
    console.log(loading , "Loading  ho rhi hai ")
  
  });


  useEffect(()=>{
    console.log(  loading || error)
    console.log("loading")  
  })

  return (
    <div className="flex flex-col items-center mt-5 min-h-screen w-full self-center">
      <div className="flex flex-col md:flex-row justify-between w-[90%] items-center mb-8">
        <h1 className="text-2xl font-semibold mb-5">Connect with MoneyTap</h1>
        <img src={MoneyTapImage} alt="MoneyTap" className="h-12" />
      </div>

      {!formSubmitted ? (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md "
          style={{ justifyItems: "center" }}
        >
          {activeIndex === 0 && (
            <div className="flex flex-col mb-4 w-[90%]">
              <label htmlFor="name" className="mb-2">
                Name:
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-[90%] p-2 border rounded ${
                  error.name ? "border-red-500" : ""
                }`}
                required
              />
              {error.name && <p className="text-red-500">{error.name}</p>}
              <label htmlFor="dateOfBirth" className="mb-2">
                Date of Birth:
              </label>
              <input
                id="dateOfBirth"
                name="dob"
                type="date"
                placeholder="date of birth"
                value={formData.dob}
                onChange={handleInputChange}
                className={`w-[90%] p-2 border rounded ${
                  error.dob ? "border-red-500" : ""
                }`}
                required
              />
              {error.dob && <p className="text-red-500">{error.dob}</p>}
              <label htmlFor="phone" className="mb-2">
                Mobile Number:
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                maxLength={10}
                pattern="\d*"
                placeholder="mobile number"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-[90%] p-2 border rounded ${
                  error.phone ? "border-red-500" : ""
                }`}
                required
              />
              {error.phone && <p className="text-red-500">{error.phone}</p>}
              <label htmlFor="gender" className="mb-2">
                Gender:
              </label>
              <select
                name="gender"
                placeholder="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className={`w-[90%] p-2 border rounded ${
                  error.gender ? "border-red-500" : "bg-gray-300"
                }`}
                required
              >
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
              {error.gender && <p className="text-red-500">{error.gender}</p>}

              <label htmlFor="emailId" className="mb-2">
                Email ID:
              </label>
              <input
                id="emailId"
                name="gmail"
                type="gmail"
                placeholder="Gmail"
                value={formData.gmail}
                onChange={handleInputChange}
                className={`w-[90%] p-2 border rounded ${
                  error.gmail ? "border-red-500" : "bg-gray-300"
                }`}
                required
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              />
              {error.gmail && <p className="text-red-500">{error.gmail}</p>}
            </div>
          )}
          {activeIndex === 1 && (
            <div className="flex flex-col mb-4 w-[90%]">
              <label htmlFor="addressLine1" className="mb-2">
                Address Line 1:
              </label>
              <input
                id="addressLine1"
                name="addr"
                type="text"
                placeholder="address"
                value={formData.addr}
                onChange={handleInputChange}
                className={`w-[90%] p-2 border rounded ${
                  error.addr ? "border-red-500" : "bg-gray-300"
                }`}
                required
              />
              {error.addr && <p className="text-red-500">{error.addr}</p>}
              <label htmlFor="addressLine2" className="mb-2">
                Address Line 2:
              </label>
              <input
                id="addressLine2"
                name="addr2"
                type="text"
                placeholder="address 2"
                value={formData.addr2}
                onChange={handleInputChange}
                className={`w-[90%] p-2 border rounded ${
                  error.addr2 ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              {error.addr2 && <p className="text-red-500">{error.addr2}</p>}
              <label htmlFor="pincode" className="mb-2">
                Pincode:
              </label>
              <input
                id="pincode"
                name="pincode"
                type="number"
                maxLength={6}
                placeholder="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                className={`w-[90%] p-2 border rounded ${
                  error.lastName ? "border-red-500" : "border-gray-300"
                }`}
                required
                pattern="^[0-9]{6}$"
              />
              {error.pincode && <p className="text-red-500">{error.pincode}</p>}
            </div>
          )}
          {activeIndex === 2 && (
            <div className="flex flex-col mb-4 w-[90%]">
              <label htmlFor="jobType" className="mb-2">
                Job Type:
              </label>
              <select
                id="jobType"
                name="jobType"
                placeholder="job type"
                value={formData.jobType}
                onChange={handleInputChange}
                className={`w-[90%] p-2 border rounded ${
                  error.jobType ? "border-red-500" : ""
                }`}
                required
              >
                {error.jobType && (
                  <p className="text-red-500">{error.jobType}</p>
                )}
                {jobTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <label htmlFor="companyName" className="mb-2">
                Employer Name:
              </label>
              <input
                id="companyName"
                name="EmployName"
                type="text"
                placeholder="employer name"
                value={formData.EmployName}
                onChange={handleInputChange}
                className={`w-[90%] p-2 border rounded ${
                  error.EmployName ? "border-red-500" : ""
                }`}
                required
              />
              {error.EmployName && <p className="text-red-500">{error.EmployName}</p>}
              <label htmlFor="officeAddressLine1" className="mb-2">
                Office Address Line 1:
              </label>
              <input
                id="officeAddressLine1"
                name="OfficeAddress1"
                type="text"
                placeholder="office address line 1"
                value={formData.OfficeAddress1}
                onChange={handleInputChange}
                className={`w-[90%] p-2 border rounded ${
                  error.OfficeAddress1 ? "border-red-500" : ""
                }`}
                required
              />
              {error.OfficeAddress1 && (
                <p className="text-red-500">{error.OfficeAddress1}</p>
              )}
              <label htmlFor="officeAddressLine2" className="mb-2">
                Office Address Line 2:
              </label>
              <input
                id="officeAddressLine2"
                name="OfficeAddress2"
                type="text"
                placeholder="office address line 2"
                value={formData.OfficeAddress2}
                onChange={handleInputChange}
                className={`w-[90%] p-2 border rounded ${
                  error.OfficeAddress2 ? "border-red-500" : ""
                }`}
                required
              />
          {
            error.OfficeAddress2 &&( <p className="text-sm text-red-500">{error.OfficeAddress2}</p>)
          }


              <label htmlFor="officePincode" className="mb-2">
                Office Pincode:
              </label>
              <input
                id="officePincode"
                name="OfficePincode"
                type="number"
                placeholder="office pincode"
                maxLength={6}q
                value={formData.OfficePincode}
                onChange={handleInputChange}
                className={`w-[90%] p-2 border rounded ${
                  error.OfficePincode ? "border-red-500" : ""
                }`}
                required
                pattern="^[0-9]{6}$"
              />
              {
                error.OfficePincode &&( <p className="text-red-500">{error.OfficePincode}</p>)
              }
              <label htmlFor="declaredIncome" className="mb-2">
                Declared Income:
              </label>
              <input
                id="declaredIncome"
                name="income"
                type="number"
                placeholder="declar income"
                value={formData.income}
                onChange={handleInputChange}
                className={`w-[90%] p-2 border rounded ${
                  error.OfficeAddress2 ? "border-red-500" : ""
                }`}
                required
              />
              {
                error.income &&( <p className="text-red-500">{error.income}</p>)
              }
            </div>
          )}
          {activeIndex === 3 && (
            <div className="flex flex-col mb-4 w-[90%]">
              <label htmlFor="panNumber" className="mb-2">
                PAN:
              </label>
              <input
                id="panNumber"
                name="pan"
                type="text"
                placeholder="pan number"
                value={formData.pan}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded uppercase"
                required
                maxLength="10"
              />
              <div className="flex items-center mt-2">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) =>
                    setFormData({ ...formData, consent: e.target.checked })
                  }
                  className="mr-2"
                  required
                />
                <label htmlFor="consent">
                  I agree to the{" "}
                  <a
                    href="/fibe/terms"
                    target="_blank"
                    className="text-blue-500"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>
          )}
          <div className="flex justify-between mt-4 w-[90%] ">
            <button
              type="button"
              onClick={() => setActiveIndex((prev) => Math.max(prev - 1, 0))}
              className="bg-blue-500 text-white py-2 px-4 rounded"
              disabled={activeIndex === 0}
            >
              Previous
            </button>
            <div>
    {activeIndex < steps.length - 1 ? (
      <button
        type="button"
        onClick={handleNext}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Next
      </button>
    ) : (
      <button
        type="submit"
        disabled={!formData.consent || !error}
        className={`px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 ${
          error ? "bg-blue-500 text-gray-300" : "bg-blue-500 text-white"
        }`}
        onClick={handleSubmit}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    )}
  </div>
          </div>
        </form>
      ) : (
        <div className="mt-5">
          {response && response.status === "success" && (
            <p className="text-green-500">
              Congratulations! Submission successful.
            </p>
          )}
        </div>
      )}
    </div>
  );
};



 

export default MoneyTap;
