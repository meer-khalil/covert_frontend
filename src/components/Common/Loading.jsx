import React from 'react'
import { Triangle } from 'react-loader-spinner'

const Loader = () => {
  return (
    <div className=" absolute top-0 right-0 left-0 bottom-0 flex justify-center items-center">
      <Triangle
        visible={true}
        height="80"
        width="80"
        color="#716EDC"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  )
}

export default Loader