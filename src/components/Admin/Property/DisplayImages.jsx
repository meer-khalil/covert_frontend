import React from 'react'
import { backend_resource } from '../../../util/variables';

const DisplayImages = ({ selectedImages, setSelectedImages, setImages }) => {

  const handleImageRemove = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
    setImages(newImages)
  };

  return (
    <div className="flex gap-5 mt-5 flex-wrap">
      {selectedImages?.map((image, index) => (
        <div key={index} className=" h-44 w-44">
          <img src={typeof image === 'object' ? `${backend_resource}/images/${image?.filename}` : image} alt={`Image ${index}`} />
          <button onClick={() => handleImageRemove(index)} className=' bg-gray-400 px-3 py-1 my-1 rounded text-white'>Remove</button>
        </div>
      ))}
    </div>
  )
}

export default DisplayImages