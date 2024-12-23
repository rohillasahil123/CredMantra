import React, { useState } from 'react'

const Editprofile = () => {


    const [formData, setFormData] = React.useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        maritalStatus: '',
        employmentStatus: '',
        phoneNumber: '',
        emailAddress: '',
        panCard: '',
        educationalQualification: '',
        residentialType: '',
        residentialPincode: '',
        residentialAddress: '',
        residentialCity: '',
        residentialState: '',
        yearOfResidency: '',
        companyName: '',
        workExperience: '',
        officePincode: '',
        officeAddress: '',
        officeCity: '',
        officeState: '',
        totalWorkExperience: '',
        monthlyIncome: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleSubmit = () => {
        // Add your save logic here
        console.log('Form data:', formData);
    };


    return (
        <div className="w-[100%] h-[190vh] sm:h-[170vh] mx-auto bg-white shadow-lg rounded-lg p-5 space-y-4 ">
            <div className="flex justify-center mb-4 flex-col items-center">
                <h1 className="text-2xl font-semibold">My Profile</h1>
            </div>
            <hr className="h-px my-8 bg-gray-200 border-b-3" />
            <div className="flex flex-col sm:flex-row justify-around w-[95%] items-center    " style={{ justifySelf: "center" }} >
                <div className="sm:h-[40vh] sm:w-[48%] h-[24vh]  w-[100%]">
                    <h3 className="font-semibold">Personal Information</h3>
                    <div className="items-center space-y-1 ">
                        <div className=" w-[100%] sm:w-[85%] ">
                            <h1 className="text-gray-600 font-semibold text-[14px]">First Name:</h1>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className='border-2 h-9 w-[95%] rounded-md p-2 '
                                placeholder='Enter your first name' />
                        </div>
                        <div className=" sm:w-[85%] w-[100%] ">
                            <h1 className="text-gray-600 font-semibold text-[14px]" >Last Name</h1>
                            <input
                             type="text"
                             name="lastName"
                             value={formData.lastName}
                             onChange={handleChange}
                              className='border-2  h-9 w-[95%] rounded-md p-2'
                               placeholder='Enter your Last name' />
                        </div>
                        <div className=" sm:w-[85%] w-[100%] ">
                            <h1 className="text-gray-600   font-semibold text-[14px]" >Date Of Birth</h1>
                            <input 
                            type="text" 
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            className='border-2  h-9 w-[95%] rounded-md p-2'
                             placeholder='Enter your dob' />
                        </div>
                        <div className=" w-[100%] sm:w-[85%] ">
                            <h1 className="text-gray-600 font-semibold text-[14px]" >Gender</h1>
                            <input 
                            type="text"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                             className='border-2  h-9 w-[95%] rounded-md p-2'
                              placeholder='Enter your gender' />
                        </div>
                        <div className=" w-[100%] sm:w-[85%] ">
                            <h1 className="text-gray-600 font-semibold text-[14px]" >Marital Status</h1>
                            <input 
                            type="text"
                            name="maritalStatus"
                            value={formData.maritalStatus}
                            onChange={handleChange}
                             className='border-2  h-9 w-[95%] rounded-md p-2'
                              placeholder='Enter your marital status' />
                        </div>

                    </div>
                </div>
                <div className=" h-[25vh] sm:h-[40vh]  w-[99%] sm:w-[48%] mt-[33%] sm:mt-[0%] space-y-1">
                    <div className="items-center mt-0 sm:mt-[6%] space-y-1  ">
                        <div className=" sm:w-[85%] w-[100%] ">
                            <h1 className="text-gray-600 font-semibold text-[14px]" >Employment Status</h1>
                            <input 
                            type="text"
                            name="employmentStatus"
                            value={formData.employmentStatus}
                            onChange={handleChange}
                             className='border-2  h-9 w-[95%] rounded-md p-2'
                              placeholder='Enter your employment status' />
                        </div>
                        <div className=" w-[100%] sm:w-[85%] ">
                            <h1 className="text-gray-600 font-semibold text-[14px]" >Phone Number</h1>
                            <input 
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                             className='border-2  h-9 w-[95%] rounded-md p-2'
                              placeholder='Enter your phone' />
                        </div>
                        <div className=" w-[100%] sm:w-[85%] ">
                            <h1 className="text-gray-600 font-semibold text-[14px]" >Email Address</h1>
                            <input 
                            type="text"
                            name="emailAddress"
                            value={formData.emailAddress}
                            onChange={handleChange}
                            className='border-2  h-9 w-[95%] rounded-md p-2'
                            placeholder='Enter your email' />
                        </div>
                        <div className=" w-[100%] sm:w-[85%] ">
                            <h1 className="text-gray-600 font-semibold text-[14px]" >PAN Card</h1>
                            <input 
                            type="text"
                            name="panCard"
                            value={formData.panCard}
                            onChange={handleChange}
                            className='border-2  h-9 w-[95%] rounded-md p-2'
                                placeholder='Enter your pan card' />
                        </div>
                        <div className=" sm:w-[85%] w-[100%] ">
                            <h1 className="text-gray-600 font-semibold text-[14px]" >Educational Qualification</h1>
                            <input 
                            type="text"
                            name="educationalQualification"
                            value={formData.educationalQualification}
                            onChange={handleChange}
                             className='border-2  h-9 w-[95%] rounded-md p-2'
                              placeholder='Enter your educational qualification' />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-around  flex-col sm:flex-row mt-[4%] mr-[2%] sm:mr-[0%] w-[95%] items-center" style={{ justifySelf: "center" }}>
            <div className="h-[33%] sm:h-[60vh] w-[100%] sm:w-[48%] mt-[20%] sm:mt-[9%] ">
                    <h3 className="font-semibold">Employer Information</h3>
                    <div className="items-center space-y-1">

                        <div className=" w-[100%] sm:w-[85%] ">
                            <h1 className="text-gray-600 font-semibold text-[14px]" >Company's Name</h1>
                            <input 
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                             className='border-2  h-9 w-[95%] rounded-md p-2'
                              placeholder='Enter your Company Name' />
                        </div>

                        <div className=" w-[100%] sm:w-[85%] ">
                            <h1 className="text-gray-600 font-semibold text-[14px]" >Work exp. at your current company</h1>
                            <input 
                            type="text"
                            name="workExperience"
                            value={formData.workExperience}
                            onChange={handleChange}
                             className='border-2  h-9 w-[95%] rounded-md p-2'
                              placeholder='Enter your Work exp. at your current company' />
                        </div>

                        <div className=" w-[100%] sm:w-[85%] ">
                            <h1 className="text-gray-600 font-semibold text-[14px]" >Office Pincode</h1>
                            <input 
                            type="text"
                            name="officePincode"
                            value={formData.officePincode}
                            onChange={handleChange}
                             className='border-2  h-9 w-[95%] rounded-md p-2'
                              placeholder='Enter your Office Pincode' />
                        </div>

                        <div className=" w-[100%] sm:w-[85%] ">
                            <h1 className="text-gray-600 font-semibold text-[14px]" >Office Address</h1>
                            <input 
                            type="text"
                            name="officeAddress"
                            value={formData.officeAddress}
                            onChange={handleChange}
                             className='border-2  h-9 w-[95%] rounded-md p-2'
                              placeholder='Enter your Office Address' />
                        </div>

                        <div className=" w-[100%] sm:w-[85%] ">
                            <h1 className="text-gray-600 font-semibold text-[14px]" >Office City</h1>
                            <input 
                            type="text"
                            name="officeCity"
                            value={formData.officeCity}
                            onChange={handleChange}
                             className='border-2  h-9 w-[95%] rounded-md p-2'
                              placeholder='Enter your Office City' />
                        </div>

                        <div className=" w-[100%] sm:w-[85%] ">
                            <h1 className="text-gray-600 font-semibold text-[14px]" >Office State</h1>
                            <input 
                            type="text" 
                            name="officeState"
                            value={formData.officeState}
                            onChange={handleChange}
                             className='border-2  h-9 w-[95%] rounded-md p-2'
                              placeholder='Enter your Office State  ' />
                        </div>

                        <div className=" w-[100%] sm:w-[85%] ">
                            <h1 className="text-gray-600 font-semibold text-[14px]" >Total year of work exp.</h1>
                            <input 
                            type="text"
                            name="totalWorkExperience"
                            value={formData.totalWorkExperience}
                            onChange={handleChange}
                             className='border-2  h-9 w-[95%] rounded-md p-2'
                              placeholder='Enter your Total year of work exp.' />
                        </div>

                        <div className=" w-[100%] sm:w-[85%] ">
                            <h1 className="text-gray-600 font-semibold text-[14px]" >Monthly Income</h1>
                            <input 
                            type="text"
                            name="monthlyIncome"
                            value={formData.monthlyIncome}
                            onChange={handleChange}
                             className='border-2  h-9 w-[95%] rounded-md p-2'
                              placeholder='Enter your Monthly Income' />
                        </div>
                    </div>
                </div>
                <div className="h-[31vh] sm:h-[60vh] w-[99%] sm:w-[48%] sm:mt-[9%] ml-[2%]  ">
                    <h3 className="font-semibold">Residential Information</h3>
                    <div className="items-center space-y-1">

                        <div className=" sm:w-[85%] w-[100%] ">
                            <h1 className="text-gray-600 font-semibold text-[14px]" >Residential Type</h1>
                            <input 
                            type="text"
                            name="residentialType"
                            value={formData.residentialType}
                            onChange={handleChange}
                             className='border-2  h-9 w-[95%] rounded-md p-2'
                              placeholder='Enter your residential type' />
                        </div>
                        <div className=" sm:w-[85%] w-[100%] ">
                            <h1 className="text-gray-600 font-semibold text-[14px]" >Residential Pincode</h1>
                            <input
                             type="text"
                             name="residentialPincode"
                             value={formData.residentialPincode}
                             onChange={handleChange}
                              className='border-2  h-9 w-[95%] rounded-md p-2'
                               placeholder='Enter your Residential pincode' />
                        </div>

                        <div className=" sm:w-[85%] w-[100%] ">
                            <h1 className="text-gray-600 font-semibold text-[14px]" >Residential Address</h1>
                            <input 
                            type="text"
                            name="residentialAddress"
                            value={formData.residentialAddress}
                            onChange={handleChange}
                             className='border-2  h-9 w-[95%] rounded-md p-2'
                              placeholder='Enter your Residential Address' />
                        </div>

                        <div className=" sm:w-[85%] w-[100%] ">
                            <h1 className="text-gray-600 font-semibold text-[14px]" >Residential City</h1>
                            <input 
                            type="text"
                            name="residentialCity"
                            value={formData.residentialCity}
                            onChange={handleChange}
                             className='border-2  h-9 w-[95%] rounded-md p-2'
                              placeholder='Enter your Residential City' />
                        </div>

                        <div className=" sm:w-[85%] w-[100%] ">
                            <h1 className="text-gray-600 font-semibold text-[14px]" >Residential State</h1>
                            <input 
                            type="text"
                            name="residentialState"
                            value={formData.residentialState}
                            onChange={handleChange}
                             className='border-2  h-9 w-[95%] rounded-md p-2'
                              placeholder='Enter your Residential State' />
                        </div>

                        <div className=" sm:w-[85%] w-[100%] ">
                            <h1 className="text-gray-600 font-semibold text-[14px]" >Year Of Residency</h1>
                            <input 
                            type="text"
                            name="yearOfResidency"
                            value={formData.yearOfResidency}
                            onChange={handleChange}
                             className='border-2  h-9 w-[95%] rounded-md p-2'
                              placeholder='Enter your Year Of Residency' />
                        </div>
                    </div>
                </div>
                <hr className="h-px  bg-gray-200 border-b-3" />
              
            </div>
            <div className="flex sm:ml-[55%] sm:mt-8  ">
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 h-[5vh] w-[90%] sm:w-[30%]  ml-[2.3%]  hover:bg-blue-700 text-white sm:mt-[10%] mt-[30%] font-bold text-center    rounded"
                >
                    Save Profile
                </button>
            </div>
        </div>
    )
}

export default Editprofile