import React, { useState } from "react";
import hiring from "../../../assets/hiring.png";

const Hiring = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    number: "",
    role: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Form Submitted!");
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row items-center justify-around bg-gray-50 p-4">
      {/* Left Section with Image */}
      <div className="lg:flex w-[50%] sm:w-1/2  justify-center">
        <img src={hiring} alt="Hiring" className="max-w-md w-[100%] animate-bounce "/>
      </div>
      {/* Right Section with Form */}
      <div className="bg-white rounded-lg shadow-lg p-8 sm:0 sm:mr-[7%] w-full max-w-2xl lg:w-1/2">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Join Our Team
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your name"
                required
              />
            </div>
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your email"
                required
              />
            </div>
            {/* Address Field */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your address"
                required
              />
            </div>
          </div>
          {/* Section 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Phone Number Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="number"
                value={formData.number}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your phone number"
                required
              />
            </div>
            {/* Select Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              >
                <option value="" disabled>
                  Choose your role
                </option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Performance Tester">Performance Tester</option>
                <option value="HR">HR</option>
                <option value="Team Leader">Team Leader</option>
              </select>
            </div>
            {/* Resume Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Upload Resume
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default Hiring;
