import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Logo from '../Home/Logo'

import person from '../../images/haris triston 2.jpeg';
import { Link, useNavigate } from "react-router-dom";

import { UserContext } from '../../context/UserContext'

const drawerWidth = 240;

const navItems = [
  { item: "Home", url: `/` },
  { item: "Buy", url: `/buy` },
  { item: "Sell", url: `/sell-property` },
  { item: "Data", url: `/data` },
  { item: "About", url: "/about" },
  { item: "Blog", url: "/blogs" }
];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useContext(UserContext)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box sx={{ textAlign: "center" }} onClick={handleDrawerToggle}>
      <div className=" w-36 my-4 pl-3">
        <Logo />
      </div>

      <Divider />

      <List>
        {navItems?.map((item) => (
          <Link key={item.item} to={item.url}>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item.item} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
        {
          user ? (
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
              <Link to="/signup">
                <ListItem disablePadding>
                  <ListItemButton sx={{ textAlign: "center" }}>
                    <ListItemText primary="Signup" />
                  </ListItemButton>
                </ListItem>
              </Link>
            </>
          )
        }
      </List>
    </Box>
  );

  return (
    <div className=" fixed top-0 right-0 left-0 z-40 bg-white" style={{
      boxShadow: ' 0 5px 2px 2px rgba(209, 205, 208, 0.4)'
    }}>
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
          <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: 'center' }}>
            {navItems?.map((item) => (
              <Link
                to={item.url}
                style={{
                  color: "#000",
                  letterSpacing: "2px",
                  textDecoration: "none",
                  marginRight: '30px'
                }}
              >
                {item.item}
              </Link>
            ))}
            {
              user ? (
                <>
                  <div
                    className="mr-5 tracking-[2px] cursor-pointer"
                    onClick={logout}
                  >
                    Logout
                  </div>
                  <img style={{ width: '30px', height: '30px', borderRadius: '50%' }} src={person} alt="logo" />
                </>

              ) : (
                <>
                  <Link
                    to={`/login`}
                    style={{
                      color: "#000",
                      letterSpacing: "2px",
                      textDecoration: "none",
                      marginRight: '30px'
                    }}
                  >
                    Login
                  </Link>

                  <Link
                    to={`/upgrade`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      variant="contained"
                      sx={{ bgcolor: "#716EDC", "&:hover": { bgcolor: "#716EDC" } }}
                    >
                      Upgrade
                    </Button>
                  </Link>
                </>
              )
            }
          </Box>
        </div>
      </nav>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </div>
  );
}

export default DrawerAppBar;
