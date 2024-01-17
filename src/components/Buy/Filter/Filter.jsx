import React from 'react'
import { Autocomplete, Box, Button, Divider, TextField, Typography } from '@mui/material'

import FilterItem from './FilterItem';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../../util/api';


// const filters = [
//     {
//         title: 'Filter by',
//         items: [
//             '1% rule', 'Price Reduced', 'Occupied', 'Seller Financing'
//         ],
//         expand: true
//     },
//     {
//         title: 'Filter by hometype',
//         items: [
//             'Family', 'Townhomes', 'Multifamily', 'Apartments'
//         ],
//         expand: false
//     },
//     {
//         title: 'Filter by finance type',
//         items: [
//             'Cash', 'Conventional', 'Seller Financing'
//         ],
//         expand: true
//     },
//     {
//         title: 'Filter by stat',
//         items: [
//             'California', 'Texas', 'Florida', 'Washington', 'North Carolina', 'New York'
//         ],
//         expand: false
//     },
//     // {
//     //     title: 'Filter by rating',
//     //     items: [
//     //     ],
//     //     expand: false
//     // },
//     // {
//     //     title: 'Filter by size',
//     //     items: [
//     //     ],
//     //     expand: false
//     // }
// ]

const PropertyTypeDropdown = ({ setFilter }) => {


    const handlePropertyTypeChange = (event, newValue) => {
        setFilter({ 'propertyType': newValue });
    };

    return (
        <div className='flex-1'>
            <Autocomplete
                disablePortal
                fullWidth
                id="combo-box-for-property-type"
                options={['Single Family', 'Townhomes', 'Multifamily', 'Apartments']}
                onChange={handlePropertyTypeChange}
                renderInput={(params) => <TextField {...params} label="Filter by hometype" />}
            />
        </div>
    )
}

const StateDropdown = ({ setFilter }) => {


    const [states, setStates] = useState([]);

    const handleStateChange = (event, newValue) => {
        setFilter({ 'state': newValue });
    };

    const getStates = () => {
        api.get('/states')
            .then(({ data }) => {
                setStates(data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getStates();
    }, [])

    return (
        <div className='flex-1'>
            <Autocomplete
                disablePortal
                fullWidth
                id="combo-box-for-property-type"
                options={states}
                onChange={handleStateChange}
                renderInput={(params) => <TextField {...params} label="Filter by state" />}
            />
        </div>
    )
}
function Filter({ getPropertiesData }) {

    const [filter, setFilter] = useState({});


    useEffect(() => {
        console.log('Filter: ', filter);
        getPropertiesData(filter);
    }, [filter])


    const resetFilters = () => {
        setFilter({});
        toast("Filters Reseted")
    }

    return (

        <div className='mx-20'>
            <Box mb={4}>
                <Typography sx={{
                    fontSize: '30px',
                    fontWeight: 'bold',
                    letterSpacing: '2px',
                }}>Filter</Typography>
                <Divider sx={{ width: '15%', height: '5px', bgcolor: '#716EDC', borderRadius: '13px' }} />
            </Box>

            {
                [
                    {
                        title: 'Filter by',
                        items: [
                            '1% rule', 'Price Reduced', 'Occupied', 'Seller Financing'
                        ],
                        expand: true
                    },
                    {
                        title: 'Filter by hometype',
                        items: [
                            'Family', 'Townhomes', 'Multifamily', 'Apartments'
                        ],
                        expand: false
                    },
                    {
                        title: 'Filter by finance type',
                        items: [
                            'Cash', 'Conventional', 'Seller Financing'
                        ],
                        expand: true
                    },
                    {
                        title: 'Filter by hometype',
                        // items: [
                        //     'California', 'Texas', 'Florida', 'Washington', 'North Carolina', 'New York'
                        // ],
                        component: <PropertyTypeDropdown setFilter={setFilter} />,
                        expand: true
                    },
                    {
                        title: 'Filter by stat',
                        // items: [
                        //     'California', 'Texas', 'Florida', 'Washington', 'North Carolina', 'New York'
                        // ],
                        component: <StateDropdown setFilter={setFilter} />,
                        expand: true
                    },
                    // {
                    //     title: 'Filter by rating',
                    //     items: [
                    //     ],
                    //     expand: false
                    // },
                    // {
                    //     title: 'Filter by size',
                    //     items: [
                    //     ],
                    //     expand: false
                    // }
                ].map((item, i) => (
                    <FilterItem key={i} item={item} setFilter={setFilter} />
                ))
            }
            <div className='flex justify-end w-full'>
                <Button
                    variant="contained"
                    sx={{
                        mt: 3,
                        mb: 2,
                        p: 1,
                        px: 4,
                        bgcolor: "#716EDC",
                        "&:hover": {
                            backgroundColor: "#716EDC",
                        },
                        mx: 'auto'
                    }}
                    onClick={resetFilters}
                >
                    Reset Filters
                </Button>
            </div>
        </div>
    )
}

export default Filter