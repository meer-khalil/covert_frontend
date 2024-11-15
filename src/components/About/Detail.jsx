import { Divider } from "@mui/material";
import React from "react";

import image from "../../images/webp/home/below_hero.webp";

const Detail = ({ whatWeDo }) => {
  return (
    <div className="my-10 px-5">
      <div className=" flex flex-col md:flex-row gap-3">
        <div className=" flex-1 flex justify-center">
          <div
            className="rounded-xl max-h-min max-w-xl overflow-hidden"
            style={{ boxShadow: "25px 25px 0px #716EDC" }}
          >
            <img
              src={image}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              alt="Right Section"
            />
          </div>
        </div>
        <div className=" flex-1">
          <div className=" my-5">
            <p className=" text-4xl font-bold tracking-[2px]">What We Do</p>
            <Divider
              sx={{
                width: "10%",
                height: "5px",
                bgcolor: "#716EDC",
                borderRadius: "13px",
              }}
            />
          </div>

          <p className=" w-[95%] font-[Poppins] font-normal text-justify mt-2">
            {
              whatWeDo
              // || "At CovertNest, we are revolutionizing the real estate investment landscape by bridging the gap between off-market opportunities and investors nationwide. Our mission is to streamline the process of investing in real estate, particularly for those seeking to expand their portfolio out of state. Here’s how we're transforming the real estate investment journey: Bringing Off-Market Deals Online: We specialize in uncovering hidden gems in the real estate market. Our platform provides exclusive access to off-market properties, offering our clients a unique advantage in finding lucrative investment opportunities that are not available to the general public. Empowering Out-of-State Investments: We understand the challenges of investing in properties outside your local area. Our comprehensive online tools and resources are designed to give investors the confidence and knowledge to purchase properties anywhere in the country, breaking geographical barriers to investment. Comprehensive Investor Support: Our commitment to your investment journey goes beyond property acquisition. We connect investors with an extensive network of lenders to secure the best financing options available for their investment strategy. End-to-End Property Management Connection: Recognizing the importance of effective property management, we connect investors with top-tier property managers. This ensures your investment is professionally maintained and managed, maximizing its value and rental potential. Network of Vetted Professionals: We believe in the power of professional support. Our network includes thoroughly vetted handymen, contractors, property inspectors, and appraisers. Each professional is selected for their expertise, reliability, and alignment with our high standards, ensuring that your investment is in capable hands. Seamless Integration of Services: Our platform seamlessly integrates these services, providing a one-stop solution for real estate investors. From browsing off-market deals to managing a newly acquired property, every step is streamlined and simplified. Ongoing Support and Education: We are committed to the growth and education of our investors. Our platform offers insights, market trends, and educational resources to keep you informed and ahead in the real estate investment game. At CovertNest, we are more than just a platform; we are a partner in your real estate investment journey. Join us to redefine your investing experience, expand your portfolio, and unlock the full potential of the real estate market."
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
