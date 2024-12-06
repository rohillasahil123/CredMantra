import React, { useState , useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const OtpVerificationComponent = () => {
  const [isOnScreenButton, setIsOnScreenButton] = useState(false); 
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isVisible, setIsVisible] = useState(true)
  const [message , setMessage] = useState("")
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") setPhone(value);
    if (name === "otp") setOtp(value);
  };

  const handleOtpSend = async () => {
    if (!phone) {
      setMessage("Please enter a phone number");
      return;
    }
    try {
      const response = await axios.post("https://credmantra.com/api/v1/auth/", {
        phone : phone,
      });
      if (!response.data.type == 'success') {
        toast.error(response.data.message || "Failed to send OTP")
        console.log(response.data.message , "try" )
      } else {
        toast.success("OTP sent successfully!")
        setIsOnScreenButton(true); 
        console.log(response.data.message)
      }
    } catch (error) {
      setMessage("Error sending OTP. Please try again.");
      console.error(error);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setMessage("Please enter the OTP");
      return;
    }

    try {
      const response = await axios.post("https://credmantra.com/api/v1/auth/verify-otp", {
        phone : phone,
        otp : otp,
      });

      if (!response.data.type == 'success') {
        toast.error(response.data.message || "Failed to send OTP")
        console.log(response.data.message )
      } else {
        const { token, userId } = response.data.data;
        Cookies.set("userToken", token, { secure: true, sameSite: "Strict", expires: 1 });
        Cookies.set("userId", userId, { secure: true, sameSite: "Strict", expires: 1 });
        toast.success("OTP verified successfully!");       
        setMessage(response.data.message || "Invalid OTP");
        setOtp("")

      }
    } catch (error) {
      setMessage("Error verifying OTP. Please try again.");
      console.error(error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= window.innerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <div
      className={`fixed bottom-0 left-0 w-full sm:h-[12%] h-[12%] bg-gray-200 rounded-md z-50 ease-in-out transition-all duration-500 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
      }`}
    >
      <div
        className="h-full sm:flex space-x-5 border rounded-lg w-full shadow-2xl space-y-0 sm:space-y-1 text-center p-1 items-center"
        style={{ justifyContent: "center" }}
      >
        {isOnScreenButton ? (
          <>
            <h1 className="font-bold text-xl animate-blink">
              <span className="text-red-500">Enter-</span>
              <span className="text-sky-500">Otp</span>
            </h1>
            <input
              type="text"
              placeholder="OTP"
              className="border h-9 w-[50%] p-3 rounded-md ml-7"
              onChange={handleChange}
              value={otp}
              name="otp"
            />
            <button
              className="h-9 w-[20%] sm:w-[15%] ml-[3%] border rounded-md text-gray-700 font-bold bg-gradient-to-r from-sky-300 to-red-300"
              onClick={handleVerifyOtp}
            >
              Submit
            </button>
          </>
        ) : (
          <>
            <h1 className="font-bold text-xl animate-blink">
              <span className="text-red-500">Get Ins</span>
              <span className="text-sky-500">tant Loan</span> :
            </h1>
            <input
              type="text"
              placeholder="+91 xxxxxxxxxxx"
              className="border h-9 p-3 w-[50%] rounded-md ml-3"
              onChange={handleChange}
              value={phone}
              name="phone"
            />
            <button
              className="h-9 w-[20%] sm:w-[15%] ml-[3%] border rounded-md text-gray-700 font-bold bg-gradient-to-r from-sky-300 to-red-300"
              onClick={handleOtpSend}
            >
              Send OTP
            </button>
          </>
        )}
      </div>
      
    </div>
  );
};

export default OtpVerificationComponent;
