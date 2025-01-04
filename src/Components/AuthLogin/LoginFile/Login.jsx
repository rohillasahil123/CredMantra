import React, { useState, useEffect } from "react";
import axios from "axios";
import loginImage from "../../../assets/LoginGirl4.jpg";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

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
      const response = await axios.post(
        "https://credmantra.com/api/v1/auth/verify-otp",
        {
          phone: phone,
          otp: otpValue,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.data.type === "success") {
        const { token, userId } = response.data.data;
        Cookies.set("userToken", token, {
          secure: true,
          sameSite: "Strict",
          expires: 1,
        });
        Cookies.set("userId", userId, {
          secure: true,
          sameSite: "Strict",
          expires: 1,
        });
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
      if (name) {
        Cookies.set("userName", name, { expires: 7 });
      }
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

  const handleResendOtp = async () => {
    if (retryCount < 5) {
      try {
        const response = await axios.post(
          "https://credmantra.com/api/v1/auth/resend-otp",
          {
            phone: phone,
          }
        );
        console.log(response);
        toast.success(`OTP resent successfully your number ${phone}`);
      } catch (error) {
        toast.error(error);
        console.log(error);
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
      <div className="relative w-full h-[100vh]  overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <img
            src={loginImage}
            alt="Background"
            className="w-full h-full object-cover "
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
        <div className="relative flex right-0 sm:right-[24%]  justify-center items-center h-full overflow-y-auto  ">
          <div
            className="max-h-full w-[90%] sm:w-[70%] md:w-[50%] lg:w-[35%] xl:w-[30%] 2xl:w-[25%] rounded-xl p-6 space-y-4 overflow-y-auto shadow-[0_0_30px_15px_rgba(255,192,203,0.5)]">
            {isOnScreen ? (
              <>
                <div className="bg-violet-600 text-white text-center py-3 rounded-t-xl">
                  <h1 className="font-bold text-lg md:text-2xl">OTP</h1>
                </div>
                <div className="text-center space-y-2">
                  <h4 className="font-bold text-sky-600 text-lg">WELCOME</h4>
                  <h6 className="font-medium text-xs md:text-sm">
                    AUTHORIZATION IS REQUIRED TO YOU <br /> TO GET IN.
                  </h6>
                </div>
                <div className="flex justify-center space-x-3">
                  {otp.map((value, index) => (
                    <input
                      key={index}
                      id={`otp-input-${index}`}
                      type="text"
                      className="h-12 w-10 border text-center text-xl font-bold rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => handelChange(e, index)}
                      onKeyDown={(e) => handelKeyDown(e, index)}
                      maxLength={1}
                      value={value}
                    />
                  ))}
                </div>
                <div className="text-center space-y-2">
                  {isCountdownComplete && !isOtpFilled ? (
                    <button
                      className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full"
                      onClick={handleResendOtp}
                    >
                      Resend OTP
                    </button>
                  ) : (
                    <button
                      className={`${
                        isOtpFilled
                          ? "bg-green-600 hover:bg-green-800"
                          : "bg-gray-400 cursor-not-allowed"
                      } text-white font-bold py-2 px-4 rounded-full`}
                      onClick={handleVerifyOtp}
                      disabled={!isOtpFilled}
                    >
                      Submit
                    </button>
                  )}
                  {countdown > 0 && (
                    <p className="text-sm text-gray-500">{`Resend your OTP in ${countdown}s`}</p>
                  )}
                  <p className="text-xs text-gray-400">
                    {retryCount < 5
                      ? `You have ${5 - retryCount} OTP resend attempts left.`
                      : "You have exceeded the maximum OTP resend attempts."}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-violet-600 text-white text-center py-3 rounded-t-xl">
                  <h1 className="font-bold text-lg md:text-2xl">LOGIN</h1>
                </div>
                <div className="text-center space-y-2">
                  <h4 className="font-bold text-sky-600 text-lg">WELCOME</h4>
                  <h6 className="font-medium text-white text-xs md:text-sm">
                    AUTHORIZATION IS REQUIRED TO YOU <br /> TO GET IN.
                  </h6>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    className="h-10 w-full border rounded px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="text"
                    className="h-10 w-full border rounded px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Mobile Number"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="text-center">
                  {isLoader ? (
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-sm font-bold text-gray-500">
                        Wait a few seconds
                      </p>
                    </div>
                  ) : (
                    <button
                      className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 rounded-full"
                      onClick={handleSendOtpClick}
                    >
                      Send OTP
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
