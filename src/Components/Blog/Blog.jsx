import mettingImage from "../../assets/Meeting_Blog.jpg";
import metting1Image from "../../assets/Meeting2_bolg.jpg";
import metting2Image from "../../assets/Metting3_blog.jpg";
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
    setSlider(slider === ImageData.length-1 ? 0 : slider + 1);
  };
  const handleMinus = () => {
    setSlider(slider === 0 ? ImageData.length - 1 : slider - 1);
  };

  useEffect(()=>{
    const Timer = setInterval(()=>{
     handlePlus()
    } , 2000 )
    return ()=>clearInterval(Timer)

  },[slider])



  return (
    <div className=" h-auto w-full">
      <div className="h-[100vh] w-full relative  ">
        {ImageData.map((imageItem, index) => (
          <div key={index} className={`h-[100vh] w-[100%]  ${slider===index ? "block" : "hidden"}`}>
            <img
              src={imageItem.image}
              alt={imageItem.title}
              className="w-full sm:h-[90vh] h-[30vh]"
            />
          </div>
        ))}
        <div className="absolute top-20 w-[60%] h-8 text-center rounded-md ml-[20%]" >
          
            <h1 className="text-white text-lg sm:text-[50px]  font-serif ">Grow your business with our expert services</h1>
        </div>
      </div>
    </div>
  );
};

export default Blog;
