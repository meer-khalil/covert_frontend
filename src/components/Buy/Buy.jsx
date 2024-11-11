import React, { useContext } from "react";
import PageTitle from "../About/PageTitle";

import image from "../../images/PageTitles/BuyPageTitle.webp";

import ListingGrid from "./ListingGrid";
import { UserContext } from "../../context/UserContext";
import LoginDialogBox from "./LoginDialogBox";

function Buy() {
  const { user } = useContext(UserContext);

  return (
    <>
      <PageTitle title="Buy" image={image} small={true} />
      <div className=" page-size">
        {user ? <ListingGrid /> : <LoginDialogBox />}
      </div>
    </>
  );
}

export default Buy;
