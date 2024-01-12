import { Autocomplete, Box, Button, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

function SecondForm({ detail, handleDetail }) {


    const [timeFrame, setTimeFrame] = useState('')
    const [totalCapital, setTotalCapital] = useState('')
    const [financing, setFinancing] = useState('')

    const handleTimeFrameChange = (event, newValue) => {
        setTimeFrame(newValue);
    };

    const handleTotalCapitalChange = (event, newValue) => {
        setTotalCapital(newValue);
    };

    const handleFinancingChange = (event, newValue) => {
        setFinancing(newValue);
    };

    useEffect(() => {
        handleDetail({ target: { name: 'timeFrame', value: timeFrame } });
    }, [timeFrame])

    useEffect(() => {
        handleDetail({ target: { name: 'totalCapital', value: totalCapital } });
    }, [totalCapital])

    useEffect(() => {
        handleDetail({ target: { name: 'financing', value: financing } });
    }, [financing])

    return (
        <Box
            component="form"
            noValidate

            sx={{ mt: 2 }}
        >

            <div className='p-10 rounded-xl mb-20' style={{
                boxShadow: '2px 2px 4px 4px rgba(0, 0, 0, 0.05)'
            }}>
                <p className='mb-12'>Tell us About your Interests Please</p>

                <Box sx={{ display: "flex", gap: 10 }}>
                    <Autocomplete
                        disablePortal
                        fullWidth
                        id="combo-box-timeframe"
                        options={['One', 'Two', 'Three', 'Four']}
                        onChange={handleTimeFrameChange}
                        renderInput={(params) => <TextField {...params} label="Timeframe for investing" />}
                    />
                    <Autocomplete
                        disablePortal
                        fullWidth
                        id="combo-box-total-capital"
                        options={['One', 'Two', 'Three', 'Four']}
                        onChange={handleTotalCapitalChange}
                        renderInput={(params) => <TextField {...params} label="Total Capital Available" />}
                    />
                </Box>

                <Box my={5}>
                    <Autocomplete
                        disablePortal
                        fullWidth
                        id="combo-box-financing"
                        options={['One', 'Two', 'Three', 'Four']}
                        onChange={handleDetail}
                        renderInput={(params) => <TextField {...params} label="Financing" />}
                    />
                </Box>

                <div className="flex-1">
                    <TextField
                        name='message'
                        value={detail?.message}
                        onChange={handleDetail}
                        label="Message"
                        type="text"
                        multiline
                        fullWidth
                        rows={8}
                        placeholder='Enter Your Message..'
                    />
                </div>

                <div className=' mt-3 pl-2'>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox name='finance_cash' onChange={handleDetail} />}
                            label={'I agree with Off Market Finds Terms and Privacy Policy and I have read and understand  then agency relationship.'} />
                    </FormGroup>
                </div>
            </div>

        </Box>
    )
}

export default SecondForm