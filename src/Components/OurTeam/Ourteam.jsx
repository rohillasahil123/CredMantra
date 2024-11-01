import React from 'react'
import oneImg from "../../assets/on.png"
import twoImg from "../../assets/te.png"
import Partner from '../Partners/Partner'

const Ourteam = () => {
  return (
    <>
    <div className='h-auto text-center '>
      <h1 className='text-[60px] font-bold text-orange-700'>Our Story</h1>
      
    <div className="flex flex-col lg:flex-row items-center justify-between p-6 lg:p-12 bg-white text-gray-900">
      <div className="lg:w-1/2 mb-6 lg:mb-0">
        <p className="text-lg lg:text-xl leading-relaxed">
          "Credmantra is a pioneering fintech startup headquartered in Gurugram,
          now expanding with a new branch in Mohali, Chandigarh. With over 15 years
          of specialized experience, we drive innovation in digital finance, credit
          analytics, and mobile payments across Indian and global markets. Our mission
          is to democratize financial products, ensuring they are both affordable and
          easily accessible to individuals in need of financial assistance. Our team
          comprises seasoned finance professionals from prestigious institutions such
          as IIT, LBS, IIM, Stephen's, LSE, and leading global banks."
        </p>
      </div>
      <div className="lg:w-1/2 flex justify-center sm:flex-row-reverse ">
        <img
          src={oneImg}
          alt="Illustration"
          className="w-48 h-48 lg:w-72 lg:h-72 object-contain "
        />
      </div>
      </div>
      <h1 className='text-[60px] font-bold text-orange-700'>Our Services</h1>
      
      <div className="flex flex-col lg:flex-row items-center justify-between p-6 lg:p-12 bg-white text-gray-900">
      <div className="lg:w-1/2 flex justify-center">
          <img
            src={twoImg}
            alt="Illustration"
            className="w-48 h-48 lg:w-72 lg:h-72 object-contain "
          />
        </div>
        <div className="lg:w-1/2 mb-6 lg:mb-0">
          <p className="text-lg lg:text-xl leading-relaxed">
            "Credmantra is a pioneering fintech startup headquartered in Gurugram,
            now expanding with a new branch in Mohali, Chandigarh. With over 15 years
            of specialized experience, we drive innovation in digital finance, credit
            analytics, and mobile payments across Indian and global markets. Our mission
            is to democratize financial products, ensuring they are both affordable and
            easily accessible to individuals in need of financial assistance. Our team
            comprises seasoned finance professionals from prestigious institutions such
            as IIT, LBS, IIM, Stephen's, LSE, and leading global banks."
          </p>
        </div>    
        </div>
        <h1 className='text-[60px] font-bold text-orange-700'>What <span className='text-sky-300'>Makes </span> Us <span className='text-sky-600'>Special </span> </h1>
        <p className="text-xl font-semibold">
        Our offerings shine with their competitive interest rates and user-friendly processes, liberating our customers from the constraints of traditional, convoluted financial procedures.
          </p>
      </div>
      <Partner/>
      </>
  )
}

export default Ourteam