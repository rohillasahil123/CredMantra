import React, { useEffect, useState } from "react";
import axios from "axios";
import FatakPayImage from "../../../assets/fatakpay.svg";
import Cookies from "js-cookie";

const FatakPay = () => {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    last_name: "",
    gender: "",
    email: "",
    employment_type_id: "",
    pan: "",
    dob: "",
    pincode: "",
    consent: false,
  });

  useEffect(() => {
    const getData = async () => {
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
    getData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      setError("You are not eligible because you are not 18 years old yet.");
      return;

    }

    const submitData = {
      ...formData,
      consent_timestamp: new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
    };

    try {
      const response = await axios.post(
        "https://credmantra.com/api/v1/partner-api/fatakpay/eligibility",
        submitData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-2xl font-bold mb-6">Connect with FatakPay</h2>
        <img src={FatakPayImage} alt="FatakPay" className="h-5" />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">First Name</label>
            <input
              type="text"
              name="name"
              placeholder="first name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Last Name</label>
            <input
              type="text"
              name="last_name"
              placeholder="last name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          {/* Row 2 */}
          <div>
            <label className="block mb-1">Mobile Number</label>
            <input
              type="tel"
              name="phone"
              maxLength={10}
              pattern="\d*"
              placeholder="mobile number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          {/* Row 3 */}
          <div>
            <label className="block mb-1">Gender</label>
            <select
              name="gender"
              placeholder="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Employment Type</label>
            <select
              name="employment_type_id"
              placeholder="employment type"
              value={formData.employment_type_id}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            >
              <option value="">Select Employment Type</option>
              <option value="Salaried">Salaried</option>
              <option value="Self-Employed">Self-Employed</option>
            </select>
          </div>

          {/* Row 4 */}
          <div>
            <label className="block mb-1">PAN Number</label>
            <input
              type="text"
              name="pan"
              placeholder="pan number"
              value={formData.pan}
              onChange={handleChange}
              maxLength={10}
              className="w-full border rounded p-2 uppercase"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Date of Birth</label>
            <input
              type="date"
              name="dob"
              placeholder="date of birth"
              value={formData.dob}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
            {error && <p className="text-red-600">{error}</p>}
          </div>

          {/* Row 5 */}
          <div>
            <label className="block mb-1">Pincode</label>
            <input
              type="number"
              name="pincode"
              placeholder="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
        </div>

        {/* Consent checkbox - full width */}
        <div className="mt-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              className="mr-2"
              required
            />
            <label>I agree to the terms and conditions</label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Check Eligibility
        </button>
      </form>
    </div>
  );
};

export default FatakPay;
