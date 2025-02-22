import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Pages/Header/Header";
import Login from "./Components/AuthLogin/LoginFile/Login";
import Ourteam from "./Components/Pages/OurTeam/Ourteam";
import HomeAll from "./Components/HomeAll/HomeRoute/HomeAll";
import PersonalLoan from "./Components/Landers&forms/LoanForm/PersonalLoan";
import BusinessEligibilityForm from "./Components/Landers&forms/LoanForm/Business";
import SignUp from "./Components/AuthLogin/Signup/Signup";
import LanderList from "./Components/Landers&forms/LanderList/LanderList";
import { Toaster } from "react-hot-toast";
import Contect from "./Components/Pages/Contect/Contect"
import EmiCalculator from "./Components/HomeAll/Calculater/EmiCalculator";
import Partner from "./Components/Pages/Partners/Partner";
import Blog from "./Components/Pages/Blog/Blog";
import Protect from "./Components/AuthLogin/Protectedroute/Protect";
import HomeLoan from "./Components/Landers&forms/LoanForm/HomeLoan";
import LoanSecurity from "./Components/Landers&forms/LoanForm/LoanSecurity/LoanSecurity";
import Microloans from "./Components/Landers&forms/LoanForm/Microloans";
import BussinesLanderList from "./Components/Landers&forms/LanderList/BussinesLanderList";
import Hiring from "./Components/Pages/Hiring/Hiring";
import Profile from "./Components/Pages/Profile/Profile";
import Footer1 from "./Components/Pages/Footer1/Footer1"
import Editprofile from "./Components/Pages/Profile/Editprofile";
import VittoLoanForm from "./Components/Landers&forms/BusinessLoan/Vitto";
import Faircent from "./Components/Landers&forms/BusinessLoan/Faircent";
import LendingKart from "./Components/Landers&forms/BusinessLoan/LandingKart";
import FibeForm from "./Components/Landers&forms/PersonalLoanForm/Fibe";
import CasheForm from "./Components/Landers&forms/PersonalLoanForm/Cashe";
import MoneyView from "./Components/Landers&forms/PersonalLoanForm/MoneyView";
import Ramfin from "./Components/Landers&forms/PersonalLoanForm/Ramfin";
import SmartCoin from "./Components/Landers&forms/PersonalLoanForm/SmartCoin";
import Perfer from "./Components/Landers&forms/PersonalLoanForm/Perfer";
import FatakPay from "./Components/Landers&forms/PersonalLoanForm/FatakPay";
import MoneyTap from "./Components/Landers&forms/PersonalLoanForm/MoneyTap";
import LoanTap from "./Components/Landers&forms/PersonalLoanForm/LoanTap";
import Payme from "./Components/Landers&forms/PersonalLoanForm/Payme";
import Mpocket from "./Components/Landers&forms/PersonalLoanForm/Mpocket";
import AgeError from "./Components/Error/AgeError"

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<HomeAll />} />
          <Route path="/ourteam" element={<Ourteam />} />
          <Route path="/personalloan" element={<Protect Component={PersonalLoan} />}/>
          <Route path="/businessloan" element={<Protect Component={BusinessEligibilityForm} />}/>
          <Route path="/homeloan" element={<Protect Component={HomeLoan} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/lenderlist" element={<Protect Component={LanderList} />}/>
          <Route path="/business-list" element={<Protect Component={BussinesLanderList} />}/>
          <Route path="/contect" element={<Protect Component={Contect} />} />
          <Route path="/emicalculator" element={<EmiCalculator />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/blog" element={<Blog />}></Route>
          <Route path="/abhiLoans"element={<Protect Component={LoanSecurity} />}></Route>
          <Route path="/micro_loan" element={<Protect Component={Microloans} />}></Route>
          <Route path="/hiring" element={<Hiring />}></Route>
          <Route path="/profile" element={<Protect Component={Profile} />} ></Route>
          <Route path="/editprofile" element={<Protect Component={Editprofile} />}></Route>
          <Route path="/vitto"element={<Protect Component={VittoLoanForm} />}></Route>
          <Route path="/faircent"element={<Protect Component={Faircent} />}></Route>
          <Route path="/landingkart" element={<Protect Component={LendingKart} />} ></Route>
          <Route path="/fibe"element={<Protect Component={FibeForm} />}></Route>
          <Route path="/cashe" element={<Protect Component={CasheForm} />}></Route>
          <Route path="/moneyview" element={<Protect Component={MoneyView} />}></Route>
          <Route path="/ramfin"element={<Protect Component={Ramfin} />}></Route>
          <Route path="/smartcoin"element={<Protect Component={SmartCoin} />}></Route>
          <Route path="/perfer" element={<Protect Component={Perfer} />}></Route>
          <Route path="/fatakpay" element={<Protect Component={FatakPay} />}></Route>
          <Route path="/moneytap" element={<Protect Component={MoneyTap} />}></Route>
          <Route path="/loantap" element={<Protect Component={LoanTap} />} ></Route>
          <Route path="/payme" element={<Protect Component={Payme} />}></Route>
          <Route path="/mpocket" element={<Protect Component={Mpocket} />}></Route>
          <Route path="/age-error" element={<Protect Component={AgeError} />} ></Route>
        </Routes>
        {location.pathname !== "/lenderlist" && <Footer1 />}
        <Toaster />
      </BrowserRouter>
    </div>
  );
};

export default App;
