import React from 'react'
import TriangleLoader from './TriangleLoader'


const Loader = () => {
  return (
    <div className=" absolute top-0 right-0 left-0 bottom-0 flex justify-center items-center">
      <TriangleLoader />
    </div>
  )
}

export default Loader