import React, { useState, useEffect } from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import api from '../../../../util/api';


const Upgrade = () => {

  const [title, setTitle] = useState('');
  const [benefit, setBenefit] = useState('');
  const [benefits, setBenefits] = useState([]);


  const addBenefit = () => {
    if (benefit.length > 0) {
      setBenefits([...benefits, benefit])
      setBenefit('')
    }
  }

  const removeBenefit = (benefit) => {
    setBenefits((prev) => prev.filter((e) => e !== benefit))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let _data = { title, benefits }

    try {
      const { data } = await api.put('/pages/upgrade', _data);
      console.log('Updated: Upgrade(): ', data);
      alert('Upgrade Data Updated')
    } catch (error) {
      console.log('Error While Updating Upgrade: ', error.message);
    }
  }

  const fetchHomeData = async () => {
    try {
      const { data } = await api.get("/pages/upgrade");

      const { title, benefits } = data;

      setTitle(title);
      setBenefits(benefits);
      console.log("Upgrade Data: ", data);
    } catch (error) {
      console.error("Failed to Get the Upgrade Data:", error.message);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  return (
    <div className='flex justify-center'>
      <div className='w-full max-w-2xl'>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              label="Title"
              placeholder="Enter the Title"
              variant="outlined"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              autoComplete="off"
              inputProps={{ style: { fontSize: 15 } }}
              InputLabelProps={{
                style: { fontSize: 15, color: "GrayText" },
              }}
              sx={{ marginTop: "10px" }}
            />
          </div>
          <div className='mt-5'>
            <TextField
              label="Beneftis"
              placeholder="Enter the Benefit"
              variant="outlined"
              name="benefit"
              value={benefit}
              onChange={(e) => setBenefit(e.target.value)}
              fullWidth
              autoComplete="off"
              inputProps={{ style: { fontSize: 15 } }}
              InputLabelProps={{
                style: { fontSize: 15, color: "GrayText" },
              }}
              sx={{ marginTop: "10px" }}
            />
            <div className="flex justify-end">
              <Button
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
                onClick={addBenefit}
              >
                Add Benefit
              </Button>
            </div>
          </div>
          <div>

            <h3 className=' text-xl font-bold'>Beneftis</h3>
            <ul className=' pl-12'>
              {
                benefits?.map((el, i) => (
                  <div className='group'>
                    <div className='relative w-fit'>
                      <li key={i} className=' list-disc'>{el}</li>
                      <span onClick={() => removeBenefit(el)} className=' absolute hidden text-xl font-bold cursor-pointer group-hover:block -right-20 -top-1'>x</span>
                    </div>
                  </div>
                ))
              }
            </ul>
          </div>
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
            onClick={handleSubmit}
          >
            Update
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Upgrade