import { useForm } from "react-hook-form";
import {
  Button
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { IconButton, TextField } from "@mui/material";
import { Box } from "@mui/system";

import { toast } from "react-toastify";
import api from "../../util/api";


// icons
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useState } from "react";
// style
const FormStyle = styled("form")(({ theme }) => ({
  // root style
  marginTop: theme.spacing(2),
  display: "grid",
  gap: theme.spacing(3),

  "& label": {
    color: theme.palette.common.white
  },
  // input style
  "& label.Mui-focused": {
    color: theme.palette.common.white,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: theme.palette.success.main,
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: theme.palette.common.white
    },
    "& fieldset": {
      borderColor: theme.palette.common.white,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.common.white,
    },
  },

  // error
  "& .Mui-error.MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.error.light,
    },
  },
  "& label.Mui-error.Mui-focused": {
    color: theme.palette.error.light,
  },

  // checkbox style
  "& .MuiCheckbox-root": {
    color: theme.palette.success.light,
  },
  "& .Mui-checked": {
    color: theme.palette.success.main,
  },

  // forgot link style
  "& a": {
    color: theme.palette.success.main,
    fontWeight: 500,
    "&:hover": {
      color: theme.palette.success.light,
    },
  },

  // button style
  "& .MuiButton-contained": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 600,
    textTransform: "capitalize",
    padding: theme.spacing(1.25),
    boxShadow: `rgb(0 171 85 / 24%) 0px 8px 16px 0px`,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      boxShadow: "none",
    }
  },
}));

const ContactForm = () => {

  const [banner, setBanner] = useState(false);

  // hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: ""
    },
  });

  // prevent Default
  const preventDefault = (e) => e.preventDefault();

  const hideBanner = () => {
    setBanner(prev => !prev);
  }

  // form submit
  const onSubmit = async (data) => {
    try {
      const res = await api.post('/contact', data);
      console.log('res', res);
      // toast('Sumbitted Successfuly!')
      hideBanner();
      reset();
    } catch (error) {
      console.log('Error: ', error);
      toast(error?.message)
    }
  };

  // for reset
  // couldn't make it work

  return (
    <div className=" mx-3 md:mx-32 mt-12">
      <FormStyle component="form" onSubmit={handleSubmit(onSubmit)}>
        <Box display={'flex'} flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
          {/* First Name */}
          <TextField
            variant="outlined"
            inputProps={{ style: { color: 'white' } }}
            type="text"
            fullWidth
            label="First Name"
            autoComplete="off"
            error={errors.firstName ? true : false}
            helperText={errors.firstName && "Enter Your First Name"}
            {...register("firstName", { required: true })}
          />

          {/* Last Name */}
          <TextField
            variant="outlined"
            inputProps={{ style: { color: 'white' } }}
            type="text"
            fullWidth
            label="Last Name"
            autoComplete="off"
            error={errors.lastName ? true : false}
            helperText={errors.lastName && "Enter Your Last Name"}
            {...register("lastName", { required: true })}
          />

        </Box>
        <div className=" my-4">
          {/* Email */}
          <TextField
            variant="outlined"
            inputProps={{ style: { color: 'white' } }}
            fullWidth
            type="email"
            label="Email address"
            autoComplete="off"
            error={errors.email ? true : false}
            helperText={errors.email && "Enter a valid email address"}
            {...register("email", { required: true })}

          />
        </div>

        {/* Last Name */}
        <TextField
          variant="outlined"
          inputProps={{ style: { color: 'white' } }}
          type="text"
          fullWidth
          multiline
          rows={5}
          label="Message"
          autoComplete="off"
          error={errors.message ? true : false}
          helperText={errors.message && "Enter Your Message"}
          {...register("message", { required: true })}
        />

        {
          banner && (
            <div className=" bg-white rounded-md flex justify-between items-center py-2 px-2">
              <p className=" font-poppins">Your message has been sent successfully. We will reach you soon!</p>
              <IconButton onClick={hideBanner}>
                <CloseOutlinedIcon />
              </IconButton>
            </div>
          )
        }
        <div className=" flex flex-col md:flex-row md:justify-end">
          <Button type="submit" variant="contained" disableElevation>
            Submit
          </Button>
        </div>
      </FormStyle>
    </div>
  );
};

export default ContactForm;
