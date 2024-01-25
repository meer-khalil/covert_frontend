import React from 'react'
import PageTitle from '../About/PageTitle'

import image from '../../images/check.webp'
import Categaries from './Categaries'
import Title from './Title'
import CardGrid from './CardGrid'

import { useParams } from 'react-router-dom'

function BlogCategory() {

  const { id } = useParams()

  return (
    <>
      <PageTitle
        title="Blog"
        image={image}
      />
      <div className='px-20 pt-12'>
        <Title />
        <Categaries />
        <CardGrid blogs={[]} />
      </div>
    </>
  )
}

export default BlogCategory