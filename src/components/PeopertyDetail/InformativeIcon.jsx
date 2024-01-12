import React, { useState } from 'react'

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const InformativeIcon = ({ text }) => {

  const [showText, setShowText] = useState(false);

  const handleShow = () => {
    setShowText((prev) => !prev);
  }
  
  return (
    <div className='relative'>
      <InfoOutlinedIcon
        fontSize='12px'
        color='red'
        className=' cursor-pointer text-red-500'
        onMouseEnter={handleShow}
        onMouseLeave={handleShow}
      />
      {
        showText && (
          <div className='absolute bg-white z-10 left-[10px] bottom-[19px] rounded-md shadow-lg w-[300px] px-3 py-5'>
            <p>
              {text}
            </p>
          </div>
        )
      }
    </div>
  )
}

export default InformativeIcon