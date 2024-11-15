import React from "react";
import PageTitle from "../About/PageTitle";

import image from "../../images/PageTitles/BuyPageTitle.webp";
import Properteis from "./Properteis";
import BackButton from "../Common/BackButton";

const SoldProperties = () => {
  return (
    <>
      <PageTitle title="Sold Properties" image={image} small={true} />
      <div className="page-size">
        <div className=" pl-5 my-3">
          <BackButton />
        </div>
        <Properteis />
      </div>
    </>
  );
};

export default SoldProperties;
