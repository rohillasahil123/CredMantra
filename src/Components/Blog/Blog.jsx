import mettingImage from "../../assets/Meeting_Blog.jpg";
import metting1Image from "../../assets/Meeting2_bolg.jpg";
import metting2Image from "../../assets/Metting3_blog.jpg";
import SpecialLoan from "../../assets/perfectLoan.png";
import { useEffect, useState } from "react";

const Blog = () => {
  const [slider, setSlider] = useState(0);

  const ImageData = [
    {
      id: 1,
      image: mettingImage,
      title: "Blog 1",
    },
    {
      id: 2,
      image: metting1Image,
      title: "Blog 2",
    },
    {
      id: 3,
      image: metting2Image,
      title: "Blog 3",
    },
  ];

  const handlePlus = () => {
    setSlider(slider === ImageData.length - 1 ? 0 : slider + 1);
  };
  const handleMinus = () => {
    setSlider(slider === 0 ? ImageData.length - 1 : slider - 1);
  };

  useEffect(() => {
    const Timer = setInterval(() => {
      handlePlus();
    }, 2000);
    return () => clearInterval(Timer);
  }, [slider]);

  return (
    <div className=" h-auto w-full">
      <div className="sm:h-[100vh] h-auto w-full relative  ">
        {ImageData.map((imageItem, index) => (
          <div
            key={index}
            className={`sm:h-[100vh] h-auto w-[100%]  ${
              slider === index ? "block" : "hidden"
            }`}
          >
            <img
              src={imageItem.image}
              alt={imageItem.title}
              className="w-full sm:h-[90vh] h-[20vh]"
            />
          </div>
        ))}
        <div className="absolute sm:top-20 top-4 w-[60%] h-8 text-center rounded-md ml-[20%] sm:space-y-7 space-y-0">
          <h1 className="text-white text-lg sm:text-[50px]  font-serif ">
            Grow your business with our{" "}
          </h1>
          <h1 className="text-white text-lg sm:text-[50px]  font-serif ">
            {" "}
            expert services
          </h1>
        </div>
      </div>
      <div className="flex justify-between sm:flex-row flex-col  w-[80%] h-auto sm:h-[50vh] rounded-xl shadow-2xl border" style={{justifySelf:"center"}}>
        <div className="sm:h-[90%]  border w-full sm:w-[50%] ml-3 rounded-2xl shadow-2xl sm:mt-2 ">
          <h1 className="font-bold text-2xl text-orange-600">
            The Ultimate Guide to Finding the Perfect Personal Loans for Your
            Needs</h1>
            <p>
             Finding the perfect personal loan can be a difficult and
            overwhelming process. With so many lenders and options available, it
            can be hard to know which personal loans are best for your needs.
            That's why we have created this ultimate guide to finding the
            perfect personal loan for you. Here, you'll learn the ins and outs
            of personal loans, how to compare them, and what to watch out for
            when selecting the right loan for you. With this guide, you'll be on
            your way to unlocking your financial freedom in no time.
            </p>
        </div>
        <div className="h-[21vh] sm:h-[30vh] w-[100%] sm:w-[50%]  mb- ">
          <h1>
            <img src={SpecialLoan} alt="" className="sm:h-[40%] sm:w-[80%] w-[100%] h-[50%] object-cover" />
          </h1>
        </div>
      </div>
      {/* <div className="flex " style={{justifySelf:"center"}}>
        <div className="sm:h-[90%]  border w-full sm:w-[40%] ml-3 rounded-2xl shadow-2xl text-center ">
          <h1 className="font-bold text-2xl text-orange-600">
            The Ultimate Guide to Finding the Perfect Personal Loans for Your
            Needs</h1>
            <p>
             Finding the perfect personal loan can be a difficult and
            overwhelming process. With so many lenders and options available, it
            can be hard to know which personal loans are best for your needs.
            That's why we have created this ultimate guide to finding the
            perfect personal loan for you. Here, you'll learn the ins and outs
            of personal loans, how to compare them, and what to watch out for
            when selecting the right loan for you. With this guide, you'll be on
            your way to unlocking your financial freedom in no time.
            </p>
        </div> */}
    {/* </div> */}
    </div>
  );
};

export default Blog;
