import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
    <div className="border h-11 w-full flex justify-between shadow-xl items-center p-4 ">
      <button className="font-bold text-xl border w-[100px] bg-yellow-400 h-7 rounded-lg hover:bg-yellow-700 hover:cursor-pointer">
        <Link to="/login">Login</Link>
      </button>
      <div className="font-bold text-2xl cursor-pointer">
        <Link to="/">
          <span className="text-red-300">LO</span><span className="text-sky-300">GO</span>
        </Link>
      </div>
      <div className="hidden md:flex space-x-6 font-medium items-center">
        <Link className="cursor-pointer" to="/ourteam">Our Team</Link>
        <Link className="cursor-pointer" to="/blog">Blog</Link>
      </div>
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-xl">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
     

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-12 right-0 bg-white w-[50%] h-auto shadow-lg rounded-lg z-10 p-4">
          <Link onClick={toggleMenu} className="block py-2 text-center font-medium" to="/ourteam">Our Team</Link>
          <Link onClick={toggleMenu} className="block py-2 text-center font-medium" to="/blog">Blog</Link>
        </div>
      )}
    </div>
    <div className='text-center font-bold'>
        <h1>ॐ श्री श्याम देवाय नमः</h1>
      </div>
    </>
  );
};

export default Header;
