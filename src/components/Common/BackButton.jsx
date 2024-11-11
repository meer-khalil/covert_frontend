import React from "react";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Button } from "@mui/material";

const BackButton = () => {
  const navigate = useNavigate();

  const back = () => navigate(-1);
  return (
    <Button
      variant="contained"
      size="small"
      onClick={back}
      startIcon={<KeyboardBackspaceIcon />}
    >
      Back
    </Button>
    // <Button>
    //   <IconButton>
    //     <KeyboardBackspaceIcon />
    //   </IconButton>
    //   Back
    // </Button>
  );
};

export default BackButton;
