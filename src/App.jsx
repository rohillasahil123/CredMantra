import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import Login from './Components/LoginFile/Login';
import Ourteam from './Components/OurTeam/Ourteam';
import HomeAll from './Components/HomeAll/HomeAll';
import Footer from "./Components/Footer/Footer"
import PersonalLoan from "./Components/LoanForm/PersonalLoan"
import BusinessEligibilityForm from './Components/LoanForm/Business';
import SignUp from './Components/Signup/Signup';
import LanderList from './Components/LanderList/LanderList';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/home" element={<HomeAll />} />
          <Route path="/ourteam" element={<Ourteam />} />
          <Route path="/personalloan" element={ <PersonalLoan/>  } />
          <Route path="/businessloan" element={ <BusinessEligibilityForm/>   } />
          <Route path="/signup" element={ <SignUp/> } />
          <Route path="/landerlist" element={ <LanderList/> } />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
