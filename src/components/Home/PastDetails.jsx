import Grid from "@mui/material/Grid";
import MediaCard from "./MediaCard";
import { Box, Button, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";


export default function PastDetails({ properties }) {

  return (
    <div className=" page-size">

      <Grid
        sx={{
          flexGrow: 1,
          bgcolor: " #716EDC",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: '20px'
        }}
        pt={7}
        px={{ md: 8 }}
      >
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: 'row' },
              justifyContent: "space-between",
              alignItems: { md: 'center' },
              marginBottom: '40px'
            }}
            px={1}
          >
            <Box>
              <Typography sx={{
                fontSize: '30px',
                color: 'white',
                fontWeight: 'bold',
                letterSpacing: '2px'
              }}>
                Check Out Awesome Past Deals
              </Typography>
              <Divider sx={{ width: '50%', height: '5px', bgcolor: 'white' }} />
            </Box>
            <Link to={`/properties/sold`}>
              <Button
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
              </Button>
            </Link>
          </Box>
          <div className="grid grid-cols-1 gap-y-3  md:grid-cols-3">

            {
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