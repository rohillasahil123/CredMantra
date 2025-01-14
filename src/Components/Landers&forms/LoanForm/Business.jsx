import React, { useState } from "react";
import businesLoan from "../../../assets/businessLoan.jpg";
import determinehelp from "../../../assets/Determine.png";
import Gdocument from "../../../assets/Gdocument.png";
import ApplyLoan from "../../../assets/Applyloan.png";
import InBusinessLoan from "../../../assets/inbusinessLoan.png";
import helpBusiness from "../../../assets/HelpBusiness.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const BusinessEligibilityForm = () => {
  const [isFormVisible, SetIsFormVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    employmentType: "",
    ammount: "",
    income: "",
    pincode: "",
    gender: "",
    pan: "",
    business_details: {
      company_type: "",
      business_name: "",
      gstRegistered: true,
      business_age: "",
      annual_turnover: "",
      currentAccount: true,
    },
  });

  const navigate = useNavigate();

  const businessHelp = [
    {
      id: 1,
      image: determinehelp,
      theam:
        "The first step is to determine  how much money you need to borrow and for what purpopse.",
      title: "Determine Needs",
    },
    {
      id: 2,
      image: Gdocument,
      theam:
        "Most lenders will require you to submit documentation like financial statement tex returns and a business plen.",
      title: "Gather Document",
    },
    {
      id: 3,
      image: ApplyLoan,
      theam:
        "Once you've determined your loan needs and gathered the necessary documents, you can start the application process.",
      title: "Apply for the Loan",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name) newErrors.name = "Full name is required.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Enter a valid 10-digit phone number.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.ammount) newErrors.ammount = "Loan amount is required.";
    if (!formData.pan) newErrors.pan = "pan is required.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) setStep(step + 1);
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };

  const DisplayForm = () => {
    SetIsFormVisible(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.dob) newErrors.dob = "Date of Birth is required.";
    if (!formData.business_name)
      newErrors.business_name = "Business Name is required.";
    if (!formData.business_age)
      newErrors.business_age = "business_age is required.";
    if (!formData.annual_turnover)
      newErrors.annual_turnover = "Annual turnover is required.";
    if (!formData.currentAccount)
      newErrors.currentAccount = "CurrentAccount is required.";
    if (!formData.residentialPincode)
      newErrors.residentialPincode = "Residential Pincode is required.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        console.log("hlo")
        const response = await axios.post(
          "https://credmantra.com/api/v1/auth/eli",
          formData
        );
        console.log(response.data);
        toast.success("Form submitted successfully!");
        if (response.data === "Success") {
          navigate("/business-list");
        }
      } catch (error) {
        console.error("Error submitting form", error);
        toast.error("An error occurred while submitting the form.");
      }
    }
  };

  return (
    <div className="sm:min-h-[200vh] min-h-[160vh]">
      {isFormVisible ? (
        <>
          <h1 className="font-bold text-4xl text-center">Business Loan </h1>
          <div
            className=" h-[80vh] sm:h-[90vh] w-[90%] border shadow-xl rounded-xl items-center flex-col sm:flex-row sm:flex justify-around mt-[3%] "
            style={{ justifySelf: "center", justifyItems: "center" }}
          >
            <div className="h-[30%] sm:h-[90%] sm:w-[50%] w-[70%] items-center text-center ">
              <img
                src={InBusinessLoan}
                alt=""
                srcset=""
                className=" h-[100%] w-[100%]  sm:h-full sm:w-full"
              />
            </div>
            <div className="w-full max-w-lg bg-white p-6 rounded-md shadow-md">
              <div className="flex justify-between border-b pb-2 mb-4">
                <button
                  className={`w-1/2 text-center py-2 font-medium ${
                    step === 1
                      ? "text-white bg-blue-500"
                      : "text-gray-500 bg-gray-200"
                  } rounded-l-md`}
                  onClick={() => setStep(1)}
                >
                  1 Basic Details
                </button>
                <button
                  className={`w-1/2 text-center py-2 font-medium ${
                    step === 2
                      ? "text-white bg-blue-500"
                      : "text-gray-500 bg-gray-200"
                  } rounded-r-md`}
                  onClick={() => setStep(2)}
                >
                  2 Additional Details
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        FullName:
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        } rounded-md p-2 focus:ring-blue-500 focus:border-blue-500`}
                        placeholder="Enter full name"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Phone Number:
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        maxLength="10"
                        pattern="/^\d{10}$"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${
                          errors.phone ? "border-red-500" : "border-gray-300"
                        } rounded-md p-2 focus:ring-blue-500 focus:border-blue-500`}
                        placeholder="Enter PhoneNumber"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email ID:
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        } rounded-md p-2 focus:ring-blue-500  focus:border-blue-500 `}
                        placeholder="Enter Email ID"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Ammount Required:
                      </label>
                      <input
                        type="number"
                        name="ammount"
                        required
                        value={formData.ammount}
                        onChange={handleChange}
                        className={`mt-1 border w-full block ${
                          errors.ammount ? "border-red-500" : "border-gray-300"
                        }rounded-md p-2 focus-within:ring-blue-500 focus:border-blue-500 `}
                        placeholder="Enter amount"
                      />
                      {errors.ammount && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.ammount}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Gender:
                      </label>
                      <select
                        name="gender"
                        required
                        value={formData.gender}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="MALE">MALE</option>
                        <option value="FEMALE">FEMALE</option>
                        <option value="OTHER">OTHER</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        PAN Number:
                      </label>
                      <input
                        type="text"
                        name="pan"
                        maxLength={10}
                        pattern="^[A-Z]{5}[0-9]{4}[A-Z]{1}$"
                        value={formData.pan}
                        onChange={handleChange}
                        className={`mt-1 border block w-full uppercase ${
                          errors.pan ? "border-red-500" : "border-gray-300"
                        }rounded-md p-2 focus-within:ring-blue-500 focus:border-blue-500 `}
                        placeholder=" PAN Number"
                      />
                      {errors.pan && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.pan}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Company Type:
                      </label>
                      <select
                        name="company_type"
                        value={formData.company_type}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Proprietorship">Proprietorship</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Private Limited">Private Limited</option>
                        <option value="Public Limited">Public Limited</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        DOB:
                      </label>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${
                          errors.dob ? "border-red-500" : "border-gray-300"
                        } border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500`}
                      />
                      {errors.dob && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.dob}{" "}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Business Name:
                      </label>
                      <input
                        type="text"
                        name="business_name"
                        value={formData.business_name}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${
                          errors.business_name
                            ? "border-red-500"
                            : "border-gray-300"
                        } border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500`}
                        placeholder="Enter Business Name"
                      />
                      {errors.business_name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.business_name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Registered for GST?
                      </label>
                      <select
                        name="gstRegistered"
                        value={formData.gstRegistered}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="YES">YES</option>
                        <option value="NO">NO</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Business Age (in months):
                      </label>
                      <input
                        type="number"
                        name="business_age"
                        value={formData.business_age}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${
                          errors.business_age
                            ? "border-red-500"
                            : "border-gray-300"
                        } border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500`}
                        placeholder="Enter Business Age"
                      />
                      {errors.business_age && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.business_age}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Annual Turnover:
                      </label>
                      <input
                        type="number"
                        name="annual_turnover"
                        value={formData.annual_turnover}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${
                          errors.annual_turnover
                            ? "border-red-500"
                            : "border-gray-300"
                        } border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500`}
                        placeholder="Enter Annual Turnover"
                      />
                      {errors.annual_turnover && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.annual_turnover}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Residential Pincode:
                      </label>
                      <input
                        type="text"
                        name="residentialPincode"
                        value={formData.residentialPincode}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${
                          errors.residentialPincode
                            ? "border-red-500"
                            : "border-gray-300"
                        } border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500`}
                        placeholder="Enter Pincode"
                      />
                      {errors.residentialPincode && (
                        <p className="mt-1 text-red-500 text-sm">
                          {errors.residentialPincode}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Current Account?
                      </label>
                      <select
                        name="currentAccount"
                        value={formData.currentAccount}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="YES">YES</option>
                        <option value="NO">NO</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-6">
                  {step > 1 && (
                    <button
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                      onClick={handlePrevious}
                    >
                      Previous
                    </button>
                  )}
                  {step < 2 ? (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={handleNext}
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
          <div
            className="h-[60vh] w-full flex-col sm:flex-row sm:flex justify-around mt-[70%] sm:mt-[8%] items-center "
            style={{ justifyItems: "center" }}
          >
            <div className="h-[50%] sm:h-full sm:w-[40%] w-[80%] sm:mt-[18%] space-y-2 ml-4">
              <h1 className=" text-sm sm:text-xl font-semibold">
                How Can We help
              </h1>
              <h1 className=" text-xl sm:text-3xl font-bold">
                We Love Help Small Business
              </h1>
              <p className="sm:text-md text-sm ">
                Small businesses are the backbone of many local economies and
                can have a significant impact on the communities they serve. As
                a small business owner. There are many resources available to
                help you grow and succeed.
              </p>
              <button className="text-md font-bold rounded-lg bg-yellow-500 h-[16%] w-[30%] sm:h-[10%] sm:w-[40%] mt-[3%] hover:bg-yellow-700">
                Apply
              </button>
            </div>
            <div className="h-[80%] sm:h-[90%]   w-[60%] sm:w-[30%]  mr-[6%] ">
              <img
                src={helpBusiness}
                alt=""
                className=" h-[50%] sm:h-[100%] w-[100%] rounded-lg"
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="h-[100vh]">
            <div className="sm:w-[100%] sm:h-[90%] relaltive ">
              <img
                src={businesLoan}
                alt=""
                srcset=""
                className="w-[100%]  h-[100%] rounded-lg mt-2 opacity-80 "
              />
            </div>
            <div className="absolute top-[7%] sm:top-[20%] left-[2%] sm:left-[3%] mt-[1%]  ">
              <h1 className="font-bold uppercase text-lg sm:text-[70px] ">
                Expert IN
              </h1>
              <h1 className="font-bold uppercase text-lg sm:text-[60px] sm:mt-[7%]  ">
                Business Loan
              </h1>
              <h1 className="mt-[4%] text-[8px] sm:text-xl  text-black ">
                A business loan can be vital for export companies seeking growth
                in international markets. <br /> It provides the capital needed
                for expanding production, covering <br /> shipping costs, and
                managing foreign currency fluctuations. <br /> With tailored
                financing solutions, export businesses can meet large orders,
                maintain <br />
                competitive pricing, and explore new markets, <br /> ultimately
                driving global trade and strengthening their financial
                stability.
              </h1>

              <button
                className="bg-yellow-500 text-sm sm:text-sm  sm:ml-[9%] sm:mt-[4%] mt-4 text-white h-9 w-[50%] sm:w-[30%] rounded-md uppercase"
                onClick={DisplayForm}
              >
                Get Started
              </button>
            </div>
            <div
              className="text-center h-[26vh] sm:h-[40vh] mt-[4%] sm:mt-[2%] w-[80%]"
              style={{ justifySelf: "center" }}
            >
              <h1 className="font-semibold text-md sm:text-lg">
                {" "}
                Take Your Business To New Heights With Our{" "}
              </h1>
              <h1 className="font-bold text-xl sm:text-5xl">
                Flexible and Affordable Loans !
              </h1>
              <p className="sm:text-xl text-[10px] font-serif mt-[1%] ">
                Running a successful business often involves strategic financial
                management, and loans can be a key resource for growth and
                stability. Business loans offer the capital needed to expand
                operations, invest in new equipment, increase inventory, or
                explore new markets. For entrepreneurs, securing a{" "}
              </p>
            </div>
            <div
              className="h-[67vh] w-[80%] flex-col sm:flex sm:flex-row justify-center sm:mt-[2%] space-x-4"
              style={{ justifySelf: "center" }}
            >
              {businessHelp.map((loan, index) => (
                <div
                  key={index}
                  className=" space-x-3 text-center items-center justify-center "
                >
                  <div className="" style={{ justifyItems: "center" }}>
                    <h1 className="font-bold text-lg">{loan.title}</h1>
                    <img
                      src={loan.image}
                      alt=" "
                      className="h-[15%] w-[130px]"
                    />
                  </div>
                  <h1>{loan.theam}</h1>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BusinessEligibilityForm;
