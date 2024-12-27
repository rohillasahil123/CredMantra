import React ,{useState, useEffect} from "react";
import Hero from "../Hero/Hero";
import Choose from "../choose/Choose";
import Management from "../Management/Management";
import SlidingBox from "../Slider/SlidingBox";
import LoanBox from "../LoanBox/LoanBox";
import EmiCalculator from "../Calculater/EmiCalculator";
import Download from "../DownloadPhone/Download";
import Fixbox from "../FixBox/Fixbox";
import Cookies from "js-cookie";

const HomeAll = () => {
  const [showFixbox, setShowFixbox] = useState(false);


  useEffect(() => {
    if (Cookies.get("userToken")) {
      setShowFixbox(false);
    } else {
      setShowFixbox(true); 
    }
  }, []);
  
  return (
    <div>
     {showFixbox && <Fixbox />}
      <Hero />
      <Choose />
      <Management />
      <SlidingBox />
      <LoanBox />
      <EmiCalculator />
      <Download />
    </div>
  );
};

export default HomeAll;
