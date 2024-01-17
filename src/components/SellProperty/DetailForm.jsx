import React, { useContext, useState } from 'react'

import { PropertyContext } from '../../context/PropertyContext'
import ImageUploader from './ImageUploader';
import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';
import { Autocomplete, IconButton, InputAdornment, TextField } from '@mui/material';
import { useEffect } from 'react';
import BasicDatePicker from './components/BasicDatePicker';

// icons
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PercentIcon from '@mui/icons-material/Percent';
// custom css
import './DetailForm.css';
import ShowDatePicker from './components/ShowDatePicker';

function DetailForm({ data }) {

  const [defaultImage, setDefaultImage] = useState(0);

  const { propertyData, selectedImages, handlePropertyData } = useContext(PropertyContext);


  const handlePropertyTypeChange = (event, newValue) => {
    handlePropertyData({ target: { name: 'propertyType', value: newValue } });
  };

  const handlePropertyConditionChange = (event, newValue) => {
    handlePropertyData({ target: { name: 'propertyCondition', value: newValue } });
  };

  const handleHOAChange = (event, newValue) => {
    handlePropertyData({ target: { name: 'hasHoa', value: newValue } });
  };

  const handleChange = (idx) => {
    setDefaultImage(idx)
  }

  return (
    <div className='p-9 max-w-max mx-auto rounded-xl' style={{ boxShadow: '2px 2px 4px 4px rgba(0, 0, 0, 0.05)' }}>

      <h1 className='font-semibold text-2xl mb-5'>Property Details</h1>

      <div className="flex items-center gap-5">

        <div className="flex-1">
          <TextField
            fullWidth
            name='numberOfBeds'
            onChange={handlePropertyData}
            label="Number of Beds"
            type="number"
            value={propertyData?.numberOfBeds}
          />
        </div>

        <div className="flex-1">
          <TextField
            fullWidth
            name='numberOfBaths'
            onChange={handlePropertyData}
            label="Number of Baths"
            type="number"
            value={propertyData?.numberOfBaths}
          />
        </div>

        <div className='flex-1'>
          {
            data ? (
              <ShowDatePicker
                propertyData={propertyData}
              />
            ) : (
              <BasicDatePicker
                handlePropertyData={handlePropertyData}
                propertyData={propertyData}
              />
            )
          }

        </div>

        <div className="flex-1">
          <TextField
            fullWidth
            name='sqFt'
            onChange={handlePropertyData}
            label="SqFt"
            type="number"
            value={propertyData?.sqFt}
          />
        </div>

        <div className="flex-1">
          <TextField
            fullWidth
            name='lotSqft'
            onChange={handlePropertyData}
            label="Lot SqFt"
            type="number"
            value={propertyData?.lotSqft}
          />
        </div>

      </div>

      <div className="flex gap-5 my-10">
        <div className="flex-1">
          <TextField
            fullWidth
            name='price'
            onChange={handlePropertyData}
            label="Price"
            type="number"
            value={propertyData?.price}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AttachMoneyIcon fontSize='small' />
                </InputAdornment>
              )
            }}
          />
        </div>

        <div className="flex-1">
          <TextField
            fullWidth
            name='actualCAP'
            onChange={handlePropertyData}
            label="Actual CAP"
            type="number"
            value={propertyData?.actualCAP}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton>
                    <PercentIcon fontSize='small' />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </div>

        <div className="flex-1">
          <TextField
            fullWidth
            name='proFormaCAP'
            onChange={handlePropertyData}
            label="Pro Forma CAP"
            type="number"
            value={propertyData?.proFormaCAP}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton>
                    <PercentIcon fontSize='small' />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </div>

        <div className="flex-1">
          <TextField
            fullWidth
            name='units'
            onChange={handlePropertyData}
            label="Units"
            type="number"
            value={propertyData?.units}
          />
        </div>
        <div className='flex-1'>
          <Autocomplete
            disablePortal
            fullWidth
            id="combo-box-for-property-type"
            options={['Single Family', 'Townhomes', 'Multifamily', 'Apartments']}
            onChange={handlePropertyTypeChange}
            value={propertyData?.propertyType}
            renderInput={(params) => <TextField {...params} label="Property Type" />}
          />
        </div>
      </div>

      <div className="flex items-center gap-5 mb-10">

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
            value={propertyData?.propertyCondition}
            renderInput={(params) => <TextField {...params} label="Property Condition" />}
          />
        </div>

        <div className="flex-1">
          <TextField
            name='occupancy'
            fullWidth
            value={propertyData?.occupancy}
            onChange={handlePropertyData}
            label="Occupancy"
            type="number"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton>
                    <PercentIcon fontSize='small' />
                  </IconButton>
                </InputAdornment>
              )
            }}
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
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AttachMoneyIcon fontSize='small' />
                </InputAdornment>
              )
            }}
          />
        </div>

        <div className='flex-1'>
          <Autocomplete
            disablePortal
            fullWidth
            id="combo-box-for-hoa"
            options={['Yes', 'No', 'Maybe']}
            onChange={handleHOAChange}
            value={propertyData?.hasHoa}
            renderInput={(params) => <TextField {...params} label="Has HOA" />}
          />
        </div>
      </div>


      {/* Checkboxes */}
      <div className="flex gap-4">

        <div>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  name='finance_cash'
                  onChange={handlePropertyData}
                  checked={propertyData?.finance_cash}
                />
              }
              label={'Cash'}
            />
          </FormGroup>
        </div>

        <div>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  name='finance_sellerFinance'
                  onChange={handlePropertyData}
                  checked={propertyData?.finance_sellerFinance}
                />
              }
              label={'Seller Finance'}
            />
          </FormGroup>
        </div>

        <div>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  name='finance_mortgage'
                  onChange={handlePropertyData}
                  checked={propertyData?.finance_mortgage}
                />
              } label={'Mortgage'} />
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
          <div className='mt-10'>
            <h1 className='font-semibold text-2xl mb-5'>Images</h1>
            <div className="flex gap-5 mt-5 flex-wrap">
              {selectedImages.map((image, index) => (
                <div key={index} className=" h-44 w-44">
                  <img src={image} alt={`Image ${index}`} />
                  <FormControlLabel
                    label="Default"
                    control={
                      <Checkbox
                        checked={defaultImage === index}
                        onChange={() => handleChange(index)}
                      />
                    }
                  />
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