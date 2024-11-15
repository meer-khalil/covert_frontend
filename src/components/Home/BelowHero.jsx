import { Box, Grid } from "@mui/material";
import React from "react";

import image from "../../images/webp/home/below_hero.webp";

const BelowHero = ({ commingSoon }) => {
  return (
    <div
      className="
    page-size 
    pt-7 md:pt-[40px] pb-10 md:pb-[203px] px-5 md:px-[60px]
    "
    >
      <Grid container spacing={6}>
        <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
          <h3 className=" font-[Poppins] font-semibold text-[38px] leading-[3rem] pt-[21px]">
            Great off Market deals across mutiple States.
          </h3>

          <p className=" text-[31px] text-primary font-semibold">
            More States coming soon
          </p>
          <p className=" font-[Poppins] font-normal text-lg text-justify mt-2">
            {commingSoon ||
              "When you sign up you’ll get deals with information catered specifically to your choice of State or City. Each deal is personally designed by our team to meet the needs of indivitual investor. We only send deals we would recommend to our family and friends."}
          </p>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          order={{ xs: 1, md: 2 }}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            width={{ xs: "100%", md: "516px" }}
            height={{ xs: "100%", md: "524px" }}
            sx={{
              justifySelf: "end",
              boxShadow: { md: "-50px 48px 0px #716EDC" },
              borderRadius: "15px",
              overflow: "hidden",
            }}
          >
            <img
              src={image}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              alt="Right Section"
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default BelowHero;

/*
create react component Process with mui
There are two section inside this component
First component has background image and has title
Second component has three sections side by side
each side has title and description, centered aligned
there is also two deviders between these three sections
Create the component without using the use
*/
