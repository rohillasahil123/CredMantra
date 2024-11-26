import React from "react";
import partnerImg from "../../../assets/Partner.png";



const Partner = () => {
  const PartnerIamge = [
    { ImageSrc: "Airtel Bank" },
    { ImageSrc: "Casye" },
    { ImageSrc: "Ramfin" },
    { ImageSrc: "Try" },
    { ImageSrc: "Zype" },
    { ImageSrc: "ManiTap" },
    { ImageSrc: "Payme" },
    { ImageSrc: "MoneyView" },
    { ImageSrc: "pocketLoan" }
  ];

  return (
    <>
    <div className="h-auto  w-full text-center items-center shadow-2xl ">
      <div className="text-center sm:flex sm:justify-around  ">
        <h1 className="text-3xl mt-[7%] font-semibold ">Our Partners :--</h1>
        <div className="">
          <img
            src={partnerImg}
            alt=""
            className="ml-[13%] h-[30%] sm:h-[60%] w-[80%] sm:w-[60%] mt-[10%] sm:ml-[60%]  hover:cursor-pointer transition-transform hover:scale-105  "
          />
        </div>
      </div>
      <h1 className="text-2xl font-semibold mt-3  ">
        Supporting Partners <span className="text-sky-500 ">—</span>
      </h1>
      <div style={{"justify-items":"center"}} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-[3%]  sm:ml-0 sm:text-center items-center flex-col ">
              {PartnerIamge.map((loan, index) => (
                <div
                  key={index}
                  className="w-[60%] h-auto mt-[10%] flex    sm:w-[70%] sm:h-[80%] shadow-xl rounded-xl sm:flex flex-row sm:flex-col items-center justify-center     p-4 space-y-2  hover:shadow-[0_0_30px_15px_rgba(0,255,255,0.5)] hover:cursor-pointer transition-transform hover:scale-105  "  
                >
                    <div className=" sm:ml-auto space-y-2 sm:w-full  ">
                      <h1 className="title-font font-bold text-gray-700- text-2xl ">
                        {loan.ImageSrc}
                      </h1>
      
                  </div>
                </div>
              ))}
            </div>
    </div>
    </>
  );
};

export default Partner;
