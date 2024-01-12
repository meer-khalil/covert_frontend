import React from 'react'
import ZipCodeChart from '../../Data/ZipCodeChart'

const PopUpGraph = ({ zipcode, setShowPopup }) => {
  return (
    <div className=' fixed left-0 top-0 right-0 bottom-0 z-10 flex justify-center items-center bg-gray-500 bg-opacity-50'>

      <div className=' h-[400px] w-[700px] bg-white relative px-3 py-5 rounded-md'>
        <span
          onClick={() => setShowPopup(false)}
          className=' absolute -top-10 -right-10 text-2xl text-red-800 border-2 border-black rounded-full cursor-pointer w-8 h-8 flex justify-center items-center'
        >X</span>
        <ZipCodeChart category={'Median Gross Rent'} zipcode={zipcode || '00612'} />
      </div>
    </div>
  )
}

export default PopUpGraph