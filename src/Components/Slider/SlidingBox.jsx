import React, { useState, useEffect } from "react";

const slides = [
  {
    title: "Quick and Easy Process!",
    description:
      "I was surprised by how fast and easy the loan approval process was! I got the funds I needed within 24 hours, and the customer support was always there to help. Highly recommend!",
  },
  {
    title: "Fast Approval and Disbursal",
    description:
      "Online approval within 48 hours with less documentation to those needing the loan urgently.",
  },
  {
    title: "No Geographical Limitations",
    description:
      "The platform is also accessible in many underserved areas with an internet connection.",
  },
  {
    title: "Flexible Repayment Options",
    description:
      "The repayment options were very flexible, which made it easier for me to manage my monthly payments. I appreciated the transparency on fees and interest rates, with no hidden surprises!.",
  },
  {
    title: "Great Customer Service",
    description:
      "The platform is also accessible in many underserved areas with an internet connection.I had a few questions about my loan, and the support team was super helpful and patient with me. They explained everything clearly and made sure I was comfortable with the terms.",
  },
  {
    title: "Simple Application Process",
    description:
      "Applying for a loan was hassle-free and took only a few minutes. The online platform was user-friendly, and I could upload my documents easily from home.",
  },
  {
    title: "Competitive Interest Rates",
    description:
      "The interest rates here were much better than other sites I checked. I saved a lot over the term of my loan, and I’m glad I chose this service.",
  },
  {
    title: "Excellent Experience",
    description:
      "I’ve used a few other loan services, but this one stood out with its user-friendly platform, responsive service, and clear communication. I'll definitely return if I need another loan.",
  },
];

export default function SlidingBox() {
  const [slider, setSlider] = useState(0);

  const handelright = () => {
    setSlider(slider === slides.length - 1 ? 0 : slider + 1);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handelright();
    }, 2000);
    return () => {
      clearInterval(timer);
    };
  }, [slider]);

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="relative overflow-hidden border border-gray-200 shadow-lg rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${slider * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 p-6 text-center bg-gray-50"
            >
              <h3 className="text-lg md:text-xl font-bold">{slide.title}</h3>
              <p className="mt-2 text-sm md:text-base text-gray-600">
                {slide.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
