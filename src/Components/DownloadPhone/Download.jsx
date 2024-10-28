import React from 'react'
import QrCode from "../../assets/QrCode.png"

const Download = () => {
    return (
        <div className=' sm:flex max-h-screen sm:h-[70vh]  w-full justify-around  items-center'>
            <div className='justify-center items-center text-center flex flex-col h-[80%]   w-[90%] sm:w-[50%] ml-[4%] sm:ml-[2%] space-y-8 shadow-2xl rounded-2xl'>
                <h1 className='text-blue-700  sm:text-4xl text-2xl  '>We provide the best <br />
                    Financial choices to make   
                    your life better</h1>
                    <h2 className='sm:text-2xl text-xl '>
                    Scan or Download the credMantra app <br /> to get personal loan , updated <br /> credit score and credit card offer.
                    </h2>
            </div>
            <div className='w-full sm:w-[50%] justify-center flex items-center sm:pt-0 pt-[6%]  '>
            <img src={QrCode} alt="" srcset="" className='h-[60%] sm:w-[30%] w-[50%] ' />
            </div>
        </div>
    )
}

export default Download