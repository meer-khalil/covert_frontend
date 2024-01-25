import Grid from "@mui/material/Grid";
import MediaCard from "./MediaCard";
import { Box, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../util/api";


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
