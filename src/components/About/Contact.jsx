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
      <div className=' flex flex-col items-center z-30 relative'>
        <h3 className=' text-2xl md:text-4xl font-bold tracking-[3px] mb-3 text-white'>
          Feel Free to Contact
        </h3>
        <p className=' px-6 md:px-0 text-base md:text-xl text-white text-center'>
          Call at 385-337-4380 or fill out the details to connect with us.
        </p>
      </div>

      <Container>
        <ContactForm />
      </Container>
    </div>
  )
}

export default Contact