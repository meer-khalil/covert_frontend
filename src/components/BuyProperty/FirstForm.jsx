import { Box, TextField } from "@mui/material";
import React from "react";

function FirstForm({ detail, handleDetail }) {
  return (
    <Box component="form" noValidate sx={{ mt: 2 }}>
      <div
        className="p-10 rounded-xl mb-20"
        style={{
          boxShadow: "2px 2px 4px 4px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div className="flex gap-10">
          <div className=" flex-1">
            <TextField
              label="First Name"
              variant="outlined"
              name="firstName"
              fullWidth
              value={detail?.firstName}
              onChange={handleDetail}
              autoComplete="off"
              inputProps={{ style: { fontSize: 15 } }}
              InputLabelProps={{
                style: { fontSize: 15, color: "GrayText" },
              }}
            />
          </div>

          <div className=" flex-1">
            <TextField
              label="Last Name"
              name="lastName"
              fullWidth
              variant="outlined"
              value={detail?.lastName}
              onChange={handleDetail}
              autoComplete="off"
              inputProps={{ style: { fontSize: 15 } }}
              InputLabelProps={{
                style: { fontSize: 15, color: "GrayText" },
              }}
            />
          </div>
        </div>

        <div className="flex gap-10">
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={detail?.email}
            onChange={handleDetail}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="phone"
            label="Phone"
            type="tel"
            value={detail?.phone}
            onChange={handleDetail}
          />
        </div>
      </div>
    </Box>
  );
}

export default FirstForm;
