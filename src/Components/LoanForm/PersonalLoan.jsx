import React, { useState } from 'react';

const PersonalLoan = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        amountRequired: '',
        dob: '',
        pincode: '',
        whattodo: '',
        income: '', 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const processedData = {
            ...formData,
            amountRequired: parseFloat(formData.amountRequired),
        };
        console.log(processedData); 
    };

    return (
        <div className="flex flex-col items-center h-auto p-4 bg-sky-300 animate-fade-in">
            <h1 className="text-2xl font-bold text-center mb-2 animate-bounce">Check Eligibility</h1>
            <p className="text-center mb-6 animate-fade-in">Offers from 70+ RBI Approved Lenders</p>
            <div className="w-full max-w-lg bg-white p-6 rounded-md shadow-md animate-slide-up">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name:</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
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
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
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
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
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
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
                                placeholder="Enter amount"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">DOB:</label>
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Pincode:</label>
                            <input
                                type="text"
                                name="pincode" 
                                value={formData.pincode}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
                                placeholder="Enter Pincode"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">What to Do?</label>
                            <select
                                name="whattodo" 
                                value={formData.whattodo}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
                            >
                                <option value="">Select an option</option>
                                <option value="Salaried">Salaried</option>
                                <option value="Self-employed">Self-employed</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Your Income:</label>
                            <input
                                type="text"
                                name="income" 
                                value={formData.income}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
                                placeholder="Enter your income"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-6 py-2 px-4 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105"
                    >
                        Proceed
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PersonalLoan;
