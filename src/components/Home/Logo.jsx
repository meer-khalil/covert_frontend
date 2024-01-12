import React from "react";
import { Link } from "react-router-dom";

import logo from "../../images/Logo/color_logo_no_background.png";

function Logo() {
  return (
    <Link
      to={`${process.env.PUBLIC_URL}/`}
      style={{
        textDecoration: "none",
      }}
    >
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
