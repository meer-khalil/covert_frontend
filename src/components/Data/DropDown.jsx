import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function DropDown({ category, setCategory }) {

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" className=' text-primary'>Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Category"
                    onChange={handleChange}
                    sx={{
                        '.MuiOutlinedInput-notchedOutline': {
                          borderColor: '#9771B5',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#9771B5',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#9771B5',
                        },
                        '.MuiSvgIcon-root ': {
                          fill: "white !important",
                        }
                      }}
                >
                    <MenuItem value={'Population'}>Population</MenuItem>
                    <MenuItem value={'Employment'}>Employment</MenuItem>
                    <MenuItem value={'Median Price'}>Median Price</MenuItem>
                    <MenuItem value={'Median Income'}>Median Income</MenuItem>
                    <MenuItem value={'Median Gross Rent'}>Median Gross Rent</MenuItem>
                    <MenuItem value={'Active Listing'}>Active Listing</MenuItem>
                    <MenuItem value={'Days on Market'}>Days on Market</MenuItem>
                    <MenuItem value={'New Listing'}>New Listing</MenuItem>
                    <MenuItem value={'Price Reduced Count'}>Price Reduced Count</MenuItem>
                    <MenuItem value={'Pending Listing Count'}>Pending Listing Count</MenuItem>
                    <MenuItem value={'Total Listing'}>Total Listing</MenuItem>
                    <MenuItem value={'Cap Rate'}>Cap Rate</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
