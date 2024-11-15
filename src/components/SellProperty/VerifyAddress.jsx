import React, { useContext } from "react";

import image from "../../images/check.webp";
import { TextField } from "@mui/material";
import { PropertyContext } from "../../context/PropertyContext";

function VerifyAddress() {
  const { propertyData, handlePropertyData } = useContext(PropertyContext);

  return (
    <>
      <div className="shodow-lg mx-5 md:mx-20 border-2 border-gray-200 md:h-64 overflow-hidden rounded-md flex flex-col md:flex-row md:items-center p-3 gap-5">
        <div className=" md:flex-[2] flex items-center">
          <div className=" md:w-6/12 md:ml-20">
            <img src={image} className="w-full h-full" alt="" />
          </div>
        </div>
        <div className="md:flex-[3]">
          <div className=" md:mr-20">
            <TextField
              label="Enter Your Address"
              variant="outlined"
              name="address"
              value={propertyData?.address}
              onChange={handlePropertyData}
              fullWidth
              autoComplete="off"
              inputProps={{ style: { fontSize: 15 } }}
              InputLabelProps={{
                style: { fontSize: 15, color: "GrayText" },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default VerifyAddress;
