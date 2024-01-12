import React, { useContext } from 'react'
import PageTitle from '../About/PageTitle'

import image from '../../images/PageTitles/BuyPageTitle.png';

import ListingGrid from './ListingGrid'
import Layout from '../Layouts/Layout'
import { UserContext } from '../../context/UserContext';
import DialogBox from './DialogBox';

function Buy() {
    const { user } = useContext(UserContext);

    return (
        <Layout>
            <PageTitle
                title="Buy"
                image={image}
            // small={true}
            />
            <div className=' page-size'>
                {
                    ['buyer', 'admin'].includes(user?.role) ? (
                        <ListingGrid />
                    ) : (
                        <DialogBox />
                    )
                }
            </div>
        </Layout>
    )
}

export default Buy