import React from 'react'
import QrCode from "../../assets/QrCode.png"
import phoneImg from "../../assets/PhoneImg.png";


const Download = () => {
    return (
        <>
        <div className=' sm:flex max-h-screen sm:h-[70vh]  w-full justify-around  items-center'>
            <div className='justify-center items-center text-center flex flex-col h-[80%]   w-[90%] sm:w-[50%] ml-[4%] sm:ml-[2%] space-y-8 shadow-2xl rounded-2xl'>
                <h1 className='text-blue-700  sm:text-4xl text-2xl  '>We provide the best <br />
                    Financial choices to make   
                    your life better</h1>
                    <h2 className='sm:text-2xl text-xl '>
                    Scan or Download the credMantra app <br /> to get personal loan , updated <br /> credit score and credit card offer.
                    </h2>
            </div>
          
            <div className="sm:w-[70%] h-[80%]  flex-col: sm:flex-row sm:flex  rounded-2xl max-w-md bg-white shadow-lg p-2 relative transform transition-transform hover:scale-105">
          <img
            src={phoneImg}
            alt="App preview"
            className="rounded-lg sm:h-[70%] sm:w-[50%] object"
          />
            <img src={QrCode} alt="" srcset="" className='h-[60%] sm:w-[30%] w-[50%] ml-[20%] sm:ml-[0%] ' />
           
        </div>
        </div>
      
      
        </>
    )
}

export default Download