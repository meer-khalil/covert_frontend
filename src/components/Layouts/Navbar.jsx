import React, { useContext } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";

import Logo from "../Home/Logo";

import person from "../../images/haris triston 2.jpeg";
import { Link } from "react-router-dom";

import { UserContext } from "../../context/UserContext";
import NewDrawer from "./NewDrawer";

const drawerWidth = 240;

const navItems = [
  { item: "Home", url: `/` },
  { item: "Buy", url: `/buy` },
  { item: "Sell", url: `/sell-property` },
  { item: "Data", url: `/data` },
  { item: "About", url: "/about" },
  { item: "Blog", url: "/blogs" },
];

function DrawerAppBar(props) {
  const { window } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, logout } = useContext(UserContext);

  const handleDrawerToggle = () => {
    setIsOpen(true);
  };

  return (
    <div
      className=" fixed top-0 right-0 left-0 z-40 bg-white"
      style={{
        boxShadow: " 0 5px 2px 2px rgba(209, 205, 208, 0.4)",
      }}
    >
      <nav className=" max-w-[1440px] mx-auto bg-white py-2">
        <div className=" flex items-center flex-row-reverse md:flex-row px-3 lg:px-4 justify-between">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ width: "150px" }}>
            <Logo />
          </Box>
          <Box
            sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}
          >
            {navItems?.map((item, index) => (
              <Link
                key={index}
                to={item.url}
                style={{
                  color: "#000",
                  letterSpacing: "2px",
                  textDecoration: "none",
                  marginRight: "30px",
                }}
              >
                {item.item}
              </Link>
            ))}
            {user ? (
              <>
                <Link to={`/subscription`} style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#716EDC",
                      marginRight: "30px",
                      "&:hover": { bgcolor: "#716EDC" },
                    }}
                  >
                    Subscription
                  </Button>
                </Link>
                <div
                  className="mr-5 tracking-[2px] cursor-pointer"
                  onClick={logout}
                >
                  Logout
                </div>
                <img
                  style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                  src={person}
                  alt="logo"
                />
              </>
            ) : (
              <>
                <Link
                  to={`/login`}
                  style={{
                    color: "#000",
                    letterSpacing: "2px",
                    textDecoration: "none",
                    marginRight: "30px",
                  }}
                >
                  Login
                </Link>
                <Link to={`/subscription`} style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#716EDC",
                      marginRight: "30px",
                      "&:hover": { bgcolor: "#716EDC" },
                    }}
                  >
                    Subscription
                  </Button>
                </Link>
              </>
            )}
          </Box>
        </div>
      </nav>
      <NewDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default DrawerAppBar;
