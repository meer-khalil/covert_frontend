import React, { useState, useEffect } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import api from "../../../../util/api";

const About = () => {
  const [whatWeDo, setWhatWeDo] = useState("");
  const [mission, setMission] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      whatWeDo,
      mission
    };

    updateAboutData(data);
  };

  async function updateAboutData(_data) {
    try {
      const { data } = await api.put(`/pages/about`, _data);
      console.log('About Page Updated: ', data);
      alert('AboutPage Updated');
    } catch (error) {
      console.log("Error While Updating About Data: ", error?.message);
    }
  }
  async function fetchData() {
    let url = "/pages/about";
    const { data } = await api.get(url);
    console.log("Home Data: ", data);
    setWhatWeDo(data.whatWeDo);
    setMission(data.mission);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='flex justify-center'>
      <div className='w-full max-w-2xl'>
        <form onSubmit={handleSubmit}>
          <div className="mt-3">
            <TextField
              label="What We Do"
              variant="outlined"
              name="whatWeDo"
              value={whatWeDo}
              onChange={(e) => setWhatWeDo(e.target.value)}
              fullWidth
              autoComplete="off"
              inputProps={{ style: { fontSize: 15 } }}
              InputLabelProps={{
                style: { fontSize: 15, color: "GrayText" },
              }}
              multiline
              rows={10}
            />
          </div>
          
          <div className="mt-3">
            <TextField
              label="Our Mission"
              variant="outlined"
              name="whatWeDo"
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              fullWidth
              autoComplete="off"
              inputProps={{ style: { fontSize: 15 } }}
              InputLabelProps={{
                style: { fontSize: 15, color: "GrayText" },
              }}
              multiline
              rows={8}
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default About;
