import React, { useEffect, useState } from 'react'
import PageTitle from '../About/PageTitle'

import image from '../../images/PageTitles/BlogPageTitle.png';
import Categaries from './Categaries'
import Title from './Title'
import CardGrid from './CardGrid'
import api from '../../util/api'
import Layout from '../Layouts/Layout'
import { toast } from 'react-toastify';
import Pagination from './Pagination';
import Container from '../Layouts/Container';



function Blog() {

  const [category, setCategory] = useState(null)
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const fetchBlogData = async () => {
    let url = ''
    if (category) {

      url = `/blogs/tag/${category}`
    } else {
      url = `/blogs`
    }

    try {
      const { data } = await api.get(url, {
        params: {
          page
        }
      });

      const { blogs, filteredPropertiesCount, resultPerPage } = data
      const pages = Math.ceil(filteredPropertiesCount / resultPerPage);
      setPages(pages)
      setBlogs(blogs);
      // toast(`Blogs for: ${category}`);
      console.log('Blog Data: ', data);

    } catch (error) {
      console.error("Failed to Get the Home Data:", error.message);
    }
  };


  useEffect(() => {
    fetchBlogData();
  }, [category, page]);

  return (
    <Layout>

      <PageTitle
        title="Blog"
        image={image}
      />

      <Container>
        <div className='px-5 pt-12'>
          <div>
            <Title />
            <Categaries category={category} setCategory={setCategory} />
            <CardGrid blogs={blogs} />
          </div>
          <Pagination page={page} pages={pages} changePage={setPage} />
        </div>
      </Container>
    </Layout>
  )
}

export default Blog