import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

const HandleTags = ({ category, categories, handleCategory, addCategory, removeCategory, options }) => {
  return (
    <>
      <div className=" mb-3">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Category"
            onChange={handleCategory}
          >
            {
              options?.map((e) => (
                <MenuItem value={e}>{e.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>

      {/* Display Categories */}
      {
        categories.length > 0 && (
          <div>
            <h3 className="text-xl font-bold">Tags</h3>
            <ul className=" pl-12">
              {
                categories?.map((el) => (

                  <div className='group' key={el._id}>
                    <div className='relative w-fit'>
                      <li className=' list-disc'>{el.name}</li>
                      <span onClick={() => removeCategory(el)} className=' absolute hidden text-xl font-bold cursor-pointer group-hover:block -right-20 -top-1'>x</span>
                    </div>
                  </div>
                ))
              }
            </ul>
          </div>
        )
      }
    </>
  )
}

export default HandleTags