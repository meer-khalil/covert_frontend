import React, { useContext } from "react";
import { PropertyContext } from "../../context/PropertyContext";
import { Checkbox, FormControlLabel } from "@mui/material";
import { BiFileBlank } from "react-icons/bi";

const ImageUploader = () => {
  const {
    setImages,
    selectedImages,
    defaultImage,
    setDefaultImage,
    setSelectedImages,
    files,
    setFiles,
    setFileLabels,
    fileLabels,
  } = useContext(PropertyContext);

  const handleImageChange = (e) => {
    const files = e.target.files;

    setImages((prev) => [...prev, ...files]);

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
    setImages(newImages);
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setFiles((prev) => [...prev, ...files]);
    // Create an array of empty strings to store the labels of the files
    setFileLabels((prev) => [
      ...prev,
      ...Array.from({ length: files.length }, () => ""),
    ]);
  };

  const handleFileLabelChange = (val, fileIndex) => {
    const newFileLabels = [...fileLabels];
    newFileLabels[fileIndex] = val;
    setFileLabels(newFileLabels);
  };

  const handleFileRemove = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles || []);
    setDefaultImage(0);
    // Remove the label of the file
    const newFileLabels = [...fileLabels];
    newFileLabels.splice(index, 1);
    setFileLabels(newFileLabels || []);
  };

  const handleChange = (idx) => {
    setDefaultImage(idx);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-5 mt-4">
        <div className="flex-1">
          <label
            for="fileInput"
            class="flex flex-col items-center justify-center px-4 py-12 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer h-48"
          >
            <svg
              class="w-12 h-12 mr-2 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
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
                <button
                  onClick={() => handleImageRemove(index)}
                  className=" bg-gray-400 px-3 py-1 my-1 rounded text-white"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <label
            id="dropArea"
            class="flex cursor-pointer items-center justify-center h-48 border-2 border-dashed border-gray-400 rounded-lg"
          >
            <div class="text-center">
              <svg
                class="w-12 h-12 mx-auto text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              <p class="mt-2 text-gray-500">Drag and drop files here</p>
            </div>
            <input
              id="fileInput"
              type="file"
              class="hidden"
              multiple
              onChange={(e) => {
                console.log("A file has been selected", e.target.files);
                handleFileChange(e);
                e.target = null;
                e.currentTarget.value = null;
              }}
            />
          </label>
          <div className="flex gap-5 mt-5 flex-wrap">
            {files?.map((f, index) => (
              <div key={index} className="flex flex-col items-center w-[120px]">
                {/* <img src={image} alt={`Image ${index}`} /> */}
                <BiFileBlank className="w-16 h-16 mx-auto text-gray-500" />
                <p className="text-xs text-center text-gray-500 mb-1 w-full truncate">
                  {f.name}
                </p>
                <input
                  placeholder="Enter Label"
                  className="border rounded px-2 py-1 w-[100px] text-xs"
                  value={fileLabels[index]}
                  onChange={(e) => handleFileLabelChange(e.target.value, index)}
                />

                <button
                  onClick={() => handleFileRemove(index)}
                  className=" bg-gray-400 px-3 py-1 my-1 rounded text-white"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default ImageUploader;
