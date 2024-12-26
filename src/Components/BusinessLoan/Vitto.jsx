// VittoLoanForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import panImage from "../../assets/pan-card.png"
import vittoImage from "../../assets/vitto.png"
import plusImage from "../../assets/plus.svg"
import checkImage from "../../assets/fibe_check.svg"
import Cookies from 'js-cookie';

const VittoLoanForm = () => {
    const [stage, setStage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [otpShow, setOtpShow] = useState(false);
    const [token, setToken] = useState('');
    const [panFile, setPanFile] = useState(null);

    const [formData, setFormData] = useState({
        phoneNumber: '',
        otp: '',
        name: '',
        dob: '',
        gender: '',
        maritalStatus: '',
        panNo: '',
        pincode: '',
        address: '',
        employmentType: '',
        workFrequency: '',
        incomeType: '',
        monthlyIncome: '',
        loanOption: '',
        loanReq: '',
        loanAmount: '',
        loanTenure: ''
    });
 
    const options = {
        genderOptions: ['male', 'female'],
        maritalOptions: ['Married', 'Single'],
        empOptions: ['Self_Employed', 'Salaried'],
        wfOptions: ['Regular', 'Seasonal'],
        incomeOptions: ['Daily', 'Monthly', 'Half_Yearly', 'Yearly'],
        loanOptions: ['New_Loan', 'Balance_Transfer'],
        loanReqOptions: ['Within_24_Hrs', 'Next_3_days', 'With_in_a_week', 'More_than_a_week']
    };

    useEffect(() => {
        const getUserData = async () => {
        const savedToken = Cookies.get('userToken');
            if (savedToken) {
                try {
                    const response = await axios.get('https://credmantra.com/api/v1/auth/verify-user', {
                        headers: { Authorization: `Bearer ${savedToken}` }
                    });
                    const { user } = response.data.data;
                    setToken(savedToken)
                    console.log(user)
                    setFormData(prev => ({
                        ...prev,
                        phoneNumber: user.phone,
                        name: user.name,
                        dob: user.dob,
                        panNo: user.pan,
                        pincode: user.pincode,
                        address: user.address,
                        monthlyIncome: user.income
                    }));
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setStage(3);
                }
            }
        };
        getUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleOtpRequest = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('https://credmantra.com/api/v1/partner-api/vitto/register', {
                phoneNumber: '+91-' + formData.phoneNumber
            });
            setOtpShow(true);
            setError('');
        } catch (error) {
            setError('Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

      const handleOtpVerification = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('https://credmantra.com/api/v1/partner-api/vitto/login', {
                phoneNumber: '+91-' + formData.phoneNumber,
                otp: formData.otp
            });
            console.log(response)
            if (response.status === 200) {
                setToken(response.data.token);
                setStage(2);
            } else {
                setError('Invalid OTP');
            }
        } catch (error) {
            setError('OTP verification failed');
        } finally {
            setLoading(false);
        }
    };

    // const handlePanUpload = async () => {
    //     if (!panFile) {
    //         setError('Please select a PAN card image');
    //         return;
    //     }

    //     setLoading(true);
    //     const formDataObj = new FormData();
    //     formDataObj.append('panImage', panFile);
    //     formDataObj.append('userToken', token);

    //     try {
    //         const response = await axios.post('https://credmantra.com/api/v1/partner-api/vitto/pan', formDataObj);
    //         console.log(response.status)
    //         if (response.status === 200) {
    //             setStage(1);
    //         } else {
    //             setError('PAN upload failed');
    //         }
    //     } catch (error) {
    //         setError('Error uploading PAN');
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handlePanUpload = async () => {
        if (!panFile) {
            setError('Please select a PAN card image');
            return;
        }
    
        // Validate file type and size
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!validTypes.includes(panFile.type)) {
            setError('Please upload JPG, JPEG or PNG file only');
            return;
        }
        if (panFile.size > 5 * 1024 * 1024) { 
            setError('File size should be less than 5MB');
            return;
        }
    
        setLoading(true);
        const formDataObj = new FormData();
        formDataObj.append('panImage', panFile);
        formDataObj.append('userToken', token);
    
        try {
            const response = await axios.post('https://credmantra.com/api/v1/partner-api/vitto/pan', 
                formDataObj,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            if (response.status === 200) {
                setStage(4); 
            } else {
                setError('PAN upload failed');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Error uploading PAN');
        } finally {
            setLoading(false);
        }
    };




    const handlePersonalDetailsSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('https://credmantra.com/api/v1/partner-api/vitto/update', {
                ...formData,
                userToken: token
            });
            console.log(token , "tyr");
            console.log(response)
            if (response.status === 200) {
                setStage(3);
            }
        } catch (error) {
            setError('Failed to update details');
        } finally {
            setLoading(false);
        }
    };

    const handleLoanDetailsSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('https://credmantra.com/api/v1/partner-api/vitto/apply', {
                loanCategory: 'HSF',
                loanSubCategory: 'HPL',
                token,
                loanApplicationDetails: {
                    propertyIdentified: 'Yes',
                    employmentType: formData.employmentType,
                    workFrequency: formData.workFrequency,
                    incomeType: formData.incomeType,
                    monthlyIncome: formData.monthlyIncome,
                    loanOption: formData.loanOption,
                    loanReq: formData.loanReq,
                    loanAmount: formData.loanAmount,
                    loanTenure: formData.loanTenure
                }
            });
            if (response.status === 200) {
                setStage(5);
            }
        } catch (error) {
            setError('Failed to submit loan application');
        } finally {
            setLoading(false);
        }
    };

    const renderStage = () => {
        switch (stage) {
            case 2:
                return (
                    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-6">Personal Details</h2>
                        <form onSubmit={handlePersonalDetailsSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder='enter your name'
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Date of Birth</label>
                                    <input
                                        type="date"
                                        name="dob"
                                        placeholder='enter dob'
                                        value={formData.dob}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg"
                                        required
                                    >
                                        <option value="">Select Gender</option>
                                        {options.genderOptions.map(option => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Marital Status</label>
                                    <select
                                        name="maritalStatus"
                                        value={formData.maritalStatus}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg"
                                        required
                                    >
                                        <option value="">Select Marital Status</option>
                                        {options.maritalOptions.map(option => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">PAN Number</label>
                                    <input
                                        type="text"
                                        name="panNo"
                                        placeholder='enter pan number'
                                        value={formData.panNo}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Pincode</label>
                                    <input
                                        type="text"
                                        placeholder='enter pincode'
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg"
                                        required
                                    />
                                </div>

                                <div className="mb-4 md:col-span-2">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                                    <textarea
                                        name="address"
                                        placeholder='enter address'
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg"
                                        rows="3"
                                        required
                                    />
                                </div>
                            </div>

                            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                                disabled={loading}
                            >
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>
                        </form>
                    </div>
                );

               case 4:
                return (
                    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-center mb-6">Upload Documents</h2>
                        <div className="mb-6">
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                <div className="mb-4">
                                    <img
                                        src={panImage}
                                        alt="PAN Card"
                                        className="mx-auto w-32 filter grayscale"
                                    />
                                    <p className="text-gray-600 mt-2">PAN Card</p>
                                </div>
                                <input
                                    type="file"
                                    id="panUpload"
                                    className="hidden "
                                    accept="image/*"
                                    onChange={(e) => setPanFile(e.target.files[0])}
                                />
                                <label
                                    htmlFor="panUpload"
                                    className="cursor-pointer inline-flex items-center justify-center p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    <img src={plusImage} alt="Upload" className="w-8 h-8" />
                                </label>
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                        <button
                            onClick={handlePanUpload}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                            disabled={loading}
                        >
                            {loading ? 'Uploading...' : 'Submit'}
                        </button>
                    </div>
                );

            case 1:
                return (
                    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                        <form onSubmit={otpShow ? handleOtpVerification : handleOtpRequest}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Mobile Number:
                                </label>
                                <input
                                    type="number"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter 10 digit mobile number"
                                    maxLength="10"
                                    disabled={otpShow}
                                    required
                                />
                            </div>

                            {otpShow && (
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        OTP:
                                    </label>
                                    <input
                                        type="number"
                                        name="otp"
                                        value={formData.otp}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter 6 digit OTP"
                                        maxLength="6"
                                        required
                                    />
                                </div>
                            )}

                            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : (otpShow ? 'Verify OTP' : 'Get OTP')}
                            </button>
                        </form>
                    </div>
                );

          

            case 3:
                return (
                    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-6">Loan Details</h2>
                        <form onSubmit={handleLoanDetailsSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Employment Type
                                    </label>
                                    <select
                                        name="employmentType"
                                        value={formData.employmentType}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg"
                                        required
                                    >
                                        <option value="">Select Employment Type</option>
                                        {options.empOptions.map(option => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Work Frequency
                                    </label>
                                    <select
                                        name="workFrequency"
                                        value={formData.workFrequency}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg"
                                        required
                                    >
                                        <option value="">Select Work Frequency</option>
                                        {options.wfOptions.map(option => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Income Type
                                    </label>
                                    <select
                                        name="incomeType"
                                        value={formData.incomeType}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg"
                                        required
                                    >
                                        <option value="">Select Income Type</option>
                                        {options.incomeOptions.map(option => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Monthly Income
                                    </label>
                                    <input
                                        type="number"
                                        name="monthlyIncome"
                                        placeholder='enter monthly Income'
                                        value={formData.monthlyIncome}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Loan Option
                                    </label>
                                    <select
                                        name="loanOption"
                                        value={formData.loanOption}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg"
                                        required
                                    >
                                        <option value="">Select Loan Option</option>
                                        {options.loanOptions.map(option => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Loan Requirement
                                    </label>
                                    <select
                                        name="loanReq"
                                        value={formData.loanReq}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg"
                                        required
                                    >
                                        <option value="">Select Loan Requirement</option>
                                        {options.loanReqOptions.map(option => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Loan Amount
                                    </label>
                                    <input
                                        type="number"
                                        name="loanAmount"
                                        placeholder='enter loan Amount '
                                        value={formData.loanAmount}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Loan Tenure (in months)
                                    </label>
                                    <input
                                        type="number"
                                        name="loanTenure"
                                        placeholder='enter loan Tenure '
                                        value={formData.loanTenure}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg"
                                        required
                                    />
                                </div>
                            </div>

                            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                                disabled={loading}
                            >
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>
                        </form>
                    </div>
                );

            case 5:
                return (
                    <div className="max-w-md mx-auto text-center py-12">
                        <h1 className="text-3xl font-bold text-green-500 mb-4">SUCCESS</h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Congratulations, your application is submitted!
                        </p>
                        <img
                            src={checkImage}
                            alt="Success"
                            className="w-3/4 mx-auto"
                        />
                    </div>
                );

            default:
                return (
                    <div className="max-w-md mx-auto text-center py-12">
                        <h1 className="text-2xl font-bold text-red-500 mb-4">
                            Not eligible for Vitto
                        </h1>
                        <a
                            href="/short-term-loan"
                            className="text-blue-500 hover:text-blue-600 underline"
                        >
                            Try other lenders
                        </a>
                        <img
                            src="/assets/fibe_rej.svg"
                            alt="Rejected"
                            className="w-3/4 mx-auto mt-8"
                        />
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h1 className="text-3xl font-semibold text-gray-900 mb-4 md:mb-0">
                        Connect with Vitto
                    </h1>
                    <img
                        src={vittoImage}
                        alt="Vitto Logo"
                        className="h-12 w-auto"
                    />
                </div>
                {renderStage()}
            </div>
        </div>
    );
};

export default VittoLoanForm;