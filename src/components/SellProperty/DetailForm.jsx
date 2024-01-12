import React, { useContext, useState } from 'react'

import { PropertyContext } from '../../context/PropertyContext'
import ImageUploader from './ImageUploader';
import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';
import { Autocomplete, TextField } from '@mui/material';
import { useEffect } from 'react';
import BasicDatePicker from './components/BasicDatePicker';

function DetailForm({ data }) {

  const [propertyType, setPropertyType] = useState('');
  const [hoa, setHOA] = useState('');
  const [propertyCondition, setPropertyCondition] = useState('');

  const { propertyData, selectedImages, handlePropertyData } = useContext(PropertyContext);


  const handlePropertyTypeChange = (event, newValue) => {
    setPropertyType(newValue);
  };

  const handlePropertyConditionChange = (event, newValue) => {
    setPropertyCondition(newValue);
  };

  const handleHOAChange = (event, newValue) => {
    setHOA(newValue);
  };

  useEffect(() => {
    handlePropertyData({ target: { name: 'propertyType', value: propertyType } });
  }, [propertyType])

  useEffect(() => {
    handlePropertyData({ target: { name: 'propertyCondition', value: propertyCondition } });
  }, [propertyCondition])

  useEffect(() => {
    handlePropertyData({ target: { name: 'hasHoa', value: hoa } });
  }, [hoa])


  return (
    <div className='p-9 rounded-xl' style={{ boxShadow: '2px 2px 4px 4px rgba(0, 0, 0, 0.05)' }}>

      <h1 className='font-semibold text-2xl mb-5'>Property Details</h1>

      <div className="flex items-center gap-5">

        <div className="flex-1">
          <TextField
            fullWidth
            name='numberOfBeds'
            onChange={handlePropertyData}
            label="Number of Beds"
            type="number"
          />
        </div>

        <div className="flex-1">
          <TextField
            fullWidth
            name='numberOfBaths'
            onChange={handlePropertyData}
            label="Number of Beds"
            type="number"
          />
        </div>

        <div className='flex-1'>
          <BasicDatePicker handlePropertyData={handlePropertyData} />
        </div>

        <div className="flex-1">
          <TextField
            fullWidth
            name='sqFt'
            onChange={handlePropertyData}
            label="SqFt"
            type="number"
          />
        </div>

        <div className="flex-1">
          <TextField
            fullWidth
            name='lotSqft'
            onChange={handlePropertyData}
            label="Lot SqFt"
            type="number"
          />
        </div>

      </div>

      <div className="flex gap-2 my-10">
        <div className="flex-1">
          <TextField
            fullWidth
            name='price'
            onChange={handlePropertyData}
            label="Price"
            type="number"
          />
        </div>

        <div className="flex-1">
          <TextField
            fullWidth
            name='actualCAP'
            onChange={handlePropertyData}
            label="Actual CAP"
            type="number"
          />
        </div>

        <div className="flex-1">
          <TextField
            fullWidth
            name='proFormaCAP'
            onChange={handlePropertyData}
            label="Pro Forma CAP"
            type="number"
          />
        </div>

        <div className="flex-1">
          <TextField
            fullWidth
            name='units'
            onChange={handlePropertyData}
            label="Units"
            type="number"
          />
        </div>

      </div>

      <div className="flex items-center gap-5 mb-10">

        <div className='flex-1'>
          <Autocomplete
            disablePortal
            fullWidth
            id="combo-box-for-property-type"
            options={['Single Family', 'Townhomes', 'Multifamily', 'Apartments']}
            onChange={handlePropertyTypeChange}
            renderInput={(params) => <TextField {...params} label="Property Type" />}
          />
        </div>

        <div className="flex-1">
          <TextField
            name='zipcode'
            fullWidth
            value={propertyData?.zipcode}
            onChange={(e) => {
              if (e.target.value.length <= 5) {
                handlePropertyData(e)
              }
            }}
            label="Zipcode"
            type="text"
          />
        </div>

        <div className='flex-1'>
          <Autocomplete
            disablePortal
            fullWidth
            id="combo-box-for-property-condition"
            options={[
              'Move-In Ready',
              'Good Condition',
              'Fair Condition',
              'Fixer-Upper',
              'Distressed Property',
              'As-Is',
              'Needs TLC (Tender Loving Care)',
              'New Construction',
              'Renovated/Updated'
            ]}
            onChange={handlePropertyConditionChange}
            renderInput={(params) => <TextField {...params} label="Property Condition" />}
          />
        </div>

      </div>
      <div className='flex gap-5'>

        <div className="flex-1">
          <TextField
            name='occupancy'
            fullWidth
            value={propertyData?.occupancy}
            onChange={handlePropertyData}
            label="Occupancy"
            type="number"
          />
        </div>

        <div className="flex-1">
          <TextField
            fullWidth
            name='rentalIncome'
            value={propertyData?.rentalIncome}
            onChange={handlePropertyData}
            label="Rental Income"
            type="number"
          />
        </div>

        <div className='flex-1'>
          <Autocomplete
            disablePortal
            fullWidth
            id="combo-box-for-hoa"
            options={['Yes', 'No', 'Maybe']}
            onChange={handleHOAChange}
            renderInput={(params) => <TextField {...params} label="Has HOA" />}
          />
        </div>

      </div>

      <div className="flex gap-4 mt-5">


        <div>
          <FormGroup>
            <FormControlLabel control={<Checkbox name='finance_cash' onChange={handlePropertyData} />} label={'Cash'} />
          </FormGroup>
        </div>

        <div>
          <FormGroup>
            <FormControlLabel control={<Checkbox name='finance_sellerFinance' onChange={handlePropertyData} />} label={'Seller Finance'} />
          </FormGroup>
        </div>

        <div>
          <FormGroup>
            <FormControlLabel control={<Checkbox name='finance_mortgage' onChange={handlePropertyData} />} label={'Mortgage'} />
          </FormGroup>
        </div>
      </div>
      {
        !data && (
          <ImageUploader />
        )
      }

      {
        data && (
          <div className='mt-20'>
            <h1 className='font-semibold text-2xl mb-5'>Property Details</h1>
            <div className="flex gap-5 mt-5 flex-wrap">
              {selectedImages.map((image, index) => (
                <div key={index} className=" h-44 w-44">
                  <img src={image} alt={`Image ${index}`} />
                </div>
              ))}
            </div>
          </div>
        )
      }

    </div>
  )
}

export default DetailForm