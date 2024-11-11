import React, { useContext } from "react";
import { Box } from "@mui/material";
import heroBackground from "../../images/webp/home/hero_background.webp";
import { UserContext } from "../../context/UserContext";

const Hero = () => {
  const { email, setEmail, storeEmail, error } = useContext(UserContext);

  return (
    <Box
      sx={{
        height: { xs: "60vh", md: "80vh" },
        backgroundImage: `url(${heroBackground})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginBottom: { xs: 3, md: 15 },
      }}
    >
      <div className=" flex justify-center items-center flex-col max-w-[1440px]">
        <h1 className=" text-white px-4 md:px-0 font-medium font-jost leading-[40px] lg:leading-[80px] text-[24px] md:text-[45px] lg:text-[72px] text-center">
          Unbelievable Off Market Deal
          <br /> at a discounted Rate.
        </h1>

        <Box>
          <label className="relative text-gray-400 focus-within:text-gray-600 block bg-red-400 max-w-[524px] md:w-[524px] my-[25px] md:my-[50px] rounded-lg md:rounded-xl overflow-hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 left-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>

            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="email@example.com"
              className="form-input border border-gray-900 py-2 md:py-3 px-4 bg-white placeholder-gray-400 text-gray-500 appearance-none w-full block pl-14 focus:outline-none"
            />
          </label>

          {error && (
            <p className=" text-white font-bold text-xl -mt-5">{error}</p>
          )}
          <div className=" text-center">
            <button
              className="bg-primary text-white uppercase tracking-[1px] font-medium rounded-md md:rounded-[12px] w-[120px] md:w-[168px] h-[42px] md:h-[54px] text-[16px] md:text-[21px]"
              onClick={storeEmail}
            >
              Sign Up
            </button>
          </div>
        </Box>
      </div>
    </Box>
  );
};

export default Hero;
