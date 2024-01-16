import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react'

const DisplayImages = ({ selectedImages, setSelectedImages, setImages, defaultImage, setDefaultImage }) => {

  const handleImageRemove = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
    setImages(newImages)
  };

  const handleChange = (idx) => {
    setDefaultImage(idx)
  }

  return (
    <div className="flex gap-5 mt-5 flex-wrap">
      {selectedImages?.map((image, index) => (
        <div key={index} className=" h-44 w-44">
          <img src={typeof image === 'object' ? `${process.env.REACT_APP_BACKEND_RESOURCE}/images/${image?.filename}` : image} alt={`Image ${index}`} />
          <FormControlLabel
            label="Default"
            control={
              <Checkbox
                checked={defaultImage === index}
                onChange={() => handleChange(index)}
              />
            }
          />
          <button onClick={() => handleImageRemove(index)} className=' bg-gray-400 px-3 py-1 my-1 rounded text-white'>Remove</button>
        </div>
      ))}
    </div>
  )
}

export default DisplayImages