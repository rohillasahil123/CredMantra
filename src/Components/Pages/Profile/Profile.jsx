import React from "react";

const Profile = () => {
  return (
    <div className="w-[100%] mx-auto bg-white shadow-lg rounded-lg p-5">
      <div className="flex justify-center mb-4">
        <h1 className="text-2xl font-semibold">My Profile</h1>
      </div>
      <hr className="h-px my-8 bg-gray-200 border-b-3" />
      <div className="flex flex-col sm:flex-row justify-around w-[95%] items-center  " style={{justifySelf:"center"}} >
        <div className="sm:h-[40vh] sm:w-[48%] h-[24vh]  w-[90%]">
          <h3 className="font-semibold">Personal Information</h3>
          <div className="items-center">
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3" />
            <div className="flex justify-between w-[85%] ">
              <h1 className="text-gray-600 text-[14px]">First Name</h1>
              <h1 className="text-gray-600 text-[14px]"></h1>
            </div>
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3" />
            <div className="flex justify-between w-[85%] ">
              <h1 className="text-gray-600 text-[14px]" >Last Name</h1>
              <h1 className="text-gray-600 text-[14px]"></h1>
            </div>
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3" />
            <div className="flex justify-between w-[85%] ">
              <h1 className="text-gray-600 text-[14px]">Date Of Birth</h1>
              <h1 className="text-gray-600 text-[14px]"></h1>
            </div>
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3" />
            <div className="flex justify-between w-[85%] ">
              <h1 className="text-gray-600 text-[14px]">Gender</h1>
              <h1 className="text-gray-600 text-[14px]"></h1>
            </div>
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3" />
            <div className="flex justify-between w-[85%] ">
              <h1 className="text-gray-600 text-[14px]">Marital Status</h1>
              <h1 className="text-gray-600 text-[14px]"></h1>
            </div>
          </div>
        </div>
        <div className=" h-[25vh] sm:h-[40vh]  w-[90%] sm:w-[48%]">
          <div className="items-center mt-0 sm:mt-[6%]">
            <div className="flex justify-between w-[85%] ">
              <h1 className="text-gray-600 text-[14px]">Employment Status</h1>
              <h1 className="text-gray-600 text-[14px]"></h1>
            </div>
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3" />
            <div className="flex justify-between w-[85%] ">
              <h1 className="text-gray-600 text-[14px]" >Phone Number</h1>
              <h1 className="text-gray-600 text-[14px]"></h1>
            </div>
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3" />
            <div className="flex justify-between w-[85%] ">
              <h1 className="text-gray-600 text-[14px]">Email Address</h1>
              <h1 className="text-gray-600 text-[14px]"></h1>
            </div>
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3" />
            <div className="flex justify-between w-[85%] ">
              <h1 className="text-gray-600 text-[14px]">PAN Card</h1>
              <h1 className="text-gray-600 text-[14px]"></h1>
            </div>
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3" />
            <div className="flex justify-between w-[85%] ">
              <h1 className="text-gray-600 text-[14px]">Educational Qualification</h1>
              <h1 className="text-gray-600 text-[14px]"></h1>
            </div>
          </div>
        </div>
      </div>
      <hr className=" bg-gray-200 border-b-3" />   
      <div className="flex justify-around flex-col sm:flex-row  mt-[4%] w-[95%] items-center  " style={{justifySelf:"center"}} >
        <div className="h-[31vh] sm:h-[60vh] w-[90%] sm:w-[48%]">
          <h3 className="font-semibold">Residential Information</h3>
          <div className="items-center">
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3" />
            <div className="flex justify-between w-[85%] ">
              <h1 className="text-gray-600 text-[14px]">Residential Type</h1>
              <h1 className="text-gray-600 text-[14px]"></h1>
            </div>
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3" />
            <div className="flex justify-between w-[85%] ">
              <h1 className="text-gray-600 text-[14px]" >Residential Pincode</h1>
              <h1 className="text-gray-600 text-[14px]"></h1>
            </div>
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3" />
            <div className="flex justify-between w-[85%] ">
              <h1 className="text-gray-600 text-[14px]">Residential Address</h1>
              <h1 className="text-gray-600 text-[14px]"></h1>
            </div>
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3" />
            <div className="flex justify-between w-[85%] ">
              <h1 className="text-gray-600 text-[14px]">City</h1>
              <h1 className="text-gray-600 text-[14px]"></h1>
            </div>
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3" />
            <div className="flex justify-between w-[85%] ">
              <h1 className="text-gray-600 text-[14px]">State</h1>
              <h1 className="text-gray-600 text-[14px]"></h1>
            </div>
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3" />
            <div className="flex justify-between w-[85%] ">
              <h1 className="text-gray-600 text-[14px]">Year Of Residency</h1>
              <h1 className="text-gray-600 text-[14px]"></h1>
            </div>
          </div>
        </div>
        <hr className="h-px  bg-gray-200 border-b-3" />
        <div className="h-[33%] sm:h-[60vh] w-[90%] sm:w-[48%]">
          <h3 className="font-semibold">Employer Information</h3>
          <div className="items-center">
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3" />
            <div className="flex justify-between w-[85%] ">
              <h1 className="text-gray-600 text-[14px]">Company's Name</h1>
              <h1 className="text-gray-600 text-[14px]"></h1>
            </div>
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3" />
            <div className="flex justify-between w-[85%] ">
              <h1 className="text-gray-600 text-[14px]" >Work exp. at your current company</h1>
              <h1 className="text-gray-600 text-[14px]"></h1>
            </div>
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3" />
            <div className="flex justify-between w-[85%] ">
              <h1 className="text-gray-600 text-[14px]">Office Pincode</h1>
              <h1 className="text-gray-600 text-[14px]"></h1>
            </div>
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3" />
            <div className="flex justify-between w-[85%] ">
              <h1 className="text-gray-600 text-[14px]">Office Address</h1>
              <h1 className="text-gray-600 text-[14px]"></h1>
            </div>
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3" />
            <div className="flex justify-between w-[85%] ">
              <h1 className="text-gray-600 text-[14px]">City</h1>
              <h1 className="text-gray-600 text-[14px]"></h1>
            </div>
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3" />
            <div className="flex justify-between w-[85%] ">
              <h1 className="text-gray-600 text-[14px]">State</h1>
              <h1 className="text-gray-600 text-[14px]"></h1>
            </div>
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3" />
            <div className="flex justify-between w-[85%] ">
              <h1 className="text-gray-600 text-[14px]">Total year of work exp.</h1>
              <h1 className="text-gray-600 text-[14px]"></h1>
            </div>
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3" />
            <div className="flex justify-between w-[85%] ">
              <h1 className="text-gray-600 text-[14px]">Monthly Income</h1>
              <h1 className="text-gray-600 text-[14px]"></h1>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Profile;
