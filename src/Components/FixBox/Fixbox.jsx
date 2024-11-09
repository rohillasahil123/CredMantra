import React, { useState, useEffect } from "react";

const Fixbox = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOnScreen, setIsOnScreen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      if (/^\d{0,10}$/.test(value)) {
        setPhoneNumber(value);
      }
    } else if (name === "otp") {
      setOtp(value);
    }
  };

  const handelOtpSend = () => {
    setIsOnScreen(true);
    console.log("Sending OTP to:", phoneNumber);
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
    isVisible && (
      <div className="fixed sm:h-[16%] bottom-0  left-0  w-[80%] sm:w-[100%] bg-white rounded-md z-50 ease-in-out">
        <div className="h-full border rounded-lg w-full  shadow-2xl space-y-4  text-center">
          <h1 className="font-semibold text-xl">
            Get Instant Loan Approval in less than 2 minutes
          </h1>
          {isOnScreen ? (
            <input
              type="text"
              placeholder="OTP"
              className="border h-9 w-[60%] rounded-md mt-[5%] ml-3"
              onChange={handleChange}
              value={otp}
              name="otp"
            />
          ) : (
            <input
              type="text"
              placeholder="91+ Phone Number"
              className="border h-9 w-[30%] rounded-md ml-3"
              onChange={handleChange}
              value={phoneNumber}
              name="phoneNumber"
            />
          )}
          <button
            className="h-9 w-[15%] ml-[3%] border rounded-md bg-teal-800 text-white font-bold"
            onClick={handelOtpSend}
          >
            Send OTP
          </button>
        </div>
      </div>
    )
  );
};

export default Fixbox;
