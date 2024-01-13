import React from 'react'
import { backend_resource } from '../../util/variables'

const Images = ({ property }) => {
  return (
    <div className="flex flex-col md:flex-row my-5 gap-8 overflow-hidden">
      <div className=' flex-[3] rounded-2xl overflow-hidden'>
        <img src={`${backend_resource}/images/${property?.images[property?.defaultImage || 0]?.filename}`} alt="" srcset="" />
      </div>

      {/* </div> */}
      <div className=' flex-[1] flex flex-col gap-4'>
        <div className='rounded-2xl overflow-hidden mb-5 flex-1'>
          <img className='w-full h-full' src={`${backend_resource}/images/${property?.images[property?.defaultImage !== 1 ? 1 : 0]?.filename}`} alt="Property Second" />
        </div>
        <div className='rounded-2xl overflow-hidden flex-1 relative'>
          <img className='w-full h-full z-0' src={`${backend_resource}/images/${property?.images[property?.defaultImage !== 2 ? 2 : 1]?.filename}`} alt="" />
          {
            (property?.images?.length > 2) && (
              <div className=' absolute left-0 top-0 right-0 bottom-0'>
                <div className='absolute left-0 top-0 right-0 bottom-0 bg-gray-400 opacity-75 z-0'></div>
                <div className='text-7xl text-white font-bold flex justify-center items-center absolute left-0 top-0 right-0 bottom-0 z-10'>
                  {property?.images?.length - 1} +
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Images