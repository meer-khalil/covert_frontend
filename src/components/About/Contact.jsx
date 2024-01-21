import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'

import image from '../../images/About/contactform.webp'
import Container from '../Layouts/Container';
import ContactForm from './ContactForm';

function Contact() {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <div className='mt-14 relative' style={{
      backgroundImage: `url(${image})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '70px 0px'
    }}

    >
      <div className=' z-0 absolute left-0 top-0 bottom-0 right-0'></div>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 30, position: 'relative' }}>
        <h3 className=' text-2xl md:text-4xl font-bold tracking-[3px] mb-3 text-white'>Feel Free to Contact</h3>
        <p className=' px-6 md:px-0 text-base md:text-xl text-white text-center'>
          Call at 385-337-4380 or fill out the details to connect with us.
        </p>
      </Box>
      <Container>
        {/* <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          mt={10}
          mx={10}
        >
          <Box sx={{ display: "flex", gap: 1, marginBottom: '30px' }}>
            <TextField
              label="First Name"
              // variant="outlined"
              // value={firstName}
              // onChange={(e) => setFirstName(e.target.value)}
              // fullWidth
              autoComplete="off"
              inputProps={{
                style: {
                  fontSize: 15,
                  border: '2px solid white',
                  borderRadius: '8px',
                  outline: 'none',
                  "&:hover": {
                    "&& fieldset": {
                      border: "3px solid yellow"
                    }
                  }
                }
              }}
              InputLabelProps={{
                style: { fontSize: 15, color: "white" },
              }}
              sx={{ flex: 1, borderColor: 'white', outline: 'none' }}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              // value={firstName}
              // onChange={(e) => setFirstName(e.target.value)}
              // fullWidth
              autoComplete="off"
              inputProps={{ style: { fontSize: 15, border: '2px solid white', borderRadius: '8px' } }}
              InputLabelProps={{
                style: { fontSize: 15, color: "white" },
              }}
              sx={{ flex: 1 }}
            />
            <TextField
              // margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="off"
              inputProps={{ style: { fontSize: 15, border: '2px solid white', borderRadius: '8px' } }}
              InputLabelProps={{
                style: { fontSize: 15, color: "white" },
              }}
              sx={{ flex: 1 }}
            />
          </Box>
          <label for="message" className="block mb-2 text-sm font-medium text-white" style={{ color: 'white' }}>Message</label>

          <textarea id="message" rows="10" class="block p-2.5 w-full text-sm text-white bg-transparent rounded-lg border border-white focus:ring-white focus:border-white" placeholder="Your message..."></textarea>

          <TextField
            id="card-month"
            label="Month"
            variant="outlined"
            margin="normal"
          />
          <TextField
            id="card-year"
            label="Year"
            variant="outlined"
            margin="normal"
          />
          <TextField
            id="card-cvv"
            label="CVV"
            variant="outlined"
            margin="normal"
          />
          <Box sx={{
            textAlign
              : 'center'
          }}>

            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                p: 1,
                px: 2,
                bgcolor: "#716EDC",
                "&:hover": {
                  backgroundColor: "#716EDC",
                },
                mx: 'auto'
              }}
            >
              Send Message
            </Button>
          </Box>
        </Box> */}

        <ContactForm />
      </Container>
    </div>
  )
}

export default Contact