import React from 'react'
import PageTitle from '../About/PageTitle'

import image from '../../images/check.png'
import FirstForm from './FirstForm'
import Layout from '../Layouts/Layout'
import SecondForm from './SecondForm'
import { useState } from 'react'
import SubmitButton from './SubmitButton'

function Blog() {

    const [detail, setDetail] = useState({});
    const [agree, setAgree] = useState(false);

    const handleDetail = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setDetail(prev => ({ ...prev, [name]: checked }));
        } else {
            setDetail(prev => ({ ...prev, [name]: value }));
        }
    }
    return (
        <Layout>
            <PageTitle
                title="Buy Property"
                image={image}
                small={true}
            />

            <div className='mt-10'>
                <h3 className='text-2xl text-center font-semibold'>Buy with an Agent</h3>
                <div className='mx-32 mt-12'>
                    <FirstForm detail={detail} handleDetail={handleDetail} />
                    <SecondForm detail={detail} handleDetail={handleDetail} />
                    <SubmitButton />
                </div>
            </div>
        </Layout>
    )
}

export default Blog