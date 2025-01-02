import React, { useState, useRef , useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import CasheImage from "../../assets/cashe.jpg";

const CasheForm = () => {
  const [stage, setStage] = useState(1);
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  // const [deDupeLoading, setDeDupeLoading] = useState(false);
  const [uploadButton, setUploadButton] = useState("Submit");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState(null); 




  useEffect(() => {
      const autofilldetails = async () => {
        const token = Cookies.get("userToken");
        const response = await axios.get(
          "https://credmantra.com/api/v1/auth/verify-user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      )
      const data = response.data.data.user
      console.log(data, "response");
      setMainForm(data);  
      }
      autofilldetails();
  }, []);

  // File refs
  const aadharFileRef = useRef();
  const panFileRef = useRef();
  const bankFileRef = useRef();

  const [mainForm, setMainForm] = useState({
    name: "",
    dob: "",
    gender: "",
    pan: "",
    phone: "",
    addr: "",
    locality: "",
    pincode: "",
    city: "",
    state: "",
    email: "",
    companyName: "",
    employmentType: "",
    salary: "",
    salaryReceivedType: "",
    loanAmount: "",
    partner_name: "CredMantra_Partner1",
  });

  const [files, setFiles] = useState({
    aadhar: null,
    pan: null,
    bank: null,
  });

  const [response, setResponse] = useState(null);

  // Options for dropdowns
  const genderOptions = ["M", "F"];
  const stateOptions = [
    "ANDAMAN & NICOBAR ISLANDS",
    "ANDHRA PRADESH",
    "ARUNACHAL PRADESH",
    "ASSAM",
    "BIHAR",
    "CHANDIGARH",
    "CHATTISGARH",
    "DADRA & NAGAR HAVELI",
    "DAMAN & DIU",
    "DELHI",
    "GOA",
    "GUJARAT",
    "HARYANA",
    "HIMACHAL PRADESH",
    "JAMMU AND KASHMIR",
    "JHARKHAND",
    "KARNATAKA",
    "KERALA",
    "LAKSHADWEEP",
    "MADHYA PRADESH",
    "MAHARASHTRA",
    "MANIPUR",
    "MEGHALAYA",
    "MIZORAM",
    "NAGALAND",
    "ODISHA",
    "PUNJAB",
    "RAJASTHAN",
    "SIKKIM",
    "TAMIL NADU",
    "TELANGANA",
    "TRIPURA",
    "UTTAR PRADESH",
    "UTTARAKHAND",
    "WEST BENGAL",
  ];
  const employmentOptions = [
    { name: "Salaried full-time", value: 1 },
    { name: "Unemployed", value: 2 },
    { name: "Self-Employed", value: 3 },
  ];
  const salaryOptions = [
    { name: "Cash", value: 1 },
    { name: "Cheque", value: 2 },
    { name: "Direct Account Transfer", value: 3 },
  ];

  // Steps Component
  const Steps = ({ activeStep, steps }) => {
    return (
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            <div
              className={`
              flex items-center justify-center w-8 h-9 border rounded-full
              ${
                index <= activeStep
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }
            `}
            >
              {index + 1}
            </div>
            <div className="hidden md:block ml-2 text-sm font-medium text-gray-900">
              {step}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`
                w-full h-1 mx-2
                ${index < activeStep ? "bg-blue-600" : "bg-gray-200"}
              `}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  // Handle DeDupe Form Submit
  const handleDeDupeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://credmantra.com/api/v1/partner-api/cashe/checkDuplicateLead",
        mainForm
      );
      console.log(response.data, "response");
      if (response.data.status === "VALIDATION_ERROR") {
        setStage(2);
      } else {
        setStage(3);
      }
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Main Form Submit
  const handleMainFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const birthDate = new Date(mainForm.dob);
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
    try {
      const response = await axios.post(
        "https://credmantra.com/api/v1/partner-api/cashe/preApproval",
        mainForm
      );
      console.log(response.data, "responsedata");
      setResponse(response.data);
      if (
        response.data.payLoad.status === "pre_qualified_high" ||
        response.data.payLoad.status === "pre_qualified_low"
      ) {
        setStage(4);
      } else {
        setStage(6);
      }
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle File Upload
  const handleFileUpload = async () => {
    setLoading(true);
    setUploadButton("Uploading...");

    try {
      // Upload Aadhar
      if (files.aadhar) {
        const aadharFormData = new FormData();
        aadharFormData.append("docImage", files.aadhar);
        await axios.post("/api/upload/aadhar", aadharFormData);
        setUploadButton("Uploading PAN...");
      }

      // Upload PAN
      if (files.pan) {
        const panFormData = new FormData();
        panFormData.append("docImage", files.pan);
        await axios.post("/api/upload/pan", panFormData);
        setUploadButton("Uploading Bank Statement...");
      }

      // Upload Bank Statement
      if (files.bank) {
        const bankFormData = new FormData();
        bankFormData.append("docImage", files.bank);
        await axios.post("/api/upload/bank", bankFormData);
      }

      setStage(7);
      setUploadButton("Complete");
    } catch (error) {
      console.error("Upload Error:", error);
      setUploadButton("Error");
    } finally {
      setLoading(false);
    }
  };

  // Handle File Selection
  const handleFileChange = (type) => (event) => {
    setFiles((prev) => ({
      ...prev,
      [type]: event.target.files[0],
    }));
  };

  // Render DeDupe Form
  const renderDeDupeForm = () => (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleDeDupeSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mobile Number
          </label>
          <input
            type="number"
            maxLength={10}
            pattern="\d*"
            required
            placeholder="mobile number"
            value={mainForm.phone}
            onChange={(e) =>
              setMainForm((prev) => ({
                ...prev,
                phone: e.target.value,
              }))
            }
            className="mt-1 block w-[90%] h-9 border rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email ID
          </label>
          <input
            type="email"
            required
            placeholder="email id"
            value={mainForm.email}
            onChange={(e) =>
              setMainForm((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            className="mt-1 block w-[90%] h-9 border rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            PAN Number
          </label>
          <input
            type="text"
            required
            maxLength={10}
            pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
            placeholder="pan number"
            value={mainForm.pan}
            onChange={(e) =>
              setMainForm((prev) => ({
                ...prev,
                pan: e.target.value.toUpperCase(),
              }))
            }
            className="mt-1 block w-[90%] h-9 border rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 uppercase"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-[90%] flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
        >
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}
    </div>
  );

  // Render Document Upload
  const renderDocumentUpload = () => (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Upload Documents
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Aadhar Upload */}
        <div className="relative aspect-square bg-blue-50 rounded-lg flex flex-col items-center justify-center hover:bg-blue-100 transition-colors">
          <input
            type="file"
            ref={aadharFileRef}
            onChange={handleFileChange("aadhar")}
            className="hidden"
            accept="image/*,.pdf"
          />
          <img
            src="/assets/Aadhar-Black.svg"
            alt="Aadhar"
            className="w-20 h-20 mb-2"
          />
          <button
            onClick={() => aadharFileRef.current.click()}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-10"
          >
            {files.aadhar ? files.aadhar.name : "Upload Aadhar"}
          </button>
        </div>
      </div>

      <button
        onClick={handleFileUpload}
        disabled={loading || !files.aadhar || !files.pan || !files.bank}
        className="mt-8 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
      >
        {uploadButton}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold font-sans">
            Connect with Cashe
          </h1>
          <img src={CasheImage} alt="Cashe" className="h-12" />
        </div>

        {stage === 1 && renderDeDupeForm()}
        {stage === 2 && (
          <div className="max-w-4xl mx-auto">
            <Steps
              activeStep={activeStep}
              steps={[
                "Personal Details",
                "Address",
                "Employment Details",
                "Loan Details",
              ]}
            />

            <form onSubmit={handleMainFormSubmit} className="mt-8 space-y-6">
              {/* Personal Details Step */}
              {activeStep === 0 && (
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-6">
                    Personal Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="full name"
                        value={mainForm.name}
                        onChange={(e) =>
                          setMainForm((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="mt-1 block w-[90%] h-9 border rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        required
                        placeholder="date of birth"
                        value={mainForm.dob}
                        onChange={(e) =>
                          setMainForm((prev) => ({
                            ...prev,
                            dob: e.target.value,
                          }))
                        }
                        className="mt-1 block w-[90%] h-9 border rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Gender
                      </label>
                      <select
                        required
                        value={mainForm.gender}
                        onChange={(e) =>
                          setMainForm((prev) => ({
                            ...prev,
                            gender: e.target.value,
                          }))
                        }
                        className="mt-1 block w-[90%] h-9 border rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Select Gender</option>
                        {genderOptions.map((option) => (
                          <option key={option} value={option}>
                            {option === "M" ? "MALE" : "FEMALE"}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="mobile number"
                        pattern="^[0-9]{10}$"
                        value={mainForm.phone}
                        onChange={(e) =>
                          setMainForm((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        className="mt-1 block w-[90%] h-9 border rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Address Details Step */}
              {activeStep === 1 && (
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-6">
                    Address Details
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Address Line 1
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="address line 1"
                        value={mainForm.addr}
                        onChange={(e) =>
                          setMainForm((prev) => ({
                            ...prev,
                            addr: e.target.value,
                          }))
                        }
                        className="mt-1 block w-[90%] h-9 border rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Locality
                        </label>
                        <input
                          type="text"
                          required = {true}
                          placeholder="Locality"
                          value={mainForm.locality}
                          onChange={(e) =>
                            setMainForm((prev) => ({
                              ...prev,
                              locality: e.target.value,
                            }))
                          }
                          className="mt-1 block w-[90%] h-9 border rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Pin Code
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="pin code"
                          maxLength={6}
                          pattern="^[0-9]{6}$"
                          value={mainForm.pincode}
                          onChange={(e) =>
                            setMainForm((prev) => ({
                              ...prev,
                              pincode: e.target.value,
                            }))
                          }
                          className="mt-1 block w-[90%] h-9 border rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          City
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="city"
                          value={mainForm.city}
                          onChange={(e) =>
                            setMainForm((prev) => ({
                              ...prev,
                              city: e.target.value,
                            }))
                          }
                          className="mt-1 block w-[90%] h-9 border rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          State
                        </label>
                        <select
                          required
                          value={mainForm.state}
                          onChange={(e) =>
                            setMainForm((prev) => ({
                              ...prev,
                              state: e.target.value,
                            }))
                          }
                          className="mt-1 block w-[90%] h-9 border rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="">Select State</option>
                          {stateOptions.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Employment Details Step */}
              {activeStep === 2 && (
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-6">
                    Employment Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Company Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="company name"
                        value={mainForm.business_details.business_name}
                        onChange={(e) =>
                          setMainForm((prev) => ({
                            ...prev,
                            business_details: {
                              ...prev.business_details,business_name: e.target.value,
                            },
                          }))
                        }
                        className="mt-1 block w-[90%] h-9 border rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Employment Type
                      </label>
                      <select
                        required
                        value={mainForm.employment}
                        onChange={(e) =>
                          setMainForm((prev) => ({
                            ...prev,
                           employment: e.target.value,
                          }))
                        }
                        className="mt-1 block w-[90%] h-9 border rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Select Employment Type</option>
                        {employmentOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Monthly Salary
                      </label>
                      <input
                        type="number"
                        required
                        placeholder="monthly salary"
                        value={mainForm.income}
                        onChange={(e) =>
                          setMainForm((prev) => ({
                            ...prev,
                            income: e.target.value,
                          }))
                        }
                        className="mt-1 block w-[90%] h-9 border rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Salary Received Type
                      </label>
                      <select
                        required
                        value={mainForm.salaryReceivedType}
                        onChange={(e) =>
                          setMainForm((prev) => ({
                            ...prev,
                            salaryReceivedType: e.target.value,
                          }))
                        }
                        className="mt-1 block w-[90%] h-9 border rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Select Salary Type</option>
                        {salaryOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Loan Details Step */}
              {activeStep === 3 && (
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-6">Loan Details</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Loan Amount Required
                      </label>
                      <input
                        type="number"
                        required
                        placeholder="loan amount required"
                        value={mainForm.loanAmount}
                        onChange={(e) =>
                          setMainForm((prev) => ({
                            ...prev,
                            loanAmount: e.target.value,
                          }))
                        }
                        className="mt-1 block w-[90%] h-9 border rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

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
                        I agree to the Terms and Conditions and authorize Cashe
                        to access my credit information.
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={() => setActiveStep((prev) => prev - 1)}
                  disabled={activeStep === 0}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>

                {activeStep === 3 ? (
                  <button
                    type="submit"
                    disabled={loading || !consent}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? "Processing..." : "Submit"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActiveStep((prev) => prev + 1)}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Next
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
        )}
        {stage === 3 && (
          <div className="text-center text-xl text-red-600">
            You are already a customer. Please login directly.
          </div>
        )}
        {stage === 4 && (
          <div className="text-center">
            <h1 className="text-3xl font-light text-green-600">
              Congratulations!
            </h1>
            <p className="text-xl mt-4">
              You're pre-qualified for ₹{response?.payLoad?.amount}
            </p>
            <button
              onClick={() => setStage(5)}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md"
            >
              Continue
            </button>
          </div>
        )}
        {stage === 5 && renderDocumentUpload()}
        {stage === 6 && (
          <div className="text-center text-xl text-red-600">
            Your profile does not meet the eligibility criteria.
          </div>
        )}
        {stage === 7 && (
          <div className="text-center">
            <h1 className="text-3xl font-light text-green-600">
              Application Complete!
            </h1>
            <img
              src="/assets/success.svg"
              alt="Success"
              className="mx-auto mt-6"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CasheForm;
