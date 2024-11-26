import React, { useState , useEffect } from "react";
import Bhanix from "../../../assets/bhanix.jpg";
import moneytap from "../../../assets/moneytap-logo.svg"
import ClickMyLoan from "../../../assets/clickmyloans.webp"
import Fibe from "../../../assets/FIBE.webp"
import meter from "../../../assets/meter.png";
import Money from "../../../assets/mv_new_pwa_logo.svg"
import { GiMoneyStack } from "react-icons/gi";
import { GrDocumentConfig } from "react-icons/gr";
const LenderList = () => {
  const [user, setUser] = useState({});
  const [filteredLenders, setFilteredLenders] = useState([]);

  const leandersdetails = [
    { name: 'Fibe', approvalRate: "Good",  LoanAmount:"3,00,000", interestRate: "starting from 22% to 28%", Tenure:"Upto 18 month",processingFee:"Upto 2%" ,image:Bhanix ,  Collatera:"No Collatera" , Flexible :"Flexible Repayment" , Restriction:"No Usage Restriction" },
    { name: 'Upwards', approvalRate: "Excellent", LoanAmount:"2,00,000", interestRate: "starting from 24% to 30%", Tenure:"Upto 30 month",processingFee:"Upto 3%", image:moneytap , Collatera:"No Collatera",Flexible :"Flexible Repayment" , Restriction:"No Usage Restriction" },
    { name: 'Cashe', approvalRate: "Good", LoanAmount:"5,00,000", interestRate: "starting from 26%", Tenure:"Upto 24 month",processingFee:"Upto 2.5%" , image:ClickMyLoan , Collatera:"No Collatera" , Flexible :"Flexible Repayment" , Restriction:"No Usage Restriction"},
    { name: 'Faircent', approvalRate: "Good", LoanAmount:"3,00,000", interestRate: "starting from 22% to 26%", Tenure:"Upto 36 month",processingFee:"Upto 4%" , image:Fibe , Collatera:"No Collatera" , Flexible :"Flexible Repayment" , Restriction:"No Usage Restriction"},
    { name: 'Prefr', approvalRate: "Excellent", LoanAmount:"2,00,000", interestRate: "starting from 22% to 28%", Tenure:"Upto 18 month",processingFee:"Upto 2.2%" , image:Money , Collatera:"No Collatera" , Flexible :"Flexible Repayment" , Restriction:"No Usage Restriction"},
  ];

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("userToken");
      if (!token) {
        console.error('JWT token not found  local storage');
        return;
      }
      try {
        const response = await axios.get('https://credmantra.com/api/v1/auth/verify-user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = response.data.user;
        const dob = new Date(userData.dob);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - dob.getFullYear();
        setUser({ ...userData, age });
      } catch (error) {
        console.error('SerVer Error:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (user.age && user.income) {
      const eligibleLenders = [
        { name: 'Fibe', minAge: 21, maxAge: 55, minSalary: 15000 },
        { name: 'Upwards', minAge: 21, maxAge: 55, minSalary: 18000 },
        { name: 'Cashe', minAge: 18, maxAge: 60, minSalary: 15000 },
        { name: 'Faircent', minAge: 25, maxAge: 55, minSalary: 25000 },
        { name: 'Prefr', minAge: 22, maxAge: 55, minSalary: 15000 },
      ];
      const filtered = eligibleLenders.filter(
        (lender) =>
          lender.minAge <= user.age &&  lender.maxAge >= user.age && lender.minSalary <= user.income );
      setFilteredLenders(filtered.map((lender) => lender.name));
      console.log('Avlable Lender:', filtered.map((lender) => lender.name));
    }
  }, [user]);

  return (
    <>
    <div className="text-center items-center h-auto">
    <div className="flex items-center text-4xl font-semibold justify-center mt-3">
      <GiMoneyStack />
      <h1 className="mx-2">Select a Lender</h1>
      <GiMoneyStack /> <br />
    </div>
    <p className="text-2xl mt-[1.3%]">
      Here are the offers that will best suit your needs.
    </p>
    {leandersdetails.map((lander, index) => (
        <div
          className="w-[93%] h-auto sm:h-[40vh] mt-[3%] shadow-2xl rounded-2xl items-center text-center " style={{justifySelf:"center", textAlign:"-webkit-center"}}
          key={index}
        >
          <div className="border sm:flex w-full h-auto sm:h-[25vh] mt-[3%] rounded-lg sm:justify-around text-gray-600 space-y-2">
            <img
              src={lander.image}
              alt="Safety List"
              className="sm:h-[86%] sm:w-[16%] h-[50%] w-[60%]"
            />

            <div className="text-center">
              <h2>Approval Rating</h2>
              <div className="flex items-center justify-center">
                <h2>{lander.approvalRate}</h2>
                <img src={meter} alt="Meter" className="h-5 w-7 mt-1" />
              </div>
            </div>

            <div className="text-center">
              <h2>Loan Amount</h2>
              <div className="flex items-center justify-center">
                <h2>{lander.LoanAmount}</h2>
               
              </div>
            </div>

            <div className="text-center">
              <h2>Interest Rate</h2>
              <div className="flex items-center justify-center">
                <h2>{lander.interestRate}</h2>
               
              </div>
            </div>

            <div className="text-center">
              <h2>Tenure</h2>
              <div className="flex items-center justify-center">
                <h2>{lander.Tenure}</h2>
               
              </div>
            </div>

            <div className="text-center ">
              <h2>Processing Fee</h2>
              <div className="flex items-center justify-center">
                <h2>{lander.processingFee}</h2>
               
              </div>
            </div>
          </div>

          <div className="w-full h-0.5 bg-transparent border-t-2 border-dotted border-gray-500"></div>

          <div className="sm:flex flex-col sm:flex-row sm:justify-around mt-4 " style={{justifyItems:"center" ,}}>
            <div className="flex flex-col sm:flex-row text-center sm:space-x-5 space-y-1 ">
                <div  className="flex  ">
                  <GrDocumentConfig className="mt-1"/>
                  <h2>{lander.Collatera}</h2>
                </div>
                <div  className="flex ">
                  <GrDocumentConfig className="mt-1"/>
                  <h2>{lander.Flexible}</h2>
                </div>
                <div  className="flex ">
                  <GrDocumentConfig className="mt-1"/>
                  <h2>{lander.Restriction}</h2>
                </div>
            </div>
            <button className="h-[35px] border w-[80%] sm:w-[20%] bg-sky-400 text-white font-bold rounded-lg hover:bg-sky-800 flex items-center justify-center">
              Apply Now
            </button>
          </div>
        </div>
      ))}
  </div>
  </>
  );
};

export default LenderList;
