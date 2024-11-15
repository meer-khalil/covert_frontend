import React from "react";
import { Box, Divider, Typography } from "@mui/material";

import MonthlyExpenses from "./MonthlyExpenses";
import OneTimeExpenses from "./OneTimeExpenses";
import TopInfo from "./TopInfo";

const FinancialAnalysis = ({ property, downPaymentCashFlow }) => {
  return (
    <div>
      <div className="mt-20">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "30px",
              fontWeight: "bold",
              letterSpacing: "2px",
            }}
          >
            Financial Analysis
          </Typography>
          <Divider
            sx={{
              width: "10%",
              height: "5px",
              bgcolor: "#716EDC",
              borderRadius: "13px",
            }}
          />
        </Box>
      </div>

      <div className="mt-12">
        <TopInfo
          property={property}
          downPaymentCashFlow={downPaymentCashFlow}
        />

        <div className=" text-center bg-primary text-white py-2">Expenses</div>

        <div className="flex flex-col md:flex-row">
          <OneTimeExpenses />
          <MonthlyExpenses />
        </div>
      </div>
    </div>
  );
};

export default FinancialAnalysis;
