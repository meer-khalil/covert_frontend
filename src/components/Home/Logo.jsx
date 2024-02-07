import React from "react";
import { Link } from "react-router-dom";

import logo from "../../images/Logo/color_logo_no_background.png";

function Logo() {
  return (
    <Link to={`/`}>
      <img
        src={logo}
        alt="logo"
        style={{
          width: "100%",
        }}
      />
    </Link>
  );
}

export default Logo;
