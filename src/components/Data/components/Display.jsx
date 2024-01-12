import React from 'react'
import DropDown from '../DropDown'
import ZipCodeChart from '../ZipCodeChart'

const Display = ({ category, setCategory, zipcode }) => {
  return (
    <div className=' m-4'>
      <div className=' flex  justify-center'>
        <div className=' max-w-xs'>
          <DropDown
            category={category}
            setCategory={setCategory}
          />
        </div>
      </div>
      <ZipCodeChart category={category} zipcode={zipcode} />
    </div>
  )
}

export default Display