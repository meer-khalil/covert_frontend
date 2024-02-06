import React, { useContext } from 'react'
import PageTitle from '../About/PageTitle'

import image from '../../images/PageTitles/BuyPageTitle.webp';

import ListingGrid from './ListingGrid'
import Layout from '../Layouts/Layout'

function Buy() {

    return (
        <>
            <PageTitle
                title="Buy"
                image={image}
                small={true}
            />
            <div className=' page-size'>
                <ListingGrid />
            </div>
        </>


    )
}

export default Buy