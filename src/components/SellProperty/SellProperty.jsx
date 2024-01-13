import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';


import PageTitle from '../About/PageTitle'
import image from '../../images/PageTitles/SellPageTitle.png';
import VerifyAddress from './VerifyAddress';
import VerifyHomeFacts from './VerifyHomeFacts';
import ReviewInfo from './ReviewInfo';
import Buttons from './Buttons';
import { PropertyProvider } from '../../context/PropertyContext';
import SubmitForReview from './SubmitForReview';

import Layout from '../Layouts/Layout';

const steps = [
    'Verify Address',
    'Verify Home Facts',
    'Review Info',
    'Sent for review'
];


export default function SellProperty() {

    const [activeStep, setActiveStep] = useState(0)

    return (
        <Layout>
            <PageTitle
                title="Sell Property"
                image={image}
                small={true}
            />
            <PropertyProvider>
                <div className='my-9 mx-20'>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </div>

                <div className='mx-16'>
                    {(activeStep === 0) && <VerifyAddress />}
                    {(activeStep === 1) && <VerifyHomeFacts />}
                    {(activeStep === 2) && <ReviewInfo />}
                    {(activeStep === 3) && <SubmitForReview />}
                </div>
                <div>
                    {
                        <Buttons setActiveStep={setActiveStep} activeStep={activeStep} />
                    }
                </div>
            </PropertyProvider>
        </Layout>
    );
}