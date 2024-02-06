import React from 'react'
import { Triangle } from 'react-loader-spinner'

const TriangleLoader = () => {
  return (
    <Triangle
      visible={true}
      height="80"
      width="80"
      color="#716EDC"
      ariaLabel="triangle-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  )
}

export default TriangleLoader