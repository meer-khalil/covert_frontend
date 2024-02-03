import React, { useContext, useEffect, useState } from 'react'
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import StarIcon from '@mui/icons-material/Star';

import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import api from '../../util/api';
import { toast } from 'react-toastify';


// Icons
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { Button, Chip } from '@mui/material';

function Card({ getPropertiesData, property, bulkData, setBulkData }) {

  const { user } = useContext(UserContext)

  useEffect(() => {
    console.log('Bulk: ', bulkData);
  }, [bulkData])

  const handleCheckboxChange = (dataItemId) => {
    console.log('item: ', dataItemId);

    if (bulkData.includes(dataItemId)) {
      let temp = bulkData.filter((e) => e !== dataItemId)
      setBulkData(temp)
    } else {

      setBulkData([...bulkData, dataItemId])
    }

  };

  const handleClick = async (data, id) => {

    const formData = new FormData();
    formData.append('property', JSON.stringify(data))
    let url = `/admin/properties/${id}`;

    try {
      const response = await api.put(url, formData);
      toast("Property Updated")
      getPropertiesData();
    } catch (error) {
      console.log(error);
      toast(`Error`)
    }
  }


  useEffect(() => {
    console.log('Property: ', property);
  }, [])

  return (

    <div className="bg-white rounded-xl shadow-xl md:mx-5 relative">
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
        user?.role === 'admin' && (
          <>
            <div className='flex justify-between items-center  mx-5 my-3'>
              <div className='flex items-center gap-2'>
                <input
                  id={`item${property?.slug}`}
                  type="checkbox"
                  checked={bulkData.includes(property?.slug)}
                  onChange={() => handleCheckboxChange(property?.slug)}
                  className=' cursor-pointer h-4 w-4'
                />
                <label htmlFor={`item${property?._id}`} className='cursor-pointer'>
                  Select The Item
                </label>
              </div>
              <div>
                <a href={`/admin/property/edit/${property?.slug}`} target='_blank' className=' mr-3'>
                  <ModeEditOutlinedIcon />
                </a>
              </div>
            </div>
            <div
              onClick={() => handleClick({ showHome: !property.showHome }, property.slug)}
              className="absolute -right-7 cursor-pointer -top-4 text-3xl font-bold"
            >
              {
                property?.showHome ?
                  <AddOutlinedIcon /> : <RemoveOutlinedIcon />
              }
            </div>
            {
              user?.role === 'admin' && (
                <div className="absolute right-2 -top-10 cursor-pointer text-3xl font-bold">
                  <Button size='small' variant='contained' onClick={() => handleClick({ sold: !property.sold }, property.slug)}>
                    {property.sold ? 'Unsold' : 'Sold'}
                  </Button>
                </div>
              )
            }
          </>
        )
      }
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