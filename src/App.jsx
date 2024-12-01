import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Pages/Header/Header";
import Login from "./Components/AuthLogin/LoginFile/Login";
import Ourteam from "./Components/Pages/OurTeam/Ourteam";
import HomeAll from "./Components/HomeAll/HomeRoute/HomeAll";
import Footer from "./Components/Pages/Footer/Footer";
import PersonalLoan from "./Components/LoanForm/PersonalLoan";
import BusinessEligibilityForm from "./Components/LoanForm/Business";
import SignUp from "./Components/AuthLogin/Signup/Signup";
import LanderList from "./Components/Pages/LanderList/LanderList";
import { Toaster } from "react-hot-toast";
import Contect from "./Components/Pages/Contect/Contect";
import EmiCalculator from "./Components/HomeAll/Calculater/EmiCalculator";
import Partner from "./Components/Pages/Partners/Partner";
import Blog from "./Components/Pages/Blog/Blog";
import Protect from "./Components/AuthLogin/Protectedroute/Protect";
import HomeLoan from "./Components/LoanForm/HomeLoan";
import EligibleLendersService from "./Components/EligibleLendersService/EligibleLendersService";
import LoanSecurity from "./Components/Pages/LoanSecurity/LoanSecurity";
import Microloans from "./Components/LoanForm/Microloans";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<HomeAll />} />
          <Route path="/ourteam" element={<Ourteam />} />
          <Route
            path="/personalloan"
            element={<Protect Component={PersonalLoan} />}
          />
          <Route
            path="/businessloan"
            element={ <Protect Component={BusinessEligibilityForm}/> }
          />
           <Route
            path="/homeloan"
            element={ < Protect Component={HomeLoan} /> }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/landerlist" element={< Protect Component={LanderList} />} />
          <Route path="/contect" element={ <Protect Component={Contect} />} />
          <Route path="/emicalculator" element={<EmiCalculator />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/blog" element={<Blog />}></Route>
          <Route path="/abhiLoans" element={  < Protect Component={LoanSecurity} />}></Route>
          <Route path="/micro_loan" element={ <Protect Component={Microloans}/>}></Route>

          <Route path="myAccount" element={<EligibleLendersService/>}></Route>
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </div>
  );
};

export default App;
