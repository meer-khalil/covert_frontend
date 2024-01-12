import React from 'react'

// GOOGLE_API_KEY: AIzaSyB-9rP6868HZj3IrevShigYHl-aYAYHizA

// import map from '../../images/map.png'
import GoogleMap from './GoogleMap'

const Map = ({ zipCode }) => {

  console.log("Zipcode: ", zipCode);

  return (
    <div className='h-[500px] rounded-[16px] relative'>
      <GoogleMap zipCode={zipCode} />
    </div>
  )
}

export default Map