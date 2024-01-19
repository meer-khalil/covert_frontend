import React, { useContext, useEffect, useState } from 'react'

import PageTitle from '../About/PageTitle'

import image from '../../images/PageTitles/DetailPageTitle.png'

import { Autocomplete, Box, Button, Divider, TextField, Typography } from '@mui/material'
import Table from './Table';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import api from '../../util/api';
import Images from './Images';
import BasicDetail from './BasicDetail';
import Map from './Map';
import MortgageCalculator from './MortgageCalculator';
import MarketAnalysis from './MarketAnalysis';
import FinancialAnalysis from './FinancialAnalysis/FinancialAnalysis';
import PopUp from './PopUp';
import InvestmentPayback from './InvestmentPayback';
import { PropertyProvider } from '../../context/PropertyContext';
import Layout from '../Layouts/Layout';
import SlideShow from './SlideShow';



function PropertyDetails() {

  const { propertyId } = useParams();
  const [property, setProperty] = useState(null)
  const [zipData, setZipData] = useState(null)
  const [showSlide, setShowSlide] = useState(false);

  const [downPaymentCashFlow, setDownPaymentCashFlow] = useState(1);

  const getZipCodeData = async (zipcode) => {
    try {

      const { data } = await api.get(`/zipcode/${zipcode}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log('ZipCode Data ', data);
      setZipData(data)
    } catch (error) {
      console.log('Error: ', error.message);
      alert('ZipCode Detail: ', error.message);
    }
  }
  const getPropertyData = async () => {
    try {

      const { data } = await api.get(`/properties/${propertyId}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const { property } = data;
      setProperty(property)
      const zipcode = property?.zipcode
      console.log('Data for Properties: ', data);
      getZipCodeData(zipcode);
    } catch (error) {
      console.log('Error: ', error.message);
      alert('Property Detail: ', error.message);
      alert("Property Error")
    }
  }

  useEffect(() => {
    getPropertyData()
  }, [])


  return (
    <Layout>
      <PropertyProvider>
        {
          property ? (
            <>
              <PageTitle
                title="Property Details"
                image={image}
                small={true}
              />

              <div className='px-3 page-size'>

                <Images property={property} setShowSlide={setShowSlide}/>
                <BasicDetail property={property} />


                {
                  zipData && (
                    <Map zipCode={zipData?.zipcode} />
                  )
                }

                <div className='flex mt-20 flex-col md:flex-row'>
                  <MortgageCalculator price={property?.price} setDownPaymentCashFlow={setDownPaymentCashFlow} />
                  {
                    zipData &&
                    <MarketAnalysis zipCode={property?.zipcode} data={zipData['medianGrossRent']} capData={zipData['capData']} />
                  }
                </div>

                <FinancialAnalysis downPaymentCashFlow={downPaymentCashFlow} property={property} />

                <InvestmentPayback
                  property={property}
                />
                {
                  showSlide && (
                    <div className='absolute left-0 top-0 right-0 bottom-0 z-50'>
                      <div className='absolute left-0 top-0 right-0 bottom-0 bg-gray-600 bg-opacity-50' onClick={() => setShowSlide(false)}>
                      </div>
                      <div className=' h-full w-full flex justify-center items-center'>
                        <div className=' w-[60rem]'>
                          <SlideShow images={property.images} />
                        </div>
                      </div>
                    </div>
                  )
                }
              </div >
            </>
          ) : (
            <PopUp />
          )
        }
      </PropertyProvider>
    </Layout>
  )
}

export default PropertyDetails