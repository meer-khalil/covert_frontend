import { Button } from "@mui/material";
import React from "react";
import api from "../../util/api";
import { useLocation, useNavigate } from "react-router-dom";

const DialogBox = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  console.log(pathname);
  const handleClick = async () => {
    const { data } = await api.post("/payment/process");
    window.location.href = data.url;
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className=" fixed bg-gray-500 bg-opacity-60 left-0 top-0 right-0 bottom-0 z-30 flex justify-center items-center h-screen">
      <div className=" max-w-xl w-full bg-white rounded-lg py-5 px-8">
        <div className="prose">
          <h1 className=" text-primary font-poppins font-bold">
            To Unleash Full Benefits
          </h1>
          <p className=" font-poppins uppercase text-xl tracking-[3px]">
            Upgrade to Premium Memebership
          </p>
        </div>
        <div className=" text-end mt-10">
          <Button
            variant="contained"
            sx={{
              bgcolor: "#D3D3D3",
              marginRight: "10px",
              color: "black",
              "&:hover": { bgcolor: "#635A5A", color: "white" },
            }}
            onClick={goHome}
          >
            Back
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: "#716EDC", "&:hover": { bgcolor: "#716EDC" } }}
            onClick={handleClick}
          >
            Upgrade
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
