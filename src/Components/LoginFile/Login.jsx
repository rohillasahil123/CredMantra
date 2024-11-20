import React, { useState , useEffect } from "react";
import axios from "axios";
import loginImage from "../../assets/Login.avif";
import toast from "react-hot-toast";

const Login = () => {
  const [isOnScreen, setIsOnScreen] = useState(false);
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [phone, setPhone] = useState(""); 
  const [name, setName] = useState(""); 



  const handelChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newotp = [...otp];
      newotp[index] = value; 
      setOtp(newotp);
    }

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handelKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handelVerifyClick = (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    try {
      const result = axios.post("https://credmantra.com/api/v1/auth/verify-otp", {
        phone: phone,
        otp: otpValue
      });  
      if (result.data === otpValue) {
        toast.success("OTP verified successfully");
      }
      else{
        toast.error("Invalid OTP");
      }
    } catch (error) {
      console.error(error);
    }
  }
    

  const handleSendOtpClick = async () => {
    try {
      const response = await axios.post('https://credmantra.com/api/v1/auth/', { phone: phone });
      console.log(response.data);
      setIsOnScreen(true);
      toast.success('OTP sent successfully');
    } catch (error) {
      console.error(error);
      toast.error('Error sending OTP');
    }
  };
  
  return (
    <>
      <div className="md:flex justify-center text-align text-center w-[100%] mx-auto sm:h-[80vh] h-[90vh] space-x-4 bg-sky-300">
        {isOnScreen ? (
          <>
              <div className="h-[5%] sm:h-0 w-full sm:w-0 bg-sky-300"></div>
            <div className="h-[350px] w-[80%] border mt-[100px] bg-white shadow-2xl rounded-xl ml-9 md:ml-0 md:w-[30%] lg:w-[25%]" style={{justifySelf:"center"}}>
              <div className="border h-12 bg-violet-600 rounded-xl ">
                <h1 className="font-bold text-white text-2xl mt-1">OTP</h1>

                <div className="space-x-3 space-y-2">
                  <h4 className="font-bold text-sky-600 mt-[40px]">WELCOME</h4>
                  <h6 className="font-semibold text-xs text-gradient">
                    AUTHORIZATION IS REQUIRED TO YOU <br /> TO GET IN.
                  </h6>
                  {otp.map((value, index) => (
                    <input
                      type="text"
                      className="rounded-full h-12 w-8 border text-center text-xl font-bold"
                      onChange={(e) => handelChange(e, index)}
                      onKeyDown={(e) => handelKeyDown(e, index)}
                      maxLength={1}
                      value={value}
                      id={`otp-input-${index}`}
                    />
                  ))}
                </div>
                <button
                  className="w-[100px] mt-4 bg-sky-600 h-9 mb-2 text-white font-bold rounded-full hover:bg-sky-950"
                  onClick={handelVerifyClick}
                >
                  SUBMIT
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="h-[5%] sm:h-0 w-full sm:w-0 bg-sky-300"></div>
            <div
              className="h-[40%] sm:h-[350px] w-[80%] border ml-7 sm:ml-0 lg:w-[25%] mt-0 sm:mt-[50px] bg-white shadow-xl rounded-xl"
              style={{ marginLeft: "30px" }}
            >
              <div className="border h-12 bg-violet-600 rounded-xl ">
                <h1 className="font-bold text-white mt-1 text-2xl">LOGIN</h1>
              </div>
              <div className="space-y-3 justify-center" style={{ justifyItems: "center" }}>
                <img
                  src={loginImage}
                  alt=""
                  className="object-cover h-[70%] sm:h-[80%] md:h-[60%]  w-[70%] sm:w-[80%] md:w-[70%] p-2 rounded-lg"
                />
              </div>
            </div>
            <div
              className="h-[40%] sm:h-[350px] w-[81%] sm:w-[80%] border mt-[50px] bg-rose-300 shadow-2xl rounded-xl sm:ml-9 lg:w-[25%]"
              style={{ marginLeft: "30px" }}
            >
              <div className="border h-12 bg-violet-600 rounded-xl ">
                <h1 className="font-bold text-white text-2xl mt-1">Welcome</h1>

                <div className="space-x-3 space-y-2">
                  <h4 className="font-bold text-sky-600 mt-[40px]">WELCOME</h4>
                  <h6 className="font-semibold text-xs text-gradient">
                    AUTHORIZATION IS REQUIRED TO YOU <br /> TO GET IN.
                  </h6>
                  <div className="space-y-2">
                    <input
                      type="text"
                      className="h-9 border p-2  rounded w-[90%]"
                      placeholder=" Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      type="text"
                      className="h-9 border p-2 rounded w-[90%]"
                      placeholder=" Mobile Number "
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  className="w-[100px] mt-4 bg-sky-600 h-9 mb-2 text-white font-bold rounded-full hover:bg-sky-950"
                  onClick={handleSendOtpClick}
                >
                  Send Otp
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Login;
