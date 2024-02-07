import { Box, Grid, Typography, Divider } from "@mui/material";
import React from "react";

import image from "../../images/webp/home/below_hero.webp";

const Detail = ({ whatWeDo }) => {
    return (
        <div className="my-10 px-5">
            <div className=" flex flex-col md:flex-row gap-3">
                <div className=" flex-1 flex justify-center">
                    <div className="rounded-xl max-h-min max-w-xl overflow-hidden"
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
                        <Divider sx={{ width: '10%', height: '5px', bgcolor: '#716EDC', borderRadius: '13px' }} />
                    </div>

                    <p className=" w-[95%] font-[Poppins] font-normal text-justify mt-2">
                        {whatWeDo}
                    </p>
                </div>
            </div>
        </div >
    );
};

export default Detail;
