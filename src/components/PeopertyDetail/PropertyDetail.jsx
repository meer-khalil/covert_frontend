import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// components
import PageTitle from '../About/PageTitle'
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
import api from '../../util/api';

// images
import image from '../../images/PageTitles/DetailPageTitle.webp'
import BackButton from '../Common/BackButton';
import Loader from '../Common/Loading';

function PropertyDetails() {

  const navigate = useNavigate();
  const { slug } = useParams();
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

      const { data: property } = await api.get(`/properties/${slug}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      setProperty(property)
      const zipcode = property?.zipcode
      console.log('Data for Properties: ', property);
      getZipCodeData(zipcode);

    } catch (error) {
      console.log('Error: ', error.message);
      toast(error.message)
    }
  }

  useEffect(() => {
    getPropertyData()
  }, [])


  if (!property) return <Loader />

  return (
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
              <div className='py-2'>
                <BackButton />
              </div>
              <div className=''>
                <Images property={property} setShowSlide={setShowSlide} />
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
              </div>
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
  )
}

export default PropertyDetails