import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { backend_resource } from "../../util/variables";


export default function MediaCard({ item }) {

  React.useEffect(() => {
    console.log('Item: ', item);

  }, [])

  return (
    <div className=" mx-5 md:mx-0 mb-5 rounded-2xl overflow-hidden md:max-w-[320px] bg-white">

      <CardMedia sx={{ height: 235 }} image={`${backend_resource}/images/${item?.images[0]?.filename}`} title="green iguana" />

      <div className="mt-4 px-4 pb-3">
        <h5 className=" text-2xl font-bold">
          {item.address}
        </h5>
        <div className=" flex flex-row justify-between items-center mb-7 mt-1">
          <span>
            $ {item.price}
          </span>
          <span className="flex items-center gap-1">
            {/* <LocationOnOutlinedIcon /> */}
            {/* Madrid VI. */}
            <p>
              {item?.units}
              {" "}
              Units
            </p>
          </span>
        </div>
        <p className="font-['Poppins'] mb-1">
          <span className=" font-semibold mr-2">Actuals CAP:</span> {item.actualCAP}%</p>
        <p className="font-['Poppins'] mb-1">
          <span className=" font-semibold mr-2">Pro Forma CAP:</span> {item.proFormaCAP}%</p>

        <p className=" font-['Poppins']">
          <span className=" font-semibold mr-2">Occupancy:</span>{item.occupancy}%</p>

      </div>
    </div>
  );
}
