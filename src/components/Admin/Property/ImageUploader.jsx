import { useEffect, useRef, useState } from "react";

function ImageUploader({ images, setImages, setSelectedImages }) {
  const ref = useRef(null);

  const handleImageUpload = (e) => {
    const files = e.target.files;

    setImages(prev => [...prev, ...files])

    const imageArray = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        imageArray.push(event.target.result);
        if (imageArray.length === files.length) {
          setSelectedImages(prev => [...prev, ...imageArray]);
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  useEffect(() => {
    console.log('Images in Uploader: ', images);
    setSelectedImages(images)
  }, [])

  return (
    <div>
      <div className="bg-gray-100 p-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-semibold mb-4">Upload an Image</h1>
          <form>
            <label className="block mb-2 font-medium">Select an Image:</label>
            <div className="flex items-center justify-center w-full h-32 bg-white border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
              <input type="file" name="image" ref={ref} onChange={handleImageUpload} accept="image/*" className="hidden" style={{ display: 'none' }} />
              <div className="text-center" onClick={() => ref.current.click()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mx-auto h-8 w-8 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <p className="mt-1 text-sm text-gray-600">Click to select an image</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ImageUploader;
