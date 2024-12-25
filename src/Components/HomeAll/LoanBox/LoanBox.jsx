import React from "react";
import { Link } from "react-router-dom";

const LoanBox = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 p-6 bg-gray-100">
      <div className="w-full md:w-1/2 bg-blue-400 text-white rounded-lg p-6 flex flex-col items-center text-center shadow-lg">
        <div className="text-3xl mb-2">₹</div>
        <h2 className="text-xl font-semibold">Personal Loan</h2>
        <p className="mt-2 text-sm">Get loans at Lowest Rate</p>
        <button className="mt-4 px-4 py-2 bg-white text-blue-400 font-semibold rounded shadow hover:bg-gray-200">
          <Link to='/personalloan' >
          Apply Personal Loan
          </Link>
        </button>
      </div>
      <div className="w-full md:w-1/2 bg-blue-600 text-white rounded-lg p-6 flex flex-col items-center text-center shadow-lg">
        <div className="text-3xl mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-8 h-8"
            viewBox="0 0 24 24"
          >
            <path d="M10 20h4v-2h-4v2zm10-10h-2v10h-16v-10h-2l10-10 10 10zm-12-4v2h2v-2h4v2h2v-2h2.764l-6.764-6.764-6.764 6.764h2.764z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold">Business Loan</h2>
        <p className="mt-2 text-sm">Get Business Loans in a few quick steps</p>
        <button className="mt-4 px-4 py-2 bg-white text-blue-600 font-semibold rounded shadow hover:bg-gray-200">
        <Link to='/business-list' >
        Apply Business Loan
          </Link>
        </button>
      </div>
    </div>
  );
};

export default LoanBox;