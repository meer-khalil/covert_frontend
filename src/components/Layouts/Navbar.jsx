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

import logo from '../../images/logo.png'
import person from '../../images/haris triston 2.jpeg';
import { Link } from "react-router-dom";

import { UserContext } from '../../context/UserContext'

const drawerWidth = 240;
const navItems = [
  { item: "Home", url: `/` },
  { item: "Buy", url: `/buy` },
  { item: "Sell", url: `/sell-property` },
  { item: "Data", url: `/data` },
  { item: "About", url: "/about" },
  { item: "Blog", url: "/blogs" },
];

// const navItems = []

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useContext(UserContext)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems?.map((item) => (
          <ListItem key={item.item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item.item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className=" fixed top-0 right-0 left-0 z-40 bg-white" style={{
      boxShadow: ' 0 5px 2px 2px rgba(209, 205, 208, 0.4)'
    }}>
      <nav className=" max-w-[1440px] mx-auto bg-white py-2">
        <div className=" flex items-center px-4 justify-between">
          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton> */}
          {/* <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography> */}
          <Box sx={{
            width: "150px",
            // display: { xs: "none", sm: "block"} 
          }}>
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
            {
            /*
              (
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
            } */}

          </Box>
        </div>
      </nav>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
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

// DrawerAppBar.propTypes = {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window: PropTypes.func,
// };

export default DrawerAppBar;
