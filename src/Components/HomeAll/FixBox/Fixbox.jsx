import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Fixbox = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOnScreen, setIsOnScreen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      if (/^\d{0,10}$/.test(value)) {
        setPhoneNumber(value);
      }
    }
  };

  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(phoneNumber);
  };

  const sendOtp = async (phoneNumber) => {
    try {
      const response = await fetch("http://3.108.59.193/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("OTP sent successfully! Check your phone.");
        setIsOnScreen(true); 
        setPhoneNumber("");
      } else {
        toast.error(data.message || "Failed to send OTP. Please try again.");
        console.error("Error from API:", data.message);
      }
    } catch (error) {
      toast.error("An error occurred while sending OTP.");
      console.error("Error sending OTP:", error);
    }
  };

  const handleOtpSend = () => {
    if (!phoneNumber) {
      toast.error("Please enter mobile number.");
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    sendOtp(phoneNumber);
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
      className={`fixed bottom-0 left-0 w-full sm:h-[12%] h-[12 %] bg-gray-200 rounded-md z-50 ease-in-out transition-all duration-500 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
      }`}
    >
      <div
        className="h-full sm:flex space-x-5 border rounded-lg w-full shadow-2xl space-y-0 sm:space-y-1 text-center p-1 items-center"
        style={{ justifyContent: "center" }}
      >
        <h1 className="font-bold text-xl animate-blink">
          <span className="text-red-500">Get Ins</span>
          <span className="text-sky-500">tant Loan</span> :
        </h1>
        <input
          type="text"
          placeholder="+91 xxxxxxxxxxx"
          className="border h-9 w-[50%] rounded-md ml-3"
          onChange={handleChange}
          value={phoneNumber}
          name="phoneNumber"
        />

        <button
          className="h-9 w-[20%] sm:w-[15%] ml-[3%] border rounded-md text-gray-700 font-bold bg-gradient-to-r from-sky-300 to-red-300"
          onClick={handleOtpSend}
        >
          Send OTP
        </button>

      </div>
      
    </div>
  );
};

export default Fixbox;