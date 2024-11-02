import React, { useState } from 'react';

const EligibilityForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        amountRequired: '',
        gender: 'MALE',
        companyType: 'Proprietorship'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Process the form data as needed
    };

    return (
        <div className="flex flex-col items-center h-auto p-4  bg-sky-300">
            <div className='h-[40vh] text-white w-full rounded-xl text-center bg-red-300'>
                <h1 className='text-4xl'><span className='font-bold'>Personal Loans </span> starting at 10.25%* Interest Rates.</h1>
                <p className='text-lg font-semibold'>Get instant loan approval and disbursal in 24 hours</p>
                <p className='font-semibold'>Minimal Documentation</p>
                <p className='font-semibold'>Lowest interest rate guaranteed*</p>
                <p className='font-semibold'>Now compare pre-qualified offers from 70+ Top Lenders!</p>
            </div>
            <h1 className="text-2xl font-bold text-center mb-2">Check Eligibility</h1>

            <p className="text-center mb-6">Offers from 70+ RBI Approved Lenders</p>

            <div className="w-full max-w-lg bg-white p-6 rounded-md shadow-md">
                <div className="flex justify-between border-b pb-2 mb-4">
                    <button className="w-1/2 text-center py-2 font-medium text-white bg-blue-500 rounded-l-md">1 Basic Details</button>
                    <button className="w-1/2 text-center py-2 font-medium text-gray-500 bg-gray-200 rounded-r-md">2 Additional Details</button>
                </div>

                <form onSubmit={handleSubmit}>
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

                    <button
                        type="submit"
                        className="w-full mt-6 py-2 px-4 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                    >
                        Proceed
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EligibilityForm;