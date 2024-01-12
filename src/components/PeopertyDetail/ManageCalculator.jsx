import React, { useEffect } from 'react'
import { Autocomplete, Box, Button, Divider, Slider, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useContext } from 'react';
import { PropertyContext } from '../../context/PropertyContext';

const ManageCalculator = ({ price, setDownPaymentCashFlow }) => {

  const [monthlyPayment, setMonthlyPayment] = useState(20);
  const [propertyPriceFromData, setPropertyPriceFromData] = useState(price);
  const [propertyPrice, setPropertyPrice] = useState(price);
  const [customPrice, setCustomPrice] = useState(price);
  const [custom, setCustom] = useState(false)
  const [dollarPer, setDollarPer] = useState(true);

  // const [downPayment, setDownPayment] = useState(Math.floor((propertyPrice / 100) * 20));
  const [loanPayment, setLoanPayment] = useState(Math.floor((propertyPrice / 100) * 20));
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(6.5);

  const [initSlider, setInitSlider] = useState(Math.floor((propertyPrice / 100) * 20));



  const { setMortgage, downPayment, setDownPayment } = useContext(PropertyContext);

  function calculateMonthlyMortgage(propertyPrice, downPayment, interestRate, loanTerm) {
    // Convert annual interest rate to monthly interest rate and number of payments to months.
    const monthlyInterestRate = (interestRate / 100) / 12;
    const numberOfPayments = loanTerm * 12;

    // Calculate the principal loan amount (Property Price - Down Payment).
    const principalLoanAmount = propertyPrice - downPayment;

    // Calculate the monthly mortgage payment using the formula.
    const monthlyPayment = principalLoanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    return monthlyPayment;
  }

  const handleDefaultPropertyPrice = (e) => {
    if (e.target.name == 'radioButtonDefault') {
      setPropertyPrice(propertyPriceFromData);
      setCustom(false)
      console.log('Property Price Default');
    } else {
      setCustom(true)
      setPropertyPrice(customPrice)
      console.log('Property Price Custom');
    }
  }


  useEffect(() => {
    if (downPayment) {
      setLoanPayment(propertyPrice - downPayment)
    }
  }, [downPayment])

  useEffect(() => {
    let downTemp = Math.floor((propertyPrice / 100) * 20)
    setDownPayment(downTemp);
    setDownPaymentCashFlow(downTemp);
  }, [propertyPrice])

  useEffect(() => {
    if (dollarPer) {
      setInitSlider(Math.floor((propertyPrice / 100) * 20))
      setDownPayment(Math.floor((propertyPrice / 100) * 20))
    } else {
      setInitSlider(20)
      setDownPayment(Math.floor((propertyPrice / 100) * 20))
    }
  }, [dollarPer])

  useEffect(() => {
    const monthlyMortgage = calculateMonthlyMortgage(propertyPrice, downPayment, interestRate, loanTerm);
    console.log("Monthly Mortgage Payment: $" + monthlyMortgage.toFixed(2));
    setMonthlyPayment(monthlyMortgage.toFixed(0));
    setMortgage(monthlyMortgage.toFixed(0));
  }, [propertyPrice, downPayment, interestRate, loanTerm])


  return (
    <div className='flex-1'>

      <div className='mt-12 mb-12'>
        <Box>
          <Typography sx={{
            fontSize: '30px',
            fontWeight: 'bold',
            letterSpacing: '2px',
          }}>
            Mortgage Calcultor
          </Typography>
          <Divider sx={{ width: '15%', height: '5px', bgcolor: '#716EDC', borderRadius: '13px' }} />
        </Box>
      </div>

      {/* Card */}
      <div className='md:mr-44 border-2 border-blue-400 rounded-lg pb-5'>
        {/* Switch */}
        {/* <div className='border-2 border-blue-400 rounded-tl-lg rounded-tr-lg'>
          <div className=' bg-blue-500 text-white flex justify-center items-center py-2 gap-4'>
            <span>Cash</span>
            <div class="relative inline-block w-10 mr-2 align-middle select-none">
              <input type="checkbox" id="switch" name="switch" class="toggle-checkbox absolute block w-5 h-5 rounded-full bg-blue-500 border-4 appearance-none cursor-pointer" />
              <label for="switch" class="toggle-label block overflow-hidden h-5 rounded-full bg-white cursor-pointer"></label>
            </div>

            <span>Mortgage</span>
          </div>
        </div> */}
        <div className='border-2 border-primary rounded-tl-lg rounded-tr-lg'>
          <div className=' bg-primary font-bold text-xl font-opensans text-white flex justify-center items-center py-4 gap-4'>
            Monthly Payment: $ {monthlyPayment}
          </div>
        </div>
        <div className='mx-5'>
          <div className='my-3 border-b-2 border-gray-200 pb-4'>
            <p className=' font-opensans text-lg'>Property Value/Price</p>
            <div className='flex justify-evenly mt-5'>
              {
                [
                  { title: 'Property Price', price: propertyPriceFromData },
                  { title: 'Custom Price' }
                ].map((el, i) => (
                  <>
                    {i === 0 ? (
                      <div className='flex flex-col items-center'>
                        <div class="flex items-center mb-3">
                          <input
                            type="radio"
                            id="radioButtonDefault"
                            name="radioButtonDefault"
                            onChange={handleDefaultPropertyPrice}
                            class="appearance-none h-8 w-8 border border-gray-300 rounded-full checked:bg-blue-500 checked:border-transparent focus:outline-none"
                            checked={!custom}
                          />
                        </div>
                        <p className=' font-opensans text-base'>{el.title}</p>
                        <p className=' font-opensans text-base'>${el.price}</p>
                      </div>
                    ) : (

                      <div className='flex flex-col items-center border-l-2 border-gray-300 pl-5 '>
                        <div class="flex items-center mb-3">

                          <input
                            type="radio"
                            id="radioButtonCustom"
                            name="radioButtonCustom"
                            class="appearance-none h-8 w-8 border border-gray-300 rounded-full checked:bg-blue-500 checked:border-transparent focus:outline-none"
                            checked={custom}
                            onChange={handleDefaultPropertyPrice}
                          />

                        </div>

                        <p className='font-opensans text-base'>{el.title}</p>

                        <input
                          className=' border max-w-[100px] rounded-md text-center border-black'
                          type="number"
                          value={customPrice}
                          onChange={(e) => {
                            setCustomPrice(e.target.value);
                            setPropertyPrice(+(e.target.value))
                          }}
                        />
                      </div>
                    )}
                  </>
                ))
              }
            </div>
          </div>
          <div className='mt-5 border-b-2 border-gray-200 pb-3'>
            <div className="flex justify-between">
              <p className='font-opensans text-xl'>Down Payment</p>
              <p className='font-opensans text-xl'>Loan Amount</p>
            </div>
            <div class="relative">
              {
                dollarPer ? (
                  <Slider
                    size="small"
                    defaultValue={Math.floor((propertyPrice / 100) * 20)}
                    value={initSlider}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                    min={0}
                    max={propertyPrice}
                    onChange={(e) => {
                      console.log('Slider: ', e.target);
                      setInitSlider(e.target.value)
                      setDownPayment(e.target.value)
                    }}
                  />
                ) : (
                  <Slider
                    size="small"
                    defaultValue={20}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                    value={initSlider}
                    min={0}
                    max={100}
                    onChange={(e) => {
                      console.log('Slider: ', e.target);
                      setInitSlider(e.target.value)
                      let per = e.target.value
                      let percentage = Math.floor((propertyPrice / 100) * per);
                      setDownPayment(percentage)
                    }}
                  />
                )
              }
            </div>
            <div className='flex justify-between my-4 transition-all'>
              <p className='flex-1 font-opensans text-xl'>${downPayment}</p>
              <div className='flex flex-1 gap-2 items-center'>
                <span className='font-opensans text-xl'>$</span>
                <div class="relative inline-block w-10 align-middle select-none">
                  <input
                    type="checkbox"
                    id="switch"
                    name="switch"
                    class={`toggle-checkbox absolute ${dollarPer ? '' : 'right-0'} block w-5 h-5 rounded-full bg-blue-500 border-4 appearance-none cursor-pointer`}
                    onChange={() => {
                      setDollarPer(!dollarPer)
                    }}
                  />
                  <label for="switch" class="toggle-label block overflow-hidden h-5 rounded-full bg-white border-2 border-blue-400 cursor-pointer"></label>
                </div>

                <span className='font-opensans text-xl'>%</span>
              </div>
              <p className='flex-1 text-end font-opensans text-xl'>${loanPayment}</p>
            </div>
          </div>
          <div className='my-4'>
            <p className='mb-2 font-opensans text-xl'>Manage Type</p>
            <Autocomplete
              disablePortal
              fullWidth
              id="combo-box-demo"
              options={['Fixed Rate Mortgage']}
              // sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Fixed Rate Mortage" />}
            />
          </div>
          <div className='my-4'>
            <p className='mb-2'>Loan Term</p>
            <Autocomplete
              disablePortal
              fullWidth
              id="combo-box-demo"
              onChange={(e, value) => {

                console.log('Value: ', value);

                const inputString = value;
                const regex = /(\d+(\.\d+)?)/;
                const match = inputString.match(regex);

                if (match) {
                  const extractedNumber = +match[0];
                  setLoanTerm(extractedNumber);
                  console.log('Number: ', extractedNumber);
                } else {
                  console.log("No number found in the input string.");
                }
              }}
              options={[
                '5 Years Fixed',
                '10 Years Fixed',
                '15 Years Fixed',
                '20 Years Fixed',
                '25 Years Fixed',
                '30 Years Fixed',
              ]}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="30 Years Fixed" />}
            />
          </div>
          <div className='my-4'>
            <label className='mb-2 font-opensans text-xl'>Interest Rate</label>
            
            <input
              type="number"
              name="interest"
              value={interestRate}
              onChange={(e) => setInterestRate(+e.target.value)}
              className=' border border-gray-300 focus:border-gray-400 focus-within:border-gray-400 block rounded h-12 px-2 mt-2 w-[43%] py-2 outline-none'
            />

          </div>
          <div className='flex justify-between mt-5 items-center'>
            <p className=' text-primary font-opensans text-xl'>Was This Information Helpful?</p>
            <div className='flex gap-3'>
              <Button variant="outlined" color='success'>Yes</Button>
              <Button variant="outlined" color='error'>No</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageCalculator