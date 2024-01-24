import React, { useState, useEffect, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";

import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";

import Logo from "../../components/Home/Logo";

import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import twitter from "../../images/twitter.svg";
import facebook from "../../images/facebook.svg";
import google from "../../images/google.svg";

import login from "../../images/upgrade.png";
import { Divider } from "@mui/material";
import api from "../../util/api";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const icons = [twitter, facebook, google];

const data = [
  "Have access to complete list of off market deals",
  "Never miss a deal",
  "All deal sent to you directly via email",
  "Renew automatially, cancel anytime.",
  "Secret access to handful of bonus deals",
];

const theme = createTheme();

export default function Upgrade() {

  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const [upgrade, setUpgrade] = React.useState(null);

  const fetchPageData = async () => {
    try {
      const { data } = await api.get("/pages/upgrade");

      setUpgrade(data);

      console.log("Upgrade Data: ", data);
    } catch (error) {
      console.error("Failed to Get the Home Data:", error.message);
    }
  };

  React.useEffect(() => {
    fetchPageData();
  }, []);

  const handleClick = async () => {
    if (!user) {
      navigate("/signup")
    } else {
      const { data } = await api.post('/payment/process')
      window.location.href = data.url
    }
  }

  return (
    <div className=" max-w-[1440px] mx-auto lg:max-h-[800px]">
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <Grid
            item
            xs={12}
            sm={8}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
              alignItems: "start",
              justifyContent: "start",
            }}
          >
            <Box sx={{ width: "150px", marginLeft: "5px", marginTop: "30px" }}>
              <Logo />
            </Box>
            <Box
              sx={{
                mt: 4,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar> */}
              <Box sx={{ alignSelf: "start" }}>
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    letterSpacing: "2px",
                    fontSize: { xs: 18, md: 25 },
                    marginBottom: "5px",
                    maxWidth: "400px",
                  }}
                >
                  {upgrade?.title}
                </Typography>
                <Divider
                  sx={{ width: "20%", height: "3px", bgcolor: "#3296ff", mb: 3 }}
                />
              </Box>

              <List
                sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              >
                {upgrade?.benefits.map((item) => (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          color: "blue",
                          bgcolor: "rgba(113, 110, 220, 0.19)",
                        }}
                      >
                        <AssignmentTurnedInOutlinedIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleClick}
                sx={{
                  mt: 3,
                  mb: 2,
                  p: 1,
                  bgcolor: "#716EDC",
                  "&:hover": {
                    backgroundColor: "#716EDC",
                  },
                }}
              >
                Upgrade Now
              </Button>
            </Box>
          </Grid>
          <Grid
            xs={false}
            sm={4}
            md={6}
            mt={2}
            pr={3}

            sx={{
              // backgroundImage: "url(https://source.unsplash.com/random)",
              backgroundImage: `url(${login})`,
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              alignItems: "center",
            }}
            borderRadius={4}
            item
          >
            <Box
              sx={{
                width: "300px",
                height: "280px",
                bgcolor: "rgba(255, 255, 255, 0.31)",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center ",
                flexDirection: "column",
                gap: "10px",
                fontSize: "40px",
              }}
            >
              {["PREMIUM", "$49", "Billed Anually"].map((item) => (
                <Typography
                  sx={{ fontSize: "20px", fontWeight: "bold", color: "white" }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}
