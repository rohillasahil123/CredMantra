import axios from "axios";
import React, { useEffect , useState}   from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Profile = () => {
  const [userDetails, setUserDetails] = useState("");
  const [profileCompletion, setProfileCompletion] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const userdata = async () => {
      const token = Cookies.get("userToken");
      const response = await axios.get(
        "https://credmantra.com/api/v1/auth/verify-user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      const data = response.data.data.user
      console.log(data, "response");
      setUserDetails(data);
    };
    userdata();


  }, []);


  const handleEditProfile = ()=>{
    navigate("/editprofile");
  }


  useEffect(() => {
    if (userDetails) {
      const fields = [
        userDetails.name,
        userDetails.last_name,
        userDetails.dob,
        userDetails.gender,
        userDetails.marital_status,
        userDetails.employment,
        userDetails.email,
        userDetails.phone,
        userDetails.pan,
        userDetails.education,
        userDetails.company_name,
        userDetails.residential_type,
        userDetails.residential_pincode,
        userDetails.residential_address,
        userDetails.city,
        userDetails.state,
        userDetails.year_of_residency,
        userDetails.work_exp,
        userDetails.office_pincode,
        userDetails.office_address,
        userDetails.city,
        userDetails.state,
        userDetails.total_year_of_work_exp,
        userDetails.income,
      ];
      
      const filledFields = fields.filter(field => field && field.toString().trim() !== '').length;
      const totalFields = fields.length;
      const percentage = Math.round((filledFields / totalFields) * 100);
      setProfileCompletion(percentage);
    }
  }, [userDetails]);
  
  return (
    <div className="w-[100%] mx-auto bg-white shadow-lg rounded-lg p-5">
      <div className="flex justify-center mb-4 flex-col items-center">
        <h1 className="text-2xl font-semibold">My Profile</h1>
         <div className="flex justify-between w-[80%] mb-1">
           <span className="text-md font-medium text-gray-700">{profileCompletion}%</span>
         </div>
         <div className="w-full bg-gray-200 rounded-full h-2.5">
           <div 
             className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
             style={{ width: `${profileCompletion}%` }}
           ></div>
         </div>
       </div>      
      <hr className="h-px my-8 bg-gray-200 border-b-3" />
      <div className="flex flex-col sm:flex-row justify-around w-[95%] items-center  " style={{justifySelf:"center"}} >
        <div className="sm:h-[40vh] sm:w-[48%] h-[24vh]  w-[90%]">
          <h3 className="font-semibold">Personal Information</h3>
          <div className="items-center">
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3" />
            <div className="flex justify-between w-[85%] ">
              <h1 className="text-gray-600 text-[14px]">First Name</h1>
              <h1 className="text-gray-600 text-[14px]">{userDetails.name}</h1>
            </div>
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3" />
            <div className="flex justify-between w-[85%] ">
              <h1 className="text-gray-600 text-[14px]" >Last Name</h1>
              <h1 className="text-gray-600 text-[14px]"></h1>
            </div>
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3" />
            <div className="flex justify-between w-[85%] ">
              <h1 className="text-gray-600 text-[14px]">Date Of Birth</h1>
              <h1 className="text-gray-600 text-[14px]">{userDetails.dob}</h1>
            </div>
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3" />
            <div className="flex justify-between w-[85%] ">
              <h1 className="text-gray-600 text-[14px]">Gender</h1>
              <h1 className="text-gray-600 text-[14px]">{userDetails.gender}</h1>
            </div>
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3" />
            <div className="flex justify-between w-[85%] ">
              <h1 className="text-gray-600 text-[14px]">Marital Status</h1>
              <h1 className="text-gray-600 text-[14px]"></h1>
            </div>
                <hr className="my-2 bg-gray-200 w-[90%] border-b-3" />
          </div>
        </div>
        <div className=" h-[25vh] sm:h-[40vh]  w-[90%] sm:w-[48%] mt-[5%] sm:mt-[0%]">
          <div className="items-center mt-0 sm:mt-[6%]">
            <div className="flex justify-between w-[85%] ">
              <h1 className="text-gray-600 text-[14px]">Employment Status</h1>
              <h1 className="text-gray-600 text-[14px]">{userDetails.employment}</h1>
            </div>
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3" />
            <div className="flex justify-between w-[85%] ">
              <h1 className="text-gray-600 text-[14px]" >Phone Number</h1>
              <h1 className="text-gray-600 text-[14px]">{userDetails.phone}</h1>
            </div>
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3" />
            <div className="flex justify-between w-[85%] ">
              <h1 className="text-gray-600 text-[14px]">Email Address</h1>
              <h1 className="text-gray-600 text-[14px]">{userDetails.email}</h1>
            </div>
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3" />
            <div className="flex justify-between w-[85%] ">
              <h1 className="text-gray-600 text-[14px]">PAN Card</h1>
              <h1 className="text-gray-600 text-[14px]">{userDetails.pan}</h1>
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
      <div className="flex justify-around flex-col sm:flex-row mt-[4%] w-[95%] items-center"style={{justifySelf:"center"}}>
        <div className="h-[31vh] sm:h-[60vh] w-[90%] sm:w-[48%]">
          <h3 className="font-semibold">Residential Information</h3>
          <div className="items-center">
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3"/>
            <div className="flex justify-between w-[85%]">
              <h1 className="text-gray-600 text-[14px]">Residential Type</h1>
              <h1 className="text-gray-600 text-[14px]"></h1>
            </div>
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3"/>
            <div className="flex justify-between w-[85%]">
              <h1 className="text-gray-600 text-[14px]">Residential Pincode</h1>
              <h1 className="text-gray-600 text-[14px]">{userDetails.pincode}</h1>
            </div>
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3"/>
            <div className="flex justify-between w-[85%]">
              <h1 className="text-gray-600 text-[14px]">Residential Address</h1>
              <h1 className="text-gray-600 text-[14px]"></h1>
            </div>
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3"/>
            <div className="flex justify-between w-[85%]">
              <h1 className="text-gray-600 text-[14px]">City</h1>
              <h1 className="text-gray-600 text-[14px]">{userDetails.city}</h1>
            </div>
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3"/>
            <div className="flex justify-between w-[85%]">
              <h1 className="text-gray-600 text-[14px]">State</h1>
              <h1 className="text-gray-600 text-[14px]">{userDetails.state}</h1>
            </div>
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3"/>
            <div className="flex justify-between w-[85%]">
              <h1 className="text-gray-600 text-[14px]">Year Of Residency</h1>
              <h1 className="text-gray-600 text-[14px]"></h1>
            </div>
          </div>
        </div>
        <hr className="h-px  bg-gray-200 border-b-3"/>
        <div className="h-[33%] sm:h-[60vh] w-[90%] sm:w-[48%]">
          <h3 className="font-semibold">Employer Information</h3>
          <div className="items-center">
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3"/>
            <div className="flex justify-between w-[85%]">
              <h1 className="text-gray-600 text-[14px]">Company's Name</h1>
              <h1 className="text-gray-600 text-[14px]"></h1>
            </div>
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3"/>
            <div className="flex justify-between w-[85%]">
              <h1 className="text-gray-600 text-[14px]">Work exp. at your current company</h1>
              <h1 className="text-gray-600 text-[14px]"></h1>
            </div>
            <hr className="my-2 bg-gray-200 w-[90%] border-b-3"/>
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
              <h1 className="text-gray-600 text-[14px]">{userDetails.income}</h1>
            </div>
          </div>
        </div> 
      </div>
        <button className="bg-blue-600 text-white p-2 mt-[7%] sm:mt-[-7%] h-[5vh] sm:h-[6vh]  w-[80%] sm:w-[10%] ml-[6%] sm:ml-[30%] rounded-md" onClick={handleEditProfile} > Edit Profile</button>
    </div>
  );
};

export default Profile;
