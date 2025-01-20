import React, { useEffect, useState } from "react";
import HomeImage from "../../../assets/inHomeLoan.jpg";
import HomeLoangif from "../../../assets/homeloan.gif";

const HomeLoan = () => {
  const [isFormVisible, SetIsFormVisible] = useState(false);
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    pincode: "",
  });

  const DisplayForm = () => {
    SetIsFormVisible(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError({ ...error, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name) newErrors.name = " Name is required";
    if (!formData.lastName) newErrors.lastName = "LastName is required";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Enter a valid 10-digit phone number.";
    if (!formData.email) newErrors.email = "email is required";
    if (!formData.pincode) newErrors.pincode = "Pincode is required";
    setError(newErrors);
    console.log(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setFormData("");
      console.log("Form data submitted:", formData);
    }
  };

  return (
    <div className="sm:min-h-[105vh] h-[80vh]">
      {isFormVisible ? (
        <>
          <div className="h-[90vh] w-full  relative items-center p-[3%]">
            <h1 className="font-bold text-2xl sm:text-4xl sm:absolute ml-[2%] sm:ml-[35%]   text-center ">
              {" "}
              Home Loan Form
            </h1>
            <div
              className="items-center flex-col  sm:flex-row  sm:flex text-center  w-[80%] border h-[70%] sm:h-[89%] mt-[5%] shadow-2xl rounded-lg  "
              style={{ justifySelf: "center" }}
            >
              <div className="sm:h-[90%] sm:w-[50%] ml-[5%] w-[100%] h-[22%] justify-center ">
                <img
                  src={HomeLoangif}
                  alt=""
                  className="h-[99%] w-[48%] sm:w-[80%]"
                  style={{ justifySelf: "center" }}
                />
              </div>

              <div
                className="space-y-2 w-full sm:w-[70%] "
                style={{ textAlign: "-webkit-center" }}
              >
                <div>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={`h-9 block w-[60%] border shadow-lg  ${
                      error.name ? "border-red-500" : "border-gray-300"
                    } rounded-md p-[2%] focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="Enter full name"
                  />
                  {error.name && (
                    <p className="text-red-500 text-[12px] ">{error.name}</p>
                  )}
                </div>
               kuc <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`h-9 block w-[60%] border shadow-lg  ${
                      error.lastName ? "border-red-500" : "border-gray-300"
                    } rounded-md p-[2%] focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {error.lastName && (
                    <p className="text-red-500 text-[12px] ">
                      {error.lastName}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    maxLength={10}
                    pattern="/^\d{10}$/"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`h-9 block w-[60%] border shadow-lg  ${
                      error.phone ? "border-red-500" : "border-gray-300"
                    } rounded-md p-[2%] focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {error.phone && (
                    <p className="text-red-500 text-[12px] ">{error.phone}</p>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`h-9 block w-[60%] border shadow-lg  ${
                      error.name ? "border-red-500" : "border-gray-300"
                    } rounded-md p-[2%] focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {error.email && (
                    <p className="text-red-500 text-[12px] ">{error.email}</p>
                  )}
                </div>
                <div>
                  <input
                    type="tel"
                    name="pincode"
                    maxLength={6}
                    placeholder="Pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className={`h-9 block w-[60%] border shadow-lg  ${
                      error.name ? "border-red-500" : "border-gray-300"
                    } rounded-md p-[2%] focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {error.pincode && (
                    <p className="text-red-500 text-[12px]">{error.pincode}</p>
                  )}
                </div>
                <br />
                <button
                  type="submit"
                  className="bg-orange-500 text-sm sm:text-sm sm:ml-[9%]   sm:mt-[15%] text-white h-8 w-[60%] sm:w-[30%] rounded-md uppercase"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="h-[90vh]">
            <div className="sm:w-[100%] sm:h-[80%] relaltive ">
              <img
                src={HomeImage}
                alt=""
                srcset=""
                className="w-[98%]  h-[100%] rounded-lg mt-2"
              />
            </div>
            <div className="absolute   top-[7%] sm:top-[18%] left-[2%] sm:left-[7%] space-y-0.5 sm:space-y-1 text-white sm:text-teal-900 ">
              <h1 className="font-bold uppercase text-lg sm:text-4xl ">
                big dreams
              </h1>
              <p className="font-semibold uppercase text-sm sm:text-2xl">
                even bigger and better loans
              </p>
              <p className="font-semibold  text-sm sm:text-xl">
                ✅ Instant Home Loan Approvals
              </p>
              <p className="font-semibold  text-sm sm:text-xl">
                ✅ Lower Interest Rate
              </p>
              <p className="font-semibold  text-sm sm:text-xl">
                ✅ Fast Processing
              </p>

              <button
                className="bg-orange-500 text-sm sm:text-sm  sm:ml-[9%] sm:mt-[10%] text-white h-9 w-[50%] sm:w-[30%] rounded-md uppercase"
                onClick={DisplayForm}
              >
                Get Started
              </button>
            </div>
            <div
              className=" text-center h-[40%] w-[70%]  "
              style={{ justifySelf: "center" }}
            >
              <h1 className="text-blue-600 uppercase font-bold mt-4">
                By your dream Home with a Dream loan{" "}
              </h1>
              <p className="text-gray-500">
                Looking for a home loan that meets your needs? Our loan company
                offers flexible and competitive home financing options to help
                make your dream home a reality. With easy application processes,
                personalized support, and low interest rates, we’re committed to
                providing you with a smooth and affordable home-buying
                experience.
              </p>
              <button
                className="text-sm  border-black uppercase h-7 w-[50%]   sm:w-[20%] bg-gray-200 "
                style={{ marginTop: "2%" }}
              >
                Learn More
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeLoan;
