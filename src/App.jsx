import React from 'react'
import Header from './Components/Header/Header'
import Hero from './Components/Hero/Hero'
import Choose from './Components/choose/Choose'
import Management from './Components/Management/Management'
import SlidingBox from './Components/Slider/SlidingBox'
import LoanBox from './Components/LoanBox/LoanBox'
import EmiCalculator from './Components/Calculater/EmiCalculator'
import Download from './Components/DownloadPhone/Download'
import Footer from './Components/Footer/Footer'


const App = () => {
  return (
    <div>
      <Header/>
      <Hero/>
      <Choose/>
      <Management/>
      <SlidingBox/>
      <LoanBox/>
      <EmiCalculator/>
      <Download/>
      <Footer/>
    </div>
  )
}

export default App