// src/components/MoneyTap.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import MoneyTapImage from "../../assets/moneytap-logo.svg";
import toast from "react-hot-toast";

const MoneyTap = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    phone: "",
    email: "",
    gender: "",
    addr: "",
    addr2: "",
    pincode: "",
    addressLine1: "",
    addressLine2: "",
    pincode: "",
    income: "",
    pan: "",
    consent: false,
  });
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
                className="p-2 border border-gray-300 rounded"
                required
              />
              <label htmlFor="dateOfBirth" className="mb-2">
                Date of Birth:
              </label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                placeholder="date of birth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded"
                required
              />
              <label htmlFor="phone" className="mb-2">
                Mobile Number:
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                maxLength={10}
                pattern="\d*"
                placeholder="mobile number"
                value={formData.phone}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded"
                required
              />
              <label htmlFor="gender" className="mb-2">
                Gender:
              </label>
              <select
                name="gender"
                placeholder="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
                required
              >
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>

              <label htmlFor="emailId" className="mb-2">
                Email ID:
              </label>
              <input
                id="emailId"
                name="emailId"
                type="email"
                placeholder="email"
                value={formData.email}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded"
                required
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              />
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
                className="p-2 border border-gray-300 rounded"
                required
              />
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
                className="p-2 border border-gray-300 rounded"
                required
              />
              <label htmlFor="pincode" className="mb-2">
                Pincode:
              </label>
              <input
                id="pincode"
                name="pincode"
                type="text"
                placeholder="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded"
                required
                pattern="^[0-9]{6}$"
              />
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
                className="p-2 border border-gray-300 rounded"
                required
              >
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
                name="name"
                type="text"
                placeholder="employer name"
                value={formData.name}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded"
                required
              />
              <label htmlFor="officeAddressLine1" className="mb-2">
                Office Address Line 1:
              </label>
              <input
                id="officeAddressLine1"
                name="addressLine1"
                type="text"
                placeholder="office address line 1"
                value={formData.addressLine1}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded"
                required
              />
              <label htmlFor="officeAddressLine2" className="mb-2">
                Office Address Line 2:
              </label>
              <input
                id="officeAddressLine2"
                name="addressLine2"
                type="text"
                placeholder="office address line 2"
                value={formData.addressLine2}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded"
                required
              />
              <label htmlFor="officePincode" className="mb-2">
                Office Pincode:
              </label>
              <input
                id="officePincode"
                name="officePincode"
                type="text"
                placeholder="office pincode"
                value={formData.pincode}
                onChange={(e) =>
                  handleNestedInputChange(e, "officeAddress", "pincode")
                }
                className="p-2 border border-gray-300 rounded"
                required
                pattern="^[0-9]{6}$"
              />
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
                className="p-2 border border-gray-300 rounded"
                required
              />
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
            {activeIndex < steps.length - 1 ? (
              <button
                type="button"
                onClick={() => setActiveIndex((prev) => prev + 1)}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading || !formData.consent || error}
                className={`px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 ${
                  loading || error
                    ? "bg-gray-500 text-gray-300"
                    : "bg-blue-500 text-white"
                }`}
                onClick={() => {
                  if (loading) {
                    setLoading(false);
                  }
                }}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            )}
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
