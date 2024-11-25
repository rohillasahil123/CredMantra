import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EligibleLendersService = () => {
  const [user, setUser] = useState({});
  const [filteredLenders, setFilteredLenders] = useState([]);

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
    <div>
      <h1>Eligible Lenders</h1>
      <ul>  
        {filteredLenders.map((lender) => (
          <li key={lender}>{lender}</li>
        ))}
      </ul>
    </div>
  );
};

export default EligibleLendersService;
