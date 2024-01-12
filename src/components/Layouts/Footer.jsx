import React, { useContext } from "react";
import { Box, Button, Grid, List, ListItem, Typography } from "@mui/material";
import EmailInput from "../Home/EmailInput";
import Logo from '../Home/Logo'
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Footer = () => {

  const { email, setEmail, storeEmail } = useContext(UserContext)

  const menuList1 = ["Home", "Services", "Pricing", "Contact"];

  const menuList2 = ["Our Team", "Projects", "Blog", "FAQ"];

  const menuList3 = [
    "Terms and Conditions",
    "Privacy Policy",
    "Refund Policy",
    "Support",
  ];

  const menusList = [
    // { title: "Features", menu: menuList1 },
    // { title: "Information", menu: menuList2 },
    // { title: "Popular Search", menu: menuList3 },
  ];


  const hanldeSubmit = () => {
    storeEmail(email);
  }
  return (
    <div className=" page-size">

      <Box py={10} className="px-5">
        <Box sx={{ maxWidth: "1200px", mx: "auto", pt: 5, pb: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={6} md={3}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ width: "100%" }}>
                  <Box className="w-[164px]">
                    <Logo />
                  </Box>
                  <Typography
                    sx={{
                      mt: 3,
                      fontSize: "16px",
                      fontWeight: "bold",
                      letterSpacing: "2px",
                    }}
                  >
                    Find out your dream investment
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Utah
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Call Us: +1 385-337-4380
                  </Typography>
                </Box>
              </Box>
            </Grid>
            {menusList.map((menu) => (
              <Grid item xs={6} md={2}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {menu.title}
                </Typography>

                <List sx={{ listStyleType: "none", padding: 0 }}>
                  {menu.menu.map((item) => (
                    <ListItem key={item} sx={{ marginTop: 1, paddingLeft: 0 }}>
                      <Typography variant="body2" sx={{ marginLeft: 0 }}>
                        {item}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            ))}
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Subscribe
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Subscribe to get the latest news from us
              </Typography>
              <div className="flex gap-2" onSubmit={hanldeSubmit}>

                <EmailInput />
                <Button
                  variant="contained"
                  sx={{ bgcolor: "#716EDC", "&:hover": { bgcolor: "#716EDC" } }}
                  onClick={storeEmail}
                >
                  Sign Up
                </Button>

              </div>

              {/* <div className="flex flex-col gap-6">
              <Link to='/property-details'>
                Property Details
              </Link>
              <Link to='/buy-property'>
                Buy Property
              </Link>
              <Link to='/signup'>
                SignUP
              </Link>
            </div> */}
            </Grid>
          </Grid>
        </Box>
      </Box >
    </div>

  );
};

export default Footer;
