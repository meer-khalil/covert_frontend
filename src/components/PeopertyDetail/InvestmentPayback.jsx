import { Box, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { PropertyContext } from "../../context/PropertyContext";

const InvestmentPayback = ({ property }) => {
  const [pacyback, setPayback] = useState([]);
  const [yearlyRent, setYearlyRent] = useState([]);

  const { initialExpense, monthlyExpense, mortgage, downPayment } =
    useContext(PropertyContext);

  function calcPayback() {
    let investment = downPayment + initialExpense;

    let temp = [];
    let count = 0;
    while (count < 10) {
      let cashflow =
        yearlyRent[count] -
        monthlyExpense * 12 -
        yearlyRent[count] * 0.1 -
        mortgage * 12;
      investment = investment - cashflow;
      count += 1;

      temp.push(investment.toFixed(2).replace(/[.,]00$/, ""));
    }
    setPayback(temp);
  }

  function calcYearlyRent() {
    let rent = property?.rentalIncome;

    let temp = [];
    temp.push(rent * 12);
    let count = 0;
    while (count < 9) {
      rent = rent + rent * 0.1;
      count += 1;
      // console.log('investment: ', investment);
      temp.push((rent * 12).toFixed(2).replace(/[.,]00$/, ""));
    }

    setYearlyRent(temp);
  }

  useEffect(() => {
    calcPayback();
    calcYearlyRent();
  }, [downPayment, property]);

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
          <h3 className=" text-lg md:text-2xl text-center font-bold tracking-widest">
            Investment Payback Balance Table (in Thousands)
          </h3>
          <Divider
            sx={{
              width: "25%",
              height: "5px",
              bgcolor: "#716EDC",
              borderRadius: "13px",
              display: { xs: "none", md: "inline" },
            }}
          />
        </Box>
      </div>

      {/* Table */}
      <div className=" mt-20 overflow-x-scroll md:overflow-auto">
        <div className=" w-min px-5 py-3 text-white text-2xl -mb-5 rounded-md bg-primary">
          Traditional
        </div>

        <table
          className="w-full"
          style={{
            borderCollapse: "separate",
            borderSpacing: "0 1em",
          }}
        >
          <thead>
            <tr className=" bg-primary">
              <td className="pl-2 text-xl text-white">Years</td>
              {new Array(10).fill(0).map((e, index) => (
                <td key={index} className="py-2 text-xl text-white">
                  {2023 + index}
                </td>
              ))}
            </tr>
          </thead>

          <tbody>
            {/* Adjustment Revenue */}
            <tr>
              <td className=" text-primary font-bold">Adjusted Revenue</td>
              {yearlyRent.map((e, index) => (
                <td key={index}>
                  ${" "}
                  {((yearlyRent[index] - yearlyRent[index] * 0.1) / 1000)
                    .toFixed(2)
                    .replace(/[.,]00$/, "") || 0}
                </td>
              ))}
            </tr>

            {/* Gross Rental Revenue */}
            <tr>
              <td className=" pl-5">
                <li className="list-disc">Gross Rental Revenue</li>
              </td>
              {yearlyRent.map((e, index) => (
                <td key={index}>
                  ${" "}
                  {(yearlyRent[index] / 1000)
                    .toFixed(2)
                    .replace(/[.,]00$/, "") || 0}
                </td>
              ))}
            </tr>

            {/* Vacancy */}
            <tr>
              <td className=" pl-5">
                <li className="list-disc">Vacancy</li>
              </td>
              {yearlyRent.map((rent, index) => (
                <td key={index} className=" text-red-500">
                  ${" "}
                  {((rent * 0.1) / 1000).toFixed(2).replace(/[.,]00$/, "") || 0}
                </td>
              ))}
            </tr>

            {/* Total Expenses */}
            <tr>
              <td className=" text-primary font-bold">Total Expenses</td>
              {yearlyRent.map((e, index) => (
                <td key={index} className=" text-red-500">
                  ${" "}
                  {(((+monthlyExpense + +mortgage) * 12) / 1000)
                    .toFixed(2)
                    .replace(/[.,]00$/, "") || 0}
                </td>
              ))}
            </tr>

            {/* Recurring Expenses */}
            <tr>
              <td className=" pl-12">
                <li className="list-disc">Recurring Expenses</li>
              </td>
              {new Array(10).fill(0).map((e, index) => (
                <td key={index} className=" text-red-500">
                  ${" "}
                  {((monthlyExpense * 12) / 1000)
                    .toFixed(2)
                    .replace(/[.,]00$/, "") || 0}
                </td>
              ))}
            </tr>

            {/* Mortgage */}
            <tr>
              <td className=" pl-12">
                <li className="list-disc">Mortgage</li>
              </td>
              {new Array(10).fill(0).map((e, index) => (
                <td key={index} className=" text-red-500">
                  ${" "}
                  {((mortgage * 12) / 1000).toFixed(2).replace(/[.,]00$/, "") ||
                    0}
                </td>
              ))}
            </tr>

            {/* Cash Flow */}
            <tr>
              <td className="text-primary font-bold">Cash Flow</td>
              {yearlyRent.map((rent, index) => (
                <>
                  {rent -
                    monthlyExpense * 12 -
                    (rent * 0.1).toFixed(2).replace(/[.,]00$/, "") -
                    mortgage * 12 >
                  0 ? (
                    <td key={index}>
                      ${" "}
                      {(
                        (rent -
                          monthlyExpense * 12 -
                          (rent * 0.1).toFixed(2).replace(/[.,]00$/, "") -
                          mortgage * 12) /
                        1000
                      )
                        .toFixed(2)
                        .replace(/[.,]00$/, "") || 0}
                    </td>
                  ) : (
                    <td key={index} className=" text-red-500">
                      $
                      {Math.abs(
                        (
                          (rent -
                            monthlyExpense * 12 -
                            (rent * 0.1).toFixed(2).replace(/[.,]00$/, "") -
                            mortgage * 12) /
                          1000
                        )
                          .toFixed(2)
                          .replace(/[.,]00$/, "")
                      ) || 0}
                    </td>
                  )}
                </>
              ))}
            </tr>

            {/* Initial Cash Investment */}
            <tr>
              <td className=" text-primary font-bold">
                Initial Cash Investment
              </td>
              <td className=" text-red-500">
                ${" "}
                {((downPayment + initialExpense) / 1000)
                  .toFixed(2)
                  .replace(/[.,]00$/, "") || 0}
              </td>
            </tr>

            {/* One Time Cost */}
            <tr>
              <td className=" pl-12">
                <li className="list-disc">One Time Cost</li>
              </td>
              <td className=" text-red-500">
                ${" "}
                {(initialExpense / 1000).toFixed(2).replace(/[.,]00$/, "") || 0}
              </td>
            </tr>

            {/* Cash DownPayment */}
            <tr>
              <td className=" pl-12">
                <li className="list-disc">Cash DownPayment</li>
              </td>
              <td className=" text-red-500">
                $ {(downPayment / 1000).toFixed(2).replace(/[.,]00$/, "") || 0}
              </td>
            </tr>

            {/* Investment Payback Balance */}
            <tr>
              <td>Investment Payback Balance</td>
              {pacyback?.map((e, index) => (
                <>
                  {e > 0 ? (
                    <td key={index} className=" text-red-500">
                      $ {(e / 1000).toFixed(2).replace(/[.,]00$/, "")}
                    </td>
                  ) : (
                    <td key={index}>
                      $ {Math.abs((e / 1000).toFixed(2).replace(/[.,]00$/, ""))}
                    </td>
                  )}
                </>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvestmentPayback;
