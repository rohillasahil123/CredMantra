import React from 'react'
import oneImg from "../../../assets/on.png"
import twoImg from "../../../assets/te.png"
import fastApproval from '../../../assets/loanfast.webp'
import wildproject from '../../../assets/wideproject.png'
import documents from '../../../assets/document.png'
import process from '../../../assets/pocess.png'
import speed from '../../../assets/speed.png'
import secure from '../../../assets/safty.png'


const Ourteam = () => {
  return (
    <>
    <div className=' text-center '>
      <h1 className='text-[60px] font-bold text-orange-700'>Our Story</h1>
      
    <div className="flex flex-col lg:flex-row items-center justify-between p-6 lg:p-12 bg-white text-gray-900 ">
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
        <h1 className='text-[30px] sm:text-[60px] font-bold text-orange-700'>What <span className='text-sky-300'>Makes </span> Us <span className='text-sky-600'>Special </span> </h1>
        <p className=" ">
        Our offerings shine with their competitive interest rates and user-friendly processes, liberating our customers from the constraints of traditional, convoluted financial procedures.
          </p>
          <h1 className='text-xl font-bold'>
          "At Credmantra, we believe financial empowerment is the cornerstone of progress. We’re here to help you build, manage, and grow your wealth with confidence."</h1>
      </div>
      <div className='flex h-[100vh] sm:h-[50vh] w-full justify-center sm:justify-around flex-col sm:flex-row mt-[2%] items-center space-y-6 sm:space-y-0'>
        <div className='shadow-2xl  h-[80%] sm:h-[80%] w-[90%]  sm:w-[26%] items-center text-center content-center rounded-lg hover:cursor-pointer transition-transform hover:scale-105 '>
          <img src={fastApproval} alt="" srcset=""  className='h-[70%] sm:h-[50%] w-[60%] ml-[20%]'/>
          <h1 className='font-bold text-2xl '>Fast approval rate</h1>
        </div>
        <div className='shadow-2xl  h-[80%] sm:h-[80%] w-[90%] mt-[20%] sm:w-[26%] items-center text-center content-center rounded-lg hover:cursor-pointer transition-transform hover:scale-105 '>
          <img src={process} alt="" srcset=""  className='h-[70%] sm:h-[50%] w-[60%] ml-[20%]'/>
          <h1 className='font-bold text-2xl '>100% paperless process</h1>
        </div>
        <div className='shadow-2xl  h-[80%] sm:h-[80%] w-[90%]  sm:w-[26%] items-center text-center content-center rounded-lg hover:cursor-pointer transition-transform hover:scale-105 '>
          <img src={documents} alt="" srcset=""  className='h-[70%] sm:h-[50%] w-[60%] ml-[20%]'/>
          <h1 className='font-bold text-2xl '>Hassle free documentation</h1>
        </div>
      </div>
      <div className='flex h-[120vh] sm:h-[50vh] w-full sm:mt-0 justify-center sm:justify-around flex-col sm:flex-row  items-center space-y-3 sm:space-y-0'>
        <div className='shadow-2xl  h-[80%] sm:h-[80%] w-[90%]  sm:w-[26%] items-center text-center content-center rounded-lg hover:cursor-pointer transition-transform hover:scale-105 '>
          <img src={speed} alt="" srcset=""  className='h-[70%] sm:h-[50%] w-[60%] ml-[20%]'/>
          <h1 className='font-bold text-2xl '>Fast disbursal</h1>
        </div>
        <div className='shadow-2xl  h-[80%] sm:h-[80%] w-[90%]  sm:w-[26%] items-center text-center content-center rounded-lg hover:cursor-pointer transition-transform hover:scale-105 '>
          <img src={wildproject} alt="" srcset=""  className='h-[70%] sm:h-[50%] w-[60%] ml-[20%]'/>
          <h1 className='font-bold text-2xl '>Wide project rate</h1>
        </div>
        <div className='shadow-2xl  h-[80%] sm:h-[80%] w-[90%]  sm:w-[26%] items-center text-center content-center rounded-lg hover:cursor-pointer transition-transform hover:scale-105 '>
          <img src={secure} alt="" srcset=""  className='h-[70%] sm:h-[50%] w-[60%] ml-[20%]'/>
          <h1 className='font-bold text-2xl '>Safe data ecosystem</h1>
        </div>
       
      </div>
      </>
  )
}

export default Ourteam