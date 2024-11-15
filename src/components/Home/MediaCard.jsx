import * as React from "react";
import CardMedia from "@mui/material/CardMedia";

import { Chip } from "@mui/material";
import { formatNumberAsCurrency } from "../../util/formatNumber";

export default function MediaCard({ item }) {
  React.useEffect(() => {
    // console.log('Item: ', item);
  }, []);

  return (
    <div className=" mx-5 md:mx-0 mb-5 rounded-2xl overflow-hidden md:max-w-[320px] bg-white relative">
      <CardMedia
        sx={{ height: 235 }}
        image={`${process.env.REACT_APP_BACKEND_RESOURCE}/images/${
          item?.images[item?.defaultImage || 0]?.filename
        }`}
        title="green iguana"
      />

      <div className="mt-4 px-4 pb-3">
        <h5 className=" text-2xl font-bold">{item?.address}</h5>
        <div className=" flex flex-row justify-between items-center mb-3 mt-1">
          <span>$ {item?.price}</span>
          <span className="flex items-center gap-1">
            <p>{item?.units} Units</p>
          </span>
        </div>

        {item?.rentalIncome && (
          <p className="font-['Poppins'] mb-1">
            <span className=" font-semibold mr-2">Rent:</span>{" "}
            {formatNumberAsCurrency(item?.rentalIncome)}
          </p>
        )}
        <p className="font-['Poppins'] mb-1">
          <span className=" font-semibold mr-2">Actuals CAP:</span>{" "}
          {item?.actualCAP}%
        </p>

        <p className="font-['Poppins'] mb-1">
          <span className=" font-semibold mr-2">Pro Forma CAP:</span>{" "}
          {item?.proFormaCAP}%
        </p>

        <p className=" font-['Poppins']">
          <span className=" font-semibold mr-2">Occupancy:</span>
          {item?.occupancy}%
        </p>

        <p className=" font-['Poppins']">
          <span className=" font-semibold mr-2">Year Built:</span>
          {item?.builtYear}
        </p>

        <p className=" font-['Poppins']">
          <span className=" font-semibold mr-2">Sqft:</span>
          {item?.sqFt}
        </p>

        <p className=" font-['Poppins']">
          <span className=" font-semibold mr-2">Property Type:</span>
          {item?.propertyType}
        </p>
      </div>
      {item?.sold && (
        <Chip
          label="sold"
          color="primary"
          className="absolute right-1 top-1 cursor-pointer text-3xl font-bold"
        />
      )}
    </div>
  );
}
