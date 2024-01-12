import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import loginPic from '../../images/login.png';
import Logo from '../Home/Logo';

import Typography from "@mui/material/Typography";

import twitter from "../../images/twitter.svg";
import facebook from "../../images/facebook.svg";
import google from "../../images/google.svg";

import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

const icons = [twitter, facebook, google];

export default function Login() {

  const { login } = useContext(UserContext)

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    }
    console.log(data);
    login(data)
  };

  return (

    <div className=" grid grid-cols-12 md:h-screen lg:max-h-[800px] page-size">
      <div
        className=" items-start md:pl-12 col-span-12 sm:col-span-8 md:col-span-6 flex flex-col gap-0"
      >

        <div className="flex justify-center w-full">
          <div
            className=" flex flex-col max-w-xl mx-2"
          >
            <div
              className=" w-[150px] mt-10"
            >
              <Logo />
            </div>
            <div className="mt-14">
              <h3
                className=" font-bold tracking-[2px] text-4xl"
              >
                Welcome Back
              </h3>
              <Typography>Reach back to your account.</Typography>
            </div>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                password="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Typography sx={{ alignSelf: "end", textAlign: "end" }}>
                Forgot password?
              </Typography>
              <div className=" text-center mt-8 mb-4" >
                <button class="bg-primary text-white font-medium w-full md:w-[464px] h-[42px] md:h-[54px] text-[16px] md:text-[21px]">
                  Log In
                </button>
              </div>

              <p className=" text-center">
                Don't have an account?
                <Link to="/signup">
                  <span
                    className=" font-bold ml-2"
                  >
                    Sign Up
                  </span>
                </Link>
              </p>

              {/* <p className=" text-center mt-2" sx={{ textAlign: "center", marginTop: 3 }}>
              or Login with
            </p>
            <div
              className=" flex justify-center items-center gap-2 mt-4"
            >
              {icons.map((icon) => (
                <img
                  className=" w-max"
                  alt="icon"
                  src={icon}
                />
              ))}
            </div> */}
            </Box>
          </div>
        </div>

      </div>
      <div className=" hidden py-8 sm:block col-span-12 sm:col-span-4 md:col-span-6">
        <div className=" max-w-xl h-full">
          <div
            className=" h-full w-full rounded-3xl"
            style={{
              backgroundImage: `url(${loginPic})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
