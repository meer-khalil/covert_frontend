import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const MarketAnalysis = ({ zipCode, data, capData }) => {
  const [rentGrowth, setRentGrowth] = useState(0);
  const [capAverage, setCapAverage] = useState(0);

  function calculateCAGR(values) {
    if (values.length < 2) {
      return 0; // CAGR is not defined for a single value or an empty array.
    }

    const initial = values[0];
    const final = values[values.length - 1];
    const n = values.length - 1; // Number of periods

    if (initial === 0) {
      return 0; // Avoid division by zero if the initial value is zero.
    }

    const cagr = (Math.pow(final / initial, 1 / n) - 1) * 100;
    return cagr;
  }

  function calculateAverageCapRate(capRates) {
    const sumOfCapRates = capRates.reduce(
      (total, capRate) => total + capRate,
      0
    );
    const averageCapRate = sumOfCapRates / capRates.length; // Divide by the number of years (10).

    return averageCapRate;
  }

  useEffect(() => {
    if (data?.length > 0) {
      console.log("RentData: ", data);
      let values = data.map((e) => e.value);
      let growth = calculateCAGR(values);
      console.log("Growth: ", growth);
      setRentGrowth(growth.toFixed(2));
    }

    if (capData?.length > 0) {
      console.log("capData: ", capData);
      let values = capData.map((e) => e.value);
      let cap = calculateAverageCapRate(values);
      console.log("Cap: ", cap);
      setCapAverage(cap.toFixed(2));
    } else {
      console.log("CapData from Else: ", capData);
    }
  }, []);

  // useEffect(() => {

  // Fetch data from the API
  // api.get(`/zipcode/${zipcode}?category=medianGrossRent`)
  //   .then((response) => {
  //     console.log("Res: ", response);
  //     const data = response.data;
  //     console.log("Data: ", data);

  //     // Extract years and populations from the API response
  //     const years = data?.map((item) => item.year);
  //     const populations = data?.map((item) => item.value);

  //     console.log('Populations: ', populations);

  //     if(populations?.length > 0) {
  //       setRentGrowth(calculateCAGR(populations))
  //     }
  //   })
  //   .catch((error) => {
  //     console.error('Error fetching data:', error);
  //   });
  // }, []);

  return (
    <div className="md:flex-1">
      <div className="mt-12 mb-12">
        <Box>
          <Typography
            sx={{
              fontSize: "30px",
              fontWeight: "bold",
              letterSpacing: "2px",
            }}
          >
            Market Analysis
          </Typography>
          <Divider
            sx={{
              width: "15%",
              height: "5px",
              bgcolor: "#716EDC",
              borderRadius: "13px",
            }}
          />
        </Box>
      </div>

      <div className=" md:pr-32">
        {[
          {
            title: "Rent Growth",
            property: [{ title: "Average Rent Growth", value: rentGrowth }],
            link: `/data/${zipCode}/Median Gross Rent`,
          },
          {
            title: "CAP Rate",
            property: [{ title: "Cap Rate", value: capAverage }],
            link: `/data/${zipCode}/Cap Rate`,
          },
        ].map((el, i) => (
          <div
            className={`rounded-lg bg-gray-200 relative p-5 mb-9 pt-28 px-10 ${
              i !== 0 ? "mt-20" : ""
            }`}
          >
            {el.property.map((el, i) => (
              <div className="flex justify-between mb-5">
                <p className=" text-xl">{el.title}</p>
                <p className=" tet-xl font-bold">{el.value}% / Year</p>
              </div>
            ))}
            <div class="relative mt-5">
              <input
                type="range"
                min="0"
                max="100"
                value="50"
                class="slider w-full accent-primary"
              />
            </div>
            <div className="flex justify-center gap-5 mt-10">
              {/* <p>Historical Average</p> */}
              <Link to={el.link}>
                <p className=" text-lg font-semibold text-primary">
                  View Charts
                </p>
              </Link>
            </div>
            <div className="absolute -top-8  left-[40%] bg-primary w-28 h-28 flex justify-center items-center break-words rounded-full text-sm text-center text-white">
              {el.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketAnalysis;
