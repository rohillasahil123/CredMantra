import React, { useState } from 'react';

const BusinessEligibilityForm = () => {
    const [step, setStep] = useState(1); 
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        amountRequired: '',
        gender: 'MALE',
        companyType: 'Proprietorship',
        panNumber: '',
        dob: '',
        businessName: '',
        gstRegistered: 'NO',
        businessAge: '',
        annualTurnover: '',
        residentialPincode: '',
        currentAccount: 'NO'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleNext = (e) => {
        e.preventDefault();
        setStep(step + 1); 
    };

    const handlePrevious = (e) => {
        e.preventDefault();
        setStep(step - 1); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Final Form Data:", formData); 
        
    };

    return (
        <div className="flex flex-col items-center h-auto p-4 bg-sky-300">
            <div className='h-[40vh] text-white w-full rounded-xl text-center bg-red-300'>
                <h1 className='text-4xl'><span className='font-bold'>Business  Loans </span> starting at 10.25%* Interest Rates.</h1>
                <p className='text-lg font-semibold'>Get instant loan approval and disbursal in 24 hours</p>
                <p className='font-semibold'>Minimal Documentation</p>
                <p className='font-semibold'>Lowest interest rate guaranteed*</p>
                <p className='font-semibold'>Now compare pre-qualified offers from 70+ Top Lenders!</p>
            </div>
            <h1 className="text-2xl font-bold text-center mb-2">Check Eligibility</h1>
            <p className="text-center mb-6">Offers from 70+ RBI Approved Lenders</p>

            <div className="w-full max-w-lg bg-white p-6 rounded-md shadow-md">
                <div className="flex justify-between border-b pb-2 mb-4">
                    <button className={`w-1/2 text-center py-2 font-medium ${step === 1 ? 'text-white bg-blue-500' : 'text-gray-500 bg-gray-200'} rounded-l-md`} onClick={() => setStep(1)}>1 Basic Details</button>
                    <button className={`w-1/2 text-center py-2 font-medium ${step === 2 ? 'text-white bg-blue-500' : 'text-gray-500 bg-gray-200'} rounded-r-md`} onClick={() => setStep(2)}>2 Additional Details</button>
                </div>

                <form onSubmit={handleSubmit}>
                    {step === 1 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name:</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter full name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone Number:</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter phone number"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email ID:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter email"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Amount Required:</label>
                                <input
                                    type="number"
                                    name="amountRequired"
                                    value={formData.amountRequired}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter amount"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Gender:</label>
                                <select
                                    name="gender"
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
                                <label className="block text-sm font-medium text-gray-700">Company Type:</label>
                                <select
                                    name="companyType"
                                    value={formData.companyType}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="Proprietorship">Proprietorship</option>
                                    <option value="Partnership">Partnership</option>
                                    <option value="Private Limited">Private Limited</option>
                                    <option value="Public Limited">Public Limited</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">PAN Number:</label>
                                <input
                                    type="text"
                                    name="panNumber"
                                    value={formData.panNumber}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter PAN Number"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">DOB:</label>
                                <input
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Business Name:</label>
                                <input
                                    type="text"
                                    name="businessName"
                                    value={formData.businessName}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter Business Name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Registered for GST?</label>
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
                                <label className="block text-sm font-medium text-gray-700">Business Age (in months):</label>
                                <input
                                    type="number"
                                    name="businessAge"
                                    value={formData.businessAge}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter Business Age"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Annual Turnover:</label>
                                <input
                                    type="number"
                                    name="annualTurnover"
                                    value={formData.annualTurnover}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter Annual Turnover"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Residential Pincode:</label>
                                <input
                                    type="text"
                                    name="residentialPincode"
                                    value={formData.residentialPincode}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter Pincode"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Current Account?</label>
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
    );
};

export default BusinessEligibilityForm;
