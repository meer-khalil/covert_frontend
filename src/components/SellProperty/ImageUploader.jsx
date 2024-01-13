import React, { useContext, useState } from 'react';
import { PropertyContext } from '../../context/PropertyContext';
import { Checkbox, FormControlLabel } from '@mui/material';

const ImageUploader = () => {

  const { setImages, selectedImages, defaultImage, setDefaultImage, setSelectedImages, files, setFiles } = useContext(PropertyContext);

  const handleImageChange = (e) => {
    const files = e.target.files;

    setImages(prev => [...prev, ...files])

    const imageArray = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        imageArray.push(event.target.result);
        if (imageArray.length === files.length) {
          setSelectedImages([...selectedImages, ...imageArray]);
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const handleImageRemove = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
    setImages(newImages)
  };


  const handleFileChange = (e) => {
    const files = e.target.files;
    setFiles(prev => [...prev, ...files])
  };

  const handleFileRemove = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles)
    setDefaultImage(0)
  };

  const handleChange = (idx) => {
    setDefaultImage(idx)
  }

  return (
    <>
      <div className='flex gap-5 mt-4'>
        <div className="flex-1">
          <label for="fileInput" class="flex flex-col items-center justify-center px-4 py-12 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer h-48">
            <svg class="w-12 h-12 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            <span class="text-gray-600">Upload a file</span>
            <input
              id="fileInput"
              multiple
              type="file"
              class="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
          <div className="flex gap-5 mt-5 flex-wrap">
            {selectedImages.map((image, index) => (
              <div key={index} className=" h-44 w-44">
                <img src={image} alt={`Image ${index}`} />
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
        </div>

        <div className="flex-1">
          <label id="dropArea" class="flex cursor-pointer items-center justify-center h-48 border-2 border-dashed border-gray-400 rounded-lg">
            <div class="text-center">
              <svg class="w-12 h-12 mx-auto text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              <p class="mt-2 text-gray-500">Drag and drop files here</p>
            </div>
            <input
              id="fileInput"
              type="file"
              class="hidden"
              multiple
              onChange={handleFileChange}
            />
          </label>
          <div className="flex gap-5 mt-5 flex-wrap">
            {files?.map((image, index) => (
              <div key={index} className=" h-44 w-44">
                {/* <img src={image} alt={`Image ${index}`} /> */}
                <button onClick={() => handleFileRemove(index)} className=' bg-gray-400 px-3 py-1 my-1 rounded text-white'>Remove</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
      </div>
    </>
  );
};

export default ImageUploader;
