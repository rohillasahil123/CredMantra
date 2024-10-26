import React from 'react';
import clock from '../../assets/clock.gif';

const Choose = () => {
    return (
    <>
     <div className=' w-full text-center absolute'>
                <h1 className="text-4xl font-bold mt-4">
                    Why Ch<span className="border-b-4 border-teal-800">oose Us</span>
                </h1>
                </div>
        <div className="flex flex-col md:flex-row text-center w-full">
            <div className="flex flex-col items-center bg-sky-300 w-full md:w-1/2 p-4 ">    
                <div className=" mt-10 space-y-2">
                    <div className=" bg-white h-[50%] sm:mr-[20%] w-[80%] rounded-lg shadow-lg flex flex-col items-center mr-[30%] p-2">
                        <div className="rounded-full bg-white h-[60px] flex mt-3 mx-auto w-[60px] justify-center shadow-2xl">
                            <img src={clock} alt="Fast Disbursal" className="w-full h-full" />
                        </div>
                        <h1 className="text-xl font-semibold">Fast Disbursal</h1>
                        <p>Our team helps customers <br /> make informed loan decisions.</p>
                    </div>
                    <div className=" bg-white h-[50%] sm:ml-[60%] w-[80%] rounded-lg shadow-lg flex flex-col items-center mr-[30%] p-2">
                        <div className="rounded-full bg-white h-[60px] flex mt-3 mx-auto w-[60px] justify-center shadow-2xl">
                            <img src={clock} alt="Fast Disbursal" className="w-full h-full" />
                        </div>
                        <h1 className="text-xl font-semibold">Fast Disbursal</h1>
                        <p>Our team helps customers <br /> make informed loan decisions.</p>
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex flex-col items-center bg-red-300 w-full md:w-1/2 p-4 ">    
                <div className=" mt-10 space-y-2">
                    <div className=" bg-white h-[50%] m-0 sm:mr-[20%] w-[80%] rounded-lg shadow-lg flex flex-col items-center mr-[30%] p-2">
                        <div className="rounded-full bg-white h-[60px] flex mt-3 mx-auto w-[60px] justify-center shadow-2xl">
                            <img src={clock} alt="Fast Disbursal" className="w-full h-full" />
                        </div>
                        <h1 className="text-xl font-semibold">Fast Disbursal</h1>
                        <p>Our team helps customers <br /> make informed loan decisions.</p>
                    </div>
                    <div className=" bg-white h-[50%] m-0 sm:ml-[60%] w-[80%] rounded-lg shadow-lg flex flex-col items-center mr-[30%] p-2">
                        <div className="rounded-full bg-white h-[60px] flex mt-3 mx-auto w-[60px] justify-center shadow-2xl">
                            <img src={clock} alt="Fast Disbursal" className="w-full h-full" />
                        </div>
                        <h1 className="text-xl font-semibold">Fast Disbursal</h1>
                        <p>Our team helps customers <br /> make informed loan decisions.</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Choose;
