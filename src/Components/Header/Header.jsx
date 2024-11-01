import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
    <div className='border h-11  w-full flex justify-between shadow-xl text-center items-center '>
            <button className=' font-bold text-xl ml-4 border w-[100px] bg-yellow-400  h-7  rounded-lg hover:bg-yellow-700 hover:cursor-pointer'>Login</button>
        <div className='font-bold text-2xl ml-8 cursor-pointer '> <Link to='/home'> <span className='text-red-300'>  LO</span><span className='text-sky-300'>GO</span> </Link> </div>
        <div className='flex space-x-6 font-medium mr-7 items-center '>
        <div className='cursor-pointer' > <Link to='/ourteam' >Our Team </Link></div>
        <div className='cursor-pointer'>Blog</div>
        </div>
    </div>
    </>
  )
}

export default Header