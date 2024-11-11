import React from "react";

import bg from "../../images/webp/home/process.webp";

const data = [
  {
    title: "Sign Up",
    description:
      "Lorem ipsum dolor sit amet consectetur. Posuere est sit volutpat dolor sed quam.",
  },
  {
    title: "Get deals to you Inbox",
    description:
      "Lorem ipsum dolor sit amet consectetur. Posuere est sit volutpat dolor sed quam.",
  },
  {
    title: "Book your next property and save thousands.",
    description:
      "Lorem ipsum dolor sit amet consectetur. Posuere est sit volutpat dolor sed quam.",
  },
];

const Process = ({ cards }) => {
  return (
    <div className="md:px-[30px] md:pb-24 page-size">
      <div
        className=" h-[238px] relative flex items-center justify-center"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
        }}
      >
        <div className=" absolute top-0 right-0 bottom-0 left-0 bg-gray-700 opacity-60 z-0"></div>
        <h3 className=" text-4xl z-10 md:text-5xl text-center font-bold text-white shadow-md">
          How CovertNest Works
        </h3>
      </div>

      <div className=" relative -top-6 md:-top-9 z-20 px-2 md:px-[40px]">
        <div className="grid grid-cols-12 bg-white shadow-lg">
          {(cards || data).map((item, index) => (
            <div
              key={index}
              className={`col-span-12 sm:col-span-4 ${
                index !== 0 ? "border-t md:border-t-0 md:border-l" : ""
              } pt-16`}
            >
              <div className=" flex flex-col justify-between items-center h-full pb-10">
                <h4 className=" text-[24px] font-semibold uppercase font-inter text-center px-5">
                  {item.title}
                </h4>

                <p className=" font-poppins text-[19px] mt-[40px] leading-[30px] text-center px-10">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Process;

/*

https://api.covertnest.com/images/blog/1703050752245-DALLÂ·E 2023-12-16 22.17.16 - A detailed, colorful infographic showing the U.S. rental market trends based on Zillow's data. The infographic includes a map of the United States hig.png
*/
