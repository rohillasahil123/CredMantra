import React, { useState } from 'react';
import axios from 'axios';
import MpocketImage from "../../assets/mpkt.svg"
const Mpocket = () => {
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
            console.log(formData)
        // const dedupeReq = { mobileNumber: formData.phone, email: formData.email };
        // const leadReq = {
        //     email_id: formData.email,
        //     mobile_no: formData.phone,
        //     full_name: formData.firstName + " " + formData.lastName,
        //     date_of_birth: formData.dob,
        //     gender: formData.gender.toLowerCase(),
        // //     profession: "salaried",
        // };

        // try {
        //     const response = await axios.post('/api/submit', { dedupeReq, leadReq });
        //     console.log('API Response:', response.data);
        // } catch (error) {
        //     console.error('API Error:', error);
        // }
    };

    return (
        <>
            <div className="flex flex-col md:flex-row justify-around w-[90%] items-center mb-8">
                <h1 className="text-2xl font-semibold mb-5">Connect with Mpocket</h1>
                <img src={MpocketImage} alt="Mpocket" className="h-12" />
            </div>
        <form className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
            <div className="mb-4">
                <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
            </div>
            <div className="mb-4">
                <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    required
                />
            </div>
            <div className="mb-4">
                <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                />
            </div>
            <div className="mb-4">
                <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                />
            </div>
            <div className="mb-4">
                <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-4">
                <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <button
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                type="submit"
            >
                Submit
            </button>
        </form>
       
        </>
    );
};


export default Mpocket;