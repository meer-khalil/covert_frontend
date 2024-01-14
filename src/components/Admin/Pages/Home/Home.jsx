import React, { useContext, useEffect, useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Typography from "@mui/material/Typography";

import { Divider } from "@mui/material";
import Card from "./Card";
import { toast } from "react-toastify";
import api from "../../../../util/api";

export default function Home() {

  const [commingSoon, setCommingSoon] = useState("");
  const [cardsData, setCardsData] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      commingSoon,
      cardsData,
    };

    updateHomeData(data);
  };

  async function updateHomeData(_data) {
    try {
      const { data } = await api.put(`/pages/home`, _data);
      console.log("Home Updated: ", data);
      toast("Updated")
    } catch (error) {
      console.log("Error While Updating Home Data: ", error?.message);
      toast("Error")
    }
  }

  async function fetchData() {
    let url = "/pages/home";
    const { data } = await api.get(url);
    console.log("Home Data: ", data);
    setCommingSoon(data.commingSoon);
    setCardsData(data.cardsData);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='flex justify-center'>
      <div className='w-full max-w-2xl'>

        <div>
          <p className=" text-primary font-bold tracking-[2px] text-lg mb-1">
            Home Data
          </p>
          <Divider
            sx={{ width: "20%", height: "3px", bgcolor: "#3296ff", mb: 3 }}
          />
        </div>
        <form onSubmit={handleSubmit} className='flex-1'>

          <div>
            <TextField
              label="Comming Soon Text"
              variant="outlined"
              name="commingSoon"
              value={commingSoon}
              onChange={(e) => setCommingSoon(e.target.value)}
              fullWidth
              autoComplete="off"
              inputProps={{ style: { fontSize: 15 } }}
              InputLabelProps={{
                style: { fontSize: 15, color: "GrayText" },
              }}
              multiline
              rows={8}
            />

            <Typography
              component="h1"
              variant="h5"
              sx={{
                fontWeight: "bold",
                letterSpacing: "2px",
                fontSize: 25,
                mt: 4,
                marginBottom: "5px",
              }}
            >
              Card Details
            </Typography>

            {
              (cardsData.length > 0) && (
                <>
                  <Card
                    card={cardsData[0]}
                    index={0}
                    cardsData={cardsData}
                    setCardsData={setCardsData}
                  />
                  <Card
                    card={cardsData[1]}
                    index={1}
                    cardsData={cardsData}
                    setCardsData={setCardsData}
                  />
                  <Card
                    card={cardsData[2]}
                    index={2}
                    cardsData={cardsData}
                    setCardsData={setCardsData}
                  />
                </>
              )}
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
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
            Update
          </Button>
        </form>


      </div>
    </div>
  );
}
