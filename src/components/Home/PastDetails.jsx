import Grid from "@mui/material/Grid";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Paper from "@mui/material/Paper";
import MediaCard from "./MediaCard";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";

// Images(Default)
import first from "../../images/login.png";
import second from "../../images/check.png";
import third from "../../images/check2.png";

import api from "../../util/api";

// const data = [
//   {
//     title: "Large 4-room apartment with a beautiful terrace",
//     price: 320000,
//     images: [
//       {
//         url: first
//       }
//     ],
//     units: 10,
//     actualCAP: 9.94,
//     proFormaCAP: 9.94,
//     occupancy: 80,
//   },
//   {
//     title: "Large 4-room apartment with a beautiful terrace",
//     images: [
//       {
//         url: second
//       }
//     ],
//     units: 13,
//     price: 320000,
//     actualCAP: 9.94,
//     proFormaCAP: 9.94,
//     occupancy: 80,
//   },
//   {
//     title: "Large 4-room apartment with a beautiful terrace",
//     price: 320000,
//     images: [
//       {
//         url: third
//       }
//     ],
//     units: 15,
//     actualCAP: 9.94,
//     proFormaCAP: 9.94,
//     occupancy: 80,
//   },
// ];

export default function PastDetails() {

  const [properties, setProperties] = useState([])


  const fetchData = async () => {
    let url = `/properties?showHome=true`;

    try {
      const { data } = await api.get(url)
      const { properties } = data
      setProperties(properties)
      console.log('Home data(show): ', properties);
      // alert('Here is data')
    } catch (error) {
      console.log('Error While fetching Home Properties: ', error.message);
    }
  }


  useEffect(() => {
    fetchData();
  }, [])


  return (
    <div className=" page-size">

      <Grid
        sx={{
          flexGrow: 1,
          bgcolor: " #716EDC",
          // maxWidth: "1400px",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: '50px'
        }}
        py={12}
        px={{ md: 8 }}
      // container
      >
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: 'row' },
              justifyContent: "space-between",
              alignItems: { md: 'center' },
              marginBottom: '80px'
            }}
            px={1}
          >
            <Box>
              <Typography sx={{
                fontSize: '30px',
                color: 'white',
                fontWeight: 'bold',
                letterSpacing: '2px'
              }}>Check Out Awesome Past Deals</Typography>
              <Divider sx={{ width: '50%', height: '5px', bgcolor: 'white' }} />
            </Box>
            {/* <Button
            variant="contained"
            size="small"
            sx={{
              visibility: { xs: 'hidden', md: 'visible' },
              bgcolor: "white",
              color: "black",
              fontSize: "16px",
              "&:hover": { bgcolor: "white" },
            }}
          >
            View More
          </Button> */}
          </Box>
          <div className="grid grid-cols-1 gap-y-3  md:grid-cols-3">

            {
            // (properties?.length !== 0 ? properties : data)?
            properties?.map((item, index) => (
              <div key={index}>
                <MediaCard item={item} />
              </div>
            ))}
          </div>

        </Grid>
      </Grid>
    </div>

  );
}
