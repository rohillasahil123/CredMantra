import React, { useState } from "react";
import axios from "axios";
import loginImage from "../../assets/Login.avif";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const baseUrl = "https://credmantra.com/api/v1/";
const signUpUrl = `${baseUrl}auth/`;

const Login = () => {
  const [isOnScreen, setIsOnScreen] = useState(false);
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

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

  const handelClick = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    try {
      const response = await axios.post(`${signUpUrl}verify-otp`, { phone, otp: otpValue });
      toast.success("OTP Verified Successfully!", response.data);
      navigate("/dashboard"); 
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("OTP Verification Failed!");
    }
  };

  const handleSendOtpClick = async () => {
    try {
      const response = await axios.post(signUpUrl, { phone });
      toast.success("OTP Sent Successfully!", response.data);
      setIsOnScreen(true); 
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to Send OTP!");
    }
  };

  return (
    <div className="md:flex justify-center text-center w-full mx-auto sm:h-[80vh] h-[90vh] space-x-4 bg-sky-300">
      {isOnScreen ? (
        <div className="h-[350px] w-[80%] border mt-[100px] bg-white shadow-2xl rounded-xl md:w-[30%] lg:w-[25%]">
          <div className="border h-12 bg-violet-600 rounded-xl">
            <h1 className="font-bold text-white text-2xl mt-1">OTP</h1>
          </div>
          <div className="space-x-3 space-y-2">
            <h4 className="font-bold text-sky-600 mt-[40px]">WELCOME</h4>
            <h6 className="font-semibold text-xs">
              AUTHORIZATION IS REQUIRED TO GET IN.
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
                key={index}
              />
            ))}
          </div>
          <button
            className="w-[100px] mt-4 bg-sky-600 h-9 mb-2 text-white font-bold rounded-full hover:bg-sky-950"
            onClick={handelClick}
          >
            SUBMIT
          </button>
        </div>
      ) : (
        <div className="h-[40%] sm:h-[350px] w-[80%] border bg-white shadow-xl rounded-xl sm:ml-0 lg:w-[25%] mt-[50px]">
          <div className="border h-12 bg-violet-600 rounded-xl">
            <h1 className="font-bold text-white mt-1 text-2xl">LOGIN</h1>
          </div>
          <div className="space-y-3 justify-center">
            <img
              src={loginImage}
              alt="Login"
              className="object-cover h-[80%] w-[70%] p-2 rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <input
              type="text"
              className="h-9 border p-2 rounded w-[90%]"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className="h-9 border p-2 rounded w-[90%]"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <button
            className="w-[100px] mt-4 bg-sky-600 h-9 mb-2 text-white font-bold rounded-full hover:bg-sky-950"
            onClick={handleSendOtpClick}
          >
            Send OTP
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
