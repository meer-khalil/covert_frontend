import React from "react";

// import map from '../../images/map.png'
import GoogleMap from "./GoogleMap";

const Map = ({ zipCode }) => {
  return (
    <div className="h-[500px] rounded-[16px] relative w-full">
      <GoogleMap zipCode={zipCode} />
    </div>
  );
};

export default Map;
