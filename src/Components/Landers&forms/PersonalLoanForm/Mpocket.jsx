import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import MpocketImage from "../../../assets/mpkt.svg"
import toast from 'react-hot-toast';
const Mpocket = () => {
    const[errors , setErrors] = useState({});
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        name: '',
        lastName: '',
        dob: '',
        gender: '',
    });


    useEffect(()=>{
        const filldata =async ()=>{
        const token = Cookies.get("userToken")
        const response = await axios.get("https://credmantra.com/api/v1/auth/verify-user",{
            headers:{
                "Authorization":`Bearer ${token}`,
                "Content-Type": "application/json",
            }
        }) 
        const data = response.data.data.user
        setFormData(data)
        console.log(data , "grt")
        }
        filldata()
    },[])



    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "dob") {
          const birthDate = new Date(value);
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDifference = today.getMonth() - birthDate.getMonth();
          if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
      
          if (age < 18) {
            toast.error("You are not eligible because you are not 18 years old yet.");
            return; 
          }
        }
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const birthdaydate = new Date(formData.dob)
        const today = new Date()
        let age = today.getFullYear() - birthdaydate.getFullYear()
        const monthDifference = today.getMonth() - birthdaydate.getMonth()
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate()
            < birthdaydate.getDate())) {
        age--
        }
        if (age < 18) {
            toast.error("You are not eligible because you are not 18 years old yet.");
            return;
            }
        const dedupeReq = { mobileNumber: formData.phone, email: formData.email };
        const leadReq = {
            email_id: formData.email,
            mobile_no: formData.phone,
            full_name: formData.firstName + " " + formData.lastName,
            date_of_birth: formData.dob,
            gender: formData.gender.toLowerCase(),
            profession: "salaried",
        };

        try {
            const response = await axios.post('/api/submit', { dedupeReq, leadReq });
            console.log('API Response:', response.data);
        } catch (error) {
            console.error('API Error:', error);
        }
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
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                         className={`w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="Email"
                        required
                    />
                    {
                        errors.email && <p className="text-red-500 text-sm">{errors.email}</p>
                    }
                </div>
                <div className="mb-4">
                    <input
                        type="tel"
                        name="phone"
                        maxLength={10}
                        pattern="\d*"
                         inputMode="numeric"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border ${errors.phone ? "border-red-500" : "border-gray-300"} border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="Phone"
                        required
                    />
                    {
                        errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>
                    }
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border ${errors.name ? "border-red-red" : "border-gray-300"} border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="First Name"
                        required
                    />
                    {
                    errors.name && <p className="text-red-500 text-sm">{errors.name}</p>
                    }
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
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                        className={`w-full px-3 py-2 border ${errors.dob ? "border-red-500" : "border-gray-300"} border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {
                        errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>
                    }
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