import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import Login from './Components/LoginFile/Login';
import Ourteam from './Components/OurTeam/Ourteam';
import HomeAll from './Components/HomeAll/HomeAll';
import Footer from "./Components/Footer/Footer"
import Personal from './Components/LoanForm/personal';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/home" element={<HomeAll />} />
          <Route path="/ourteam" element={<Ourteam />} />
          <Route path="/personal" element={<Personal/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
