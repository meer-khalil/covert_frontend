import React from 'react'
import Calendly from './Calendly'
import Layout from '../Layouts/Layout'
import BackButton from '../Common/BackButton'

const SchedualMeeting = () => {
  return (
    <Layout>
      <div className=' max-w-[1080px] mx-auto mt-10'>
        <BackButton />
      </div>
      <Calendly />
    </Layout>
  )
}

export default SchedualMeeting