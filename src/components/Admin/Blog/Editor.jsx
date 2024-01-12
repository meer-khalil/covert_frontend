import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Editor = () => {
  const [value, setValue] = useState('');

  useEffect(() => {
    console.log('Value: ', value);
  }, [value])

  return (
    <ReactQuill
      className=' h-full'
      theme="snow"
      value={value}
      onChange={setValue}
    />
  )
}

export default Editor