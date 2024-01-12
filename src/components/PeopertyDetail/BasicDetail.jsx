import React from 'react'
import StarIcon from '@mui/icons-material/Star';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { Autocomplete, Box, Button, Divider, TextField, Typography } from '@mui/material'
import { useState } from 'react';
import { useEffect } from 'react';
import api from '../../util/api';
import { toast } from 'react-toastify';

const BasicDetail = ({ property }) => {

  const [info, setInfo] = useState('')

  const searchCityInfo = () => {
    api.get(`/properties/wikipedia?query=${property.zipcode}`)
      .then((response) => {
        const data = response.data;
        const pageId = Object.keys(data.query.pages)[0];
        const content = data.query.pages[pageId].extract;
        setInfo(content);
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error Wiki ')
      });
  };

  useEffect(() => {
    searchCityInfo();
  }, [])


  return (
    <>
      <div className='flex flex-col md:flex-row md:items-center md:space-x-32 w-full'>

        <h2 className='text-[35px] font-semibold'>
          {property.title}
        </h2>

        <h3 className=' text-blue-500 font-semibold text-[44px]'>
          ${property.price}
        </h3>

        <button
          className=' w-[180px] h-[61px] rounded-lg bg-primary text-white font-semibold text-[21px]'
        >
          BUY NOW
        </button>
      </div>

      <div className='flex gap-4 my-3'>
        {/* <div className='flex items-center gap-1 bg-yellow-50 rounded-xl px-2'>
          <StarIcon style={{
            color: '#FFD700'
          }} />
          {property.rating}
        </div> */}
        <p className=' text-[21px]'>{property.units} units</p>
      </div>


      <div className='flex text-[21px] flex-col md:flex-row gap-1 md:gap-8 my-4'>
        {
          [
            `Actuals CAP: ${property.actualCAP}`,
            `Pro Forma CAP: ${property.proFormaCAP}`,
            `Occupancy: ${property.occupancy}% Occupied`
          ].map((el, i) => (
            <>
              {
                (i === 0) ? (
                  <p>{el}</p>
                ) : (
                  <>
                    <span className='hidden md:inline'>|</span>
                    <p>{el}</p>
                  </>
                )
              }
            </>
          ))
        }
      </div>


      {/* <div className='my-8'>
        <Box>
          <Typography sx={{
            fontSize: '30px',
            fontWeight: 'bold',
            letterSpacing: '2px',
          }}>
            Top Features
          </Typography>
          <Divider sx={{ width: '10%', height: '5px', bgcolor: '#716EDC', borderRadius: '13px' }} />
        </Box>
      </div>


      <div className='flex items-center justify-between flex-wrap my-5'>
        {
          property?.features?.map((feature, index) => (
            <div className='flex items-center gap-2' key={index}>
              <CheckCircleOutlineOutlinedIcon sx={{ color: 'blue' }} />
              <span>{feature}</span>
            </div>
          ))
        }
      </div> */}


      <div className='mt-12 mb-5'>
        <Box>
          <Typography sx={{
            fontSize: '30px',
            fontWeight: 'bold',
            letterSpacing: '2px',
          }}>
            Details
          </Typography>
          <Divider sx={{ width: '4%', height: '5px', bgcolor: '#716EDC', borderRadius: '13px' }} />
        </Box>
      </div>


      <div className=' mb-5'>
        <p className=' text-justify text-[21px]'>
          {
            (info?.length > 1000) ? (
              <>
                {info.slice(0, 1000) + '...'}
                <a
                  href={`https://en.wikipedia.org/wiki/Special:Search?search=Utah`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=' text-blue-500'
                >
                  See More
                </a>
              </>
            ) : (
              <>
                {
                  info
                  // ||
                  // "Lorem ipsum dolor sit amet consectetur. Id sed sapien consequat nibh. Sed viverra proin integer adipiscing euismod dictum amet tellus augue. Quis egestas vulputate adipiscing fusce mus. Id tellus massa facilisi magna semper eu auctor. Adipiscing ullamcorper ridiculus eget sit. Aliquet mauris ullamcorper eu felis. Sed etiam blandit sed cras cursus lectus aliquam porttitor. Sociis mattis etiam mauris dolor eget quis viverra mi. A mi pellentesque in urna et sed. Quis mauris ullamcorper accumsan in nulla. Feugiat volutpat cursus pharetra elit. Amet tortor quam eu mi auctor lacinia mattis dignissim quam. Rutrum faucibus bibendum nunc diam amet sed pharetra iaculis. Lobortis sit nisi nisi eget. In malesuada congue mauris sit eget ridiculus phasellus. Purus posuere urna vel quis viverra. Feugiat porttitor auctor sapien ut nec egestas. Ante ullamcorper nec magna egestas etiam. Condimentum nisl ac turpis enim et sollicitudin urna aliquam id. Amet."
                }
              </>
            )
          }
        </p>
      </div>
    </>
  )
}

export default BasicDetail