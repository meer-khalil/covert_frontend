import React from 'react'
import InformativeIcon from '../../PeopertyDetail/InformativeIcon'

const dataSource = {
  'Population': {
    list: [
      'Areas with increasing population often signal a higher demand for housing.',
      'Investing in areas where people are moving to, rather than from, could offer more security for your investment.'
    ],
    source: 'Census ACS',
    lastDate: '2021'
  },
  'Employment': {
    list: [
      'Areas with higher employment rates might indicate a stable economy, which can be attractive to potential tenants.'
    ],
    source: 'Census ACS',
    lastDate: '2020'
  },
  'Median Price': {
    list: [
      'Observing the trends in median home prices helps identify whether the market is appreciating, depreciating, or stable.'
    ],
    source: 'Realtor',
    lastDate: '2023'
  },
  'Active Listing': {
    list: [
      'An increasing trend may signal an oversupply, while a decreasing trend might indicate limited options in the market.',
      'Understanding whether the market is expanding or contracting helps in crafting a long-term investment strategy.',
      'A downward trend in listings might indicate a market where good deals become scarce and must be acted upon swiftly.',
      'An upward trend might present the chance to be selective and focus on high-quality assets.',

    ],
    source: 'Realtor',
    lastDate: '2023'
  },
  'Days on Market': {
    list: [
      "A shorter DOM generally indicates a seller’s market, while a longer DOM suggests a buyer’s market.",
      "A longer DOM may suggest that a seller is eager to sell, potentially providing buyers with stronger negotiation leverage.",
      'Lower DOM in particular neighborhoods indicates high demand and potentially appreciating property values.',
      'It can help shape rental pricing and vacancy expectations',

    ],
    source: 'Realtor',
    lastDate: '2023'
  },
  'New Listing': {
    list: [
      'A consistent increase or decrease in new listings can signal developing market trends, such as urbanization or suburban growth.',
      'Regular and sustained levels of new listings might suggest a healthy, active market, while erratic changes may indicate instability.'
    ],
    source: 'Realtor',
    lastDate: '2023'
  },
  'Price Reduced Count': {
    list: [
      'High price reduced counts may present opportunities to acquire properties below their initial listing price, and potentially below market value.',
      "Investors might have an advantage in negotiations in a market with numerous price reductions, as sellers may be more willing to negotiate.",
      "A surge in price reductions could indicate an oversaturated market, where supply outweighs demand."
    ],
    source: 'Realtor',
    lastDate: '2023'
  },
  'Pending Listing Count': {
    list: [
      "Consistently high or increasing numbers of pending listings might indicate a vibrant and active market.",
      "A high pending listing count indicates robust buying activity and could suggest a seller's market.",
    ],
    source: 'Realtor',
    lastDate: '2023'
  },
  'Total Listing': {
    list: [
      "Consistent total listing levels might indicate a stable market, potentially signaling a secure investment environment.",
      "Buyers might have more negotiation leverage in markets with high total listings due to increased options."
    ],
    source: 'Realtor',
    lastDate: '2023'
  },
  'Median Gross Rent': {
    list: [
      "Investors can assess whether the median gross rent aligns with their investment goals and yields.",
      "It aids landlords in making informed decisions regarding rent adjustments during lease renewals.",
      "A rising median gross rent may indicate increasing demand"
    ],
    source: 'Census ACS',
    lastDate: '2021'
  },
  'Median Income': {
    list: [
      "Areas with higher median incomes might suggest greater financial stability of tenants or buyers, potentially reducing investment risks.",
      "Rising median income might indicate areas experiencing economic growth, potentially offering lucrative investment opportunities."
    ],
    source: 'Census ACS',
    lastDate: '2021'
  },
  'Cap Rate': {
    list: [
      "A higher Cap Rate suggests a higher potential return, while a lower Cap Rate indicates a lower return.",
      "A higher Cap Rate is associated with higher risk (such as properties in less developed areas or with older buildings), and a lower Cap Rate with lower risk (such as properties in established, stable areas)."
    ],
    source: 'Zillow and ACS',
    lastDate: '2023'
  },
}


const DataSource = ({ category }) => {
  return (
    <div className='border-2 border-primary px-2 mt-10 mx-2 relative'>
      {
        category == 'Cap Rate' &&
        <div className=' absolute top-0	 right-1'>
          <InformativeIcon text="The Cap Rate is calculated by dividing the property's Net Operating Income (NOI) by its current market value or purchase price" />
        </div>
      }
      <h3 className=' text-primary text-2xl font-bold my-3'>
        {category}
      </h3>
      <div>
        <ul className='list-disc ml-5'>
          {

            dataSource[category]?.list?.map((e) => (
              <li>
                <p className=' text-sm break-words'>
                  {e}
                </p>
              </li>
            ))

          }
          <br />
          <li> <span className='font-bold'>Source: </span>
            {dataSource[category]?.source}
          </li>
          <li> <span className='font-bold'>Last Updated: </span>{dataSource[category]?.lastDate}</li>
        </ul>

      </div>
    </div>
  )
}

export default DataSource