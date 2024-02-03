import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import PageTitle from '../About/PageTitle'

import image from '../../images/PageTitles/BuyPageTitle.webp';
import Properteis from './Properteis';

const SoldProperties = () => {


  return (
    <Layout>
      <PageTitle
        title="Sold Properties"
        image={image}
        small={true}
      />
      <Properteis />
    </Layout>
  )
}

export default SoldProperties