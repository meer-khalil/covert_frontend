import React from 'react'
import { useNavigate } from 'react-router-dom'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { IconButton } from '@mui/material';

const BackButton = () => {
  const navigate = useNavigate();

  const back = () => navigate(-1)
  return (
    <IconButton onClick={back}>
      <KeyboardBackspaceIcon color='primary' />
    </IconButton>
  )
}

export default BackButton