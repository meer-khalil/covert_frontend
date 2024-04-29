import React from "react";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../util/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { formatNumberAsCurrency } from "../../util/formatNumber";
import { BiFileBlank } from "react-icons/bi";

const BasicDetail = ({ property }) => {
  const [info, setInfo] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    console.log("[BasicDetail] Property: ", property);
  }, []);

  const searchCityInfo = () => {
    api
      .get(`/properties/wikipedia?query=${property.zipcode}`)
      .then((response) => {
        console.log("response: wiki: ", response);
        let { data, city } = response.data;
        const pageId = Object.keys(data.query.pages)[0];
        const content = data.query.pages[pageId].extract;
        console.log("content is not there: ", content);
        setInfo(content);
        setCity(city);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    searchCityInfo();
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center w-full overflow-hidden">
        <h2 className="text-[35px] font-semibold flex-1">{property.address}</h2>

        <div className=" flex flex-col md:flex-row md:items-center gap-6">
          <h3 className=" text-blue-500 font-semibold text-[44px]">
            {formatNumberAsCurrency(property.price)}
          </h3>

          <Link to="/schedual/meeting" rel="noreferrer" target={"_blank"}>
            <Button
              // className='rounded-lg bg-primary text-white font-semibold text-[21px]'
              variant="contained"
              size="large"
            >
              Schedule Meeting
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex gap-4 my-3">
        {/* <div className='flex items-center gap-1 bg-yellow-50 rounded-xl px-2'>
          <StarIcon style={{
            color: '#FFD700'
          }} />
          {property.rating}
        </div> */}
        <p className=" text-[21px]">{property.units} units</p>
      </div>

      <div className="flex text-[21px] flex-wrap flex-col md:flex-row gap-1 md:gap-8 my-4">
        {[
          {
            text: "Rental Property Income:",
            value: `$${property.rentalIncome}`,
          },
          {
            text: "Actuals CAP:",
            value: `${property.actualCAP}%`,
          },
          {
            text: "Pro Forma CAP:",
            value: `${property.proFormaCAP}%`,
          },
          {
            text: "Occupancy:",
            value: `${property.occupancy}%`,
          },
          {
            text: "Year Built:",
            value: property.builtYear,
          },
          {
            text: "Property Type",
            value: property.propertyType,
          },
        ].map((el, i) => (
          <>
            {i === 0 ? (
              <p className="font-['Poppins'] mb-1">
                <span className=" font-semibold mr-2">{el.text}</span>{" "}
                {el.value}
              </p>
            ) : (
              <>
                <span className="hidden md:inline">|</span>
                <p className="font-['Poppins'] mb-1">
                  <span className=" font-semibold mr-2">{el.text}</span>{" "}
                  {el.value}
                </p>
              </>
            )}
          </>
        ))}
      </div>

      {/* <div className='my-8'>
        <Box>
          <Typography sx={{
            fontSize: '30px',
            fontWeight: 'bold',
            letterSpacing: '2px',
          }}>
            Top Features
          </Typography>
          <Divider sx={{ width: '10%', height: '5px', bgcolor: '#716EDC', borderRadius: '13px' }} />
        </Box>
      </div>


      <div className='flex items-center justify-between flex-wrap my-5'>
        {
          property?.features?.map((feature, index) => (
            <div className='flex items-center gap-2' key={index}>
              <CheckCircleOutlineOutlinedIcon sx={{ color: 'blue' }} />
              <span>{feature}</span>
            </div>
          ))
        }
      </div> */}

      <div className="mt-12 mb-5">
        <Box>
          <h3 className=" text-2xl font-bold tracking-[2px]">Description</h3>
          <Divider
            sx={{
              width: "4%",
              height: "5px",
              bgcolor: "#716EDC",
              borderRadius: "13px",
            }}
          />
        </Box>
      </div>
      <p className="whitespace-pre">
        {property?.description || "If you are admin, add description"}
      </p>

      <div className="mt-12 mb-5">
        <Box>
          <h3 className=" text-2xl font-bold tracking-[2px]">Details</h3>
          <Divider
            sx={{
              width: "4%",
              height: "5px",
              bgcolor: "#716EDC",
              borderRadius: "13px",
            }}
          />
        </Box>
      </div>

      <div className=" mb-5">
        <p className="">
          {info?.length > 1000 ? (
            <>
              {info.slice(0, 1000) + "..."}
              <a
                href={`https://en.wikipedia.org/wiki/Special:Search?search=${city}`}
                target="_blank"
                rel="noopener noreferrer"
                className=" text-blue-500"
              >
                See More
              </a>
            </>
          ) : (
            <>{info}</>
          )}
        </p>
      </div>

      {property?.files?.length > 0 && (
        <div className="mt-12 mb-5">
          <Box>
            <h3 className=" text-2xl font-bold tracking-[2px]">Files</h3>
            <Divider
              sx={{
                width: "4%",
                height: "5px",
                bgcolor: "#716EDC",
                borderRadius: "13px",
              }}
            />
            <div className="flex flex-col gap-1 mt-2">
              {property.files.map((file, index) => {
                // If file has a label, show the label, otherwise show the filename
                return (
                  <div className="flex items-center gap-1 w-full">
                    <BiFileBlank className="w-8 h-8 text-gray-600" />
                    <p className="w-full text-ellipsis text-gray-800">{file.label || file.filename}</p>
                  </div>
                );
              })}
            </div>
          </Box>
        </div>
      )}
    </>
  );
};

export default BasicDetail;
