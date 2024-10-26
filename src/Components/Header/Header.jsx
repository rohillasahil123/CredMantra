import React from 'react'

const Header = () => {
  return (
    <>
    <div className='border h-11  w-full flex justify-between shadow-xl text-center items-center '>
            <button className=' font-bold text-xl ml-4 border w-[100px] bg-yellow-400  h-7  rounded-lg hover:bg-yellow-700 hover:cursor-pointer'>Login</button>
        <div className='font-bold text-2xl ml-8 cursor-pointer '><span className='text-red-300'>LO</span><span className='text-sky-300'>GO</span> </div>
        <div className='flex space-x-6 font-medium mr-7 items-center '>
        <div className='cursor-pointer' >Our Team</div>
        <div className='cursor-pointer'>Blog</div>
        </div>
    </div>
    </>
  )
}

export default Header