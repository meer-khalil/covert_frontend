import React, { useState } from 'react'
import InformativeIcon from '../InformativeIcon'
import PopUpGraph from './PopUpGraph'
import { useEffect } from 'react';
import { PropertyContext } from '../../../context/PropertyContext';
import { useContext } from 'react';

const TopInfo = ({ property, downPaymentCashFlow }) => {


  const [showPopUp, setShowPopup] = useState(false);

  const { monthlyExpense, initialExpense } = useContext(PropertyContext);

  useEffect(() => {
    console.log('check the cash on cash');
    console.log(`${Math.floor(
      (((property.rentalIncome - monthlyExpense) * 12) / ((property.price * 0.2)))
    )}`);
  }, [])

  return (
    <div className='border-2 border-blue-500 py-5 px-10 grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-5'>
      {
        [
          {
            title: 'Rental Income', price: `$${property.rentalIncome}`, popup: 'See comes',
            price2: Math.floor(property.rentalIncome / 30),
          },
          { title: 'Total Monthly Expense.', price: `$${monthlyExpense}`, link_text: 'Customize Mortgage Calculator', link_url: '/', },
          {
            title: 'Cash Flow', price: `$${property.rentalIncome - monthlyExpense}`, link_text: 'Customize Mortgage Calculator', link_url: '/',
            info: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum, provident similique aspernatur eveniet accusamus suscipit alias atque aliquid eaque quos vitae itaque quam sint error aperiam necessitatibus. Alias, deserunt hic?'
          },
          {
            title: 'Cash on Cash', price: `${Math.floor(
              ((
                (property.rentalIncome - monthlyExpense) * 12)
                /
                ((downPaymentCashFlow) + initialExpense)) * 100
            )}%`
          },

          // { title: 'Cap Rate', price: '813' },
          // { title: '10 Year Payback Balance', price: '813' },
        ].map((el, i) => (
          <div className='border-b-2 border-gray-200'>

            <div className='my-3 flex justify-between items-center relative'>
              <p>{el.title}</p>
              <p>{el.price}</p>
              {
                el.info && (
                  <div className=' absolute left-0 -top-5'>
                    <InformativeIcon text={el.info} />
                  </div>
                )
              }
            </div>
            {el.popup && (
              <div className='my-1 flex justify-between items-center'>
                <div>
                  <span className=' text-blue-600 underline cursor-pointer'
                    onClick={() => setShowPopup((prev) => !prev)}
                  >
                    {el.popup}
                  </span>
                </div>
                {
                  el.price2 && <p>${el.price2} / night</p>
                }
              </div>
            )}
          </div>
        ))
      }
      {
        showPopUp && (
          <PopUpGraph zipcode={property.zipcode} setShowPopup={setShowPopup} />
        )
      }
    </div>
  )
}

export default TopInfo