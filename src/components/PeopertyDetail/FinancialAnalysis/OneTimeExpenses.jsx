import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { PropertyContext } from '../../../context/PropertyContext';



export const Field = ({ handleChange, values }) => {

  const [name, setName] = useState('new')

  const handleInputChange = (event) => {
    const newValue = event.target.textContent;
    setName(newValue)
  };

  return (
    <div className='flex justify-between items-center mb-5'>
      <p contentEditable="true" onInput={handleInputChange}>
        Edit this content.
      </p>
      <div class="relative flex items-center">
        <span class="absolute inset-y-0 left-0 flex bg-blue-500 rounded-tl-lg rounded-bl-lg items-center justify-center px-3">
          <span class="text-white">$</span>
        </span>
        <input
          type="text"
          name={name}
          value={values[name]}
          onChange={handleChange}
          className="pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 w-24" placeholder="500" />
      </div>

    </div>
  )
}
const OneTimeExpenses = () => {

  const [values, setValues] = useState({});
  const [total, setTotal] = useState(0)
  const [newValues, setNewValues] = useState([]);

  const { setInitialExpense } = useContext(PropertyContext);

  const addNewField = () => {
    let content = <Field handleChange={handleChange} values={values} />
    setNewValues((prev) => [...prev, content])
  }

  const calculateTotal = () => {

    const keys = Object.keys(values);
    let temp = 0;
    keys.forEach((key) => {
      const value = +values[key];
      console.log('value: ', value);
      console.log(`Key: ${key}, Value: ${value}`);
      temp += value
    });
    setTotal(temp);
    setInitialExpense(temp);
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setValues((prev) => ({
      ...prev,
      [name]: value
    }))
  }


  useEffect(() => {
    calculateTotal();
  }, [values])

  return (
    <div className='flex-1 mt-2'>

      <div className='text-center bg-primary bg-opacity-70 text-white py-2'>
        One time startup costs
      </div>

      <div className='m-5'>
        
        {
          [
            {
              title: 'Inspection',
              name: 'inspections'
            },
            {
              title: 'Total Repair Cost',
              name: 'totalRepairCost'
            }
            ,
            {
              title: 'Furniture & Appliance',
              name: 'furnitureAppliance'
            },
            {
              title: 'Closing Costs',
              name: 'closingCost'
            }
          ].map((item, i) => (

            <div className='flex justify-between items-center mb-5'>
              <p>{item.title}</p>
              <div class="relative flex items-center">
                <span class="absolute inset-y-0 left-0 flex bg-blue-500 rounded-tl-lg rounded-bl-lg items-center justify-center px-3">
                  <span class="text-white">$</span>
                </span>
                <input
                  type="text"
                  name={item.name}
                  value={values[item.name]}
                  onChange={handleChange}
                  className="pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 w-24" placeholder="0" />
              </div>
            </div>
          ))
        }
        {
          newValues.map((e) => e)
        }
        <div className='flex justify-center text-blue-500 mt-5 border-t-2 border-b-2 py-3'>
          <div className=' cursor-pointer' onClick={addNewField}>
            Add Customer Expense
          </div>
        </div>
        <div className='flex justify-between px-10 py-7'>
          <p>Total</p>
          <p className='text-blue-400'>$ {total}</p>
        </div>
      </div>
    </div >

  )
}

export default OneTimeExpenses