import React, { useContext } from 'react'
import PageTitle from '../About/PageTitle'

import image from '../../images/PageTitles/BuyPageTitle.webp';

import ListingGrid from './ListingGrid'
import Layout from '../Layouts/Layout'
import { UserContext } from '../../context/UserContext';
import DialogBox from './DialogBox';

function Buy() {

    return (
        <Layout>
            <PageTitle
                title="Buy"
                image={image}
            // small={true}
            />
            <div className=' page-size'>
                <ListingGrid />
            </div>
        </Layout>
    )
}

export default Buy