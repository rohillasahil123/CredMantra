import React, { useState } from 'react';
import emiImage from "../../../assets/emi.png";

const EmiCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [loanTenure, setLoanTenure] = useState(0);
  const [emi, setEmi] = useState(null);

  const calculateEMI = () => {
    const monthlyRate = interestRate / 12 / 100;
    const months = loanTenure * 12;
    const emiValue =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    setEmi(emiValue.toFixed(2));
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h2 className="text-4xl text-blue-600 font-bold mb-6 text-center">Personal Loan EMI Calculator</h2>
      
      <div className="flex flex-col lg:flex-row items-center justify-around w-full lg:space-x-8 space-y-6 lg:space-y-0">
        
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <div className="mb-4">
            <label className="block text-gray-700">Loan Amount (₹)</label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full p-2 border rounded mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Interest Rate (%)</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full p-2 border rounded mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Loan Tenure (Years)</label>
            <input
              type="number"
              value={loanTenure}
              onChange={(e) => setLoanTenure(e.target.value)}
              className="w-full p-2 border rounded mt-1"
            />
          </div>

          <button
            onClick={calculateEMI}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Calculate EMI
          </button>

          {emi && (
            <div className="mt-4 text-center text-lg font-semibold">
              Your EMI: ₹{emi}
            </div>
          )}
        </div>

        <div className="w-full lg:w-1/2 p-4 flex justify-center">
          <img src={emiImage} alt="EMI Calculator" className="w-full max-w-xs lg:max-w-full object-contain" />
        </div>
        
      </div>
    </div>
  );
};

export default EmiCalculator;
