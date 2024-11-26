import React from 'react'
import business from "../../../assets/Bussiness.png"
import sales from "../../../assets/Sales.png"
import support from "../../../assets/Support.jpeg"
import hr from "../../../assets/Hr_company.png"

    const contactInfo = [
        {
          title: "Business",
          email: "info@credmantra.com",
          phone: "01244232917",
          icon: business, 
        },
        {
          title: "Sales/Operation",
          email: "sales@credmantra.info",
          phone: "01244232917",
          icon: sales,
        },
        {
          title: "Support",
          email: "support@credmantra.info",
          phone: "01244232917",
          icon: support,
        },
        {
          title: "HR",
          email: "hr@credmantra.info",
          phone: "01244232917",
          icon: hr,
        },
      ];


const Contect = () => {
  return (
    <div>
        <div className='text-center'>
            <h1 className='text-[30px] sm:text-[60px] text-blue-700 font-semibold'>Get in touch with us for more information</h1>
            <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-center text-lg font-semibold mb-4">
        If you need any help or have any questions, we're here for you
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl">
        {contactInfo.map((contact, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center"
          >
            <img
              src={contact.icon}
              alt=''
              className="w-[80%] h-[70%] mb-4"
            />
            <h3 className="text-xl font-medium mb-2">{contact.title}</h3>
            <p className="text-gray-600 mb-2">{contact.email}</p>
            <p className="text-gray-600">{contact.phone}</p>
          </div>
        ))}

        </div>       
    </div>
    </div>
        
        </div>
  )
}

export default Contect