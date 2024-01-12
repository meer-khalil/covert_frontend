import React, { useContext } from 'react';
import { TextField } from '@material-ui/core';
import { UserContext } from '../../context/UserContext';

export default function EmailInput() {
  const [error, setError] = React.useState(false);

  const { email, setEmail} = useContext(UserContext);

  const handleEmailChange = (event) => {
    const value = event.target.value;
    const isValid = /\S+@\S+\.\S+/.test(value);

    setEmail(value);
    setError(!isValid);
  };

  return (
    <TextField
      label="Email"
      variant="outlined"
      type="email"
      onChange={handleEmailChange}
      value={email}
      error={error}
      helperText={error ? 'Please enter a valid email address.' : ''}
      size='small'
    />
  );
};
