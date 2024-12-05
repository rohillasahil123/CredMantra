import React, { useState, useEffect } from "react";
import axios from "axios";
import loginImage from "../../../assets/Login.avif";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import EligibleLendersService from "../../EligibleLendersService/EligibleLendersService";

const Login = () => {
  const [isOnScreen, setIsOnScreen] = useState(false);
  const [isCountdownComplete, setIsCountdownComplete] = useState(false);
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [retryCount, setRetryCount] = useState(0);
  const [isLoader, setIsLoader] = useState(false);

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


  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length < 4) {
      toast.error("Please enter a valid 4-digit OTP.");
      return;
    }
    setIsLoader(true);
    try {
      const response = await axios.post("https://credmantra.com/api/v1/auth/verify-otp", {
        phone: phone,
        otp: otpValue,
      }, {
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.data.type === "success") {
        const { token, userId } = response.data.data;
        Cookies.set("userToken", token, { secure: true, sameSite: "Strict", expires: 1 });
        Cookies.set("userId", userId, { secure: true, sameSite: "Strict", expires: 1 });
        toast.success("OTP verified successfully!");       
            navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Failed to verify OTP. Please try again.");
    } finally {
      setIsLoader(false);
    }
 
  };


  const handleSendOtpClick = async () => {
     setIsLoader(true);
    try {
      const response = await axios.post("https://credmantra.com/api/v1/auth/", {
        phone: phone,
      });
      console.log(response.data);
      setIsOnScreen(true);
      toast.success("OTP sent successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error sending OTP");
    }
  };

  const isOtpFilled = otp.every((value) => value !== "");

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsCountdownComplete(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [retryCount]);

  const handleResendOtp = () => {
    if (retryCount < 5) {
      try {
        const response = axios.post("https://credmantra.com/api/v1/auth/resend-otp",{
          phone: phone
        })
        console.log(response)
        toast.success(`OTP resent successfully your number ${phone}`);
      } catch (error) {
        toast.error(error);
        console.log(error)
      }
      setCountdown(60);
      setIsCountdownComplete(false);
      setOtp(new Array(4).fill(""));
      setRetryCount((prev) => prev + 1);
    } else {
      toast.error("You have exceeded the maximum OTP resend attempts.");
    }
  };

  return (
    <>
      <div className="md:flex justify-center text-align text-center w-[100%] mx-auto sm:h-[80vh] h-[90vh] space-x-4 bg-sky-300">
        {isOnScreen ? (
          <>
            <div className="h-[5%] sm:h-0 w-full sm:w-0 bg-sky-300"></div>
            <div
              className="h-[350px] w-[80%] border mt-[100px] bg-white shadow-2xl rounded-xl ml-9 md:ml-0 md:w-[30%] lg:w-[25%]"
              style={{ justifySelf: "center" }}
            >
              <div className="border h-12 bg-violet-600 rounded-xl ">
                <h1 className="font-bold text-white text-2xl mt-1">OTP</h1>

                <div className="space-x-3 space-y-2">
                  <h4 className="font-bold text-sky-600 mt-[40px]">WELCOME</h4>
                  <h6 className="font-semibold text-xs text-gradient">
                    AUTHORIZATION IS REQUIRED TO YOU <br /> TO GET IN.
                  </h6>
                  {otp.map((value, index) => (
                    <input
                      key={index}
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
                {isCountdownComplete && !isOtpFilled ? (
                  <button
                    className="w-[100px] mt-4 bg-red-600 h-9 mb-2 text-white font-bold rounded-full hover:bg-red-800"
                    onClick={handleResendOtp}
                  >
                    Resend OTP
                  </button>
                ) : (
                  <button
                    className={`w-[100px] mt-4 ${
                      isOtpFilled
                        ? "bg-green-600 hover:bg-green-800"
                        : "bg-gray-400 cursor-not-allowed"
                    } h-9 mb-2 text-white font-bold rounded-full`}
                    onClick={handleVerifyOtp}
                    disabled={!isOtpFilled}
                  >
                    Submit
                  </button>
                )}

                <h6 className="font-semibold text-xs text-gradient">
                  {countdown > 0 ? `Resend Your OTP in ${countdown}s` : ""}
                </h6>
                <p className="text-xs text-gray-500 mt-2">
                  {retryCount < 5
                    ? `You have ${5 - retryCount} OTP resend attempts left.`
                    : "You have exceeded the maximum OTP resend attempts."}
                </p>
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
              <div
                className="space-y-3 justify-center"
                style={{ justifyItems: "center" }}
              >
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
                      maxLength={10}
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                {isLoader ? (
                  <>
                    <div className="w-10 h-10 ml-[42%] mt-[6%] border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <h1 className="text-sm font-bold mt-2 text-white">
                      Wait a few seconds
                    </h1>
                  </>
                ) : (
                  <button
                    className="w-[100px] mt-4 bg-sky-600 h-9 mb-2 text-white font-bold rounded-full hover:bg-sky-950"
                    onClick={handleSendOtpClick}
                  >
                    Send Otp
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Login;