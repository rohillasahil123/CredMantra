import React from "react";
import circleImage from "../../assets/bankBlog.webp";

const Blog = () => {
  return (
    <div className=" h-auto w-full">
      <div className="h-[100vh] w-full   ">
        <div className="h-[60%] w-[50%]">
          <img src={circleImage} alt="circle" className="w-full  " />
        </div>
      </div>
    </div>
  );
};

export default Blog;
