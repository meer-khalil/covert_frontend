import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React, { useContext } from "react";

// import component 👇
import Drawer from "react-modern-drawer";

//import styles 👇
import "react-modern-drawer/dist/index.css";
import { Link } from "react-router-dom";
import Logo from "../Home/Logo";
import { UserContext } from "../../context/UserContext";

const NewDrawer = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useContext(UserContext);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const navItems = [
    { item: "Home", url: `/` },
    { item: "Buy", url: `/buy` },
    { item: "Sell", url: `/sell-property` },
    { item: "Data", url: `/data` },
    { item: "About", url: "/about" },
    { item: "Blog", url: "/blogs" },
  ];

  const drawer = (
    <Box sx={{ textAlign: "center" }} onClick={toggleDrawer}>
      <div className=" w-36 my-4 pl-3">
        <Logo />
      </div>

      <Divider />

      <List>
        {navItems?.map((item, index) => (
          <Link key={index} to={item.url}>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item.item} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
        {user ? (
          <ListItem onClick={logout} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        ) : (
          <>
            <Link to="/login">
              <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText primary="Login" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to={`/upgrade`} style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                sx={{ bgcolor: "#716EDC", "&:hover": { bgcolor: "#716EDC" } }}
              >
                Upgrade
              </Button>
            </Link>
          </>
        )}
      </List>
    </Box>
  );
  return (
    <>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        className="bla bla bla"
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default NewDrawer;
