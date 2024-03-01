import React, { useContext, useEffect, useState } from 'react'
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import StarIcon from '@mui/icons-material/Star';

import { Link } from 'react-router-dom';

// Icons
import { Chip } from '@mui/material';

function Card({ property }) {

  return (

    <div className="bg-white rounded-xl shadow-xl relative">
      <Link to={`/property-details/${property?.slug}`}>
        <div className=' h-[300px] rounded-tl-xl rounded-tr-xl overflow-hidden'>
          <img
            className='h-full w-full' src={`${process.env.REACT_APP_BACKEND_RESOURCE}/images/${property?.images[property?.defaultImage || 0]?.filename}`}
            alt="Property Image"
          />
        </div>
        <div className='px-3 py-3'>
          <h2 className="text-lg font-semibold mb-2">
            {property?.address}
          </h2>
          <div className='flex justify-between'>
            <div>
              <h3 className=' text-blue-500 font-semibold'>
                {/* ${property.price} */}
              </h3>
              <div className='mt-3'>
                <p>
                  <b>Actuals CAP:</b> {property?.actualCAP}%
                </p>
                <p>
                  <b>Pro Forma CAP:</b> {property?.proFormaCAP}%
                </p>
                <p>
                  <b>Occupancy:</b> {property?.occupancy}%
                </p>
                <p>
                  <b>Year Built:</b> {property?.builtYear}
                </p>
                <p>
                  <b>Sqft:</b> {property?.sqFt}
                </p>
                <p>
                  <b>Property Type:</b> {property?.propertyType}
                </p>
              </div>
            </div>
            <div className='flex flex-col justify-between'>
              <p>
                {property?.units}
                {" "}
                Units
              </p>
              <PlayCircleFilledWhiteOutlinedIcon style={{
                fontSize: 40,
                color: 'blue'
              }}
              />
            </div>
          </div>

        </div>
        <div className='absolute left-1 top-1 flex items-center gap-1 bg-white rounded-xl px-2'>
          <StarIcon style={{
            color: '#FFD700'
          }} /> {property?.rating}
        </div>
      </Link >
      {
        property.sold && (
          <Chip
            label='sold'
            color='primary'
            className="absolute right-1 top-1 cursor-pointer text-3xl font-bold"
          />
        )
      }
    </div >

  )
}

export default Card