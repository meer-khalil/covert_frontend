import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Layout from '../Layouts/Layout'
import api from '../../util/api'
import { toast } from 'react-toastify'
import Markdown from './Markdown'
import { UserContext } from '../../context/UserContext'
import Container from '../Layouts/Container'
import ReactGA from "react-ga4";

// icons
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Chip } from '@mui/material'
import BackButton from '../Common/BackButton'

const SingleBlog = () => {

  const navigate = useNavigate();
  const { blog_id } = useParams()
  const [blog, setBlog] = useState({});

  const { user } = useContext(UserContext);

  function sendPageViewEventToGA(blogTitle) {
    await ReactGA.send({
      hitType: 'pageview',
      page: window.location.pathname,
      title: blogTitle,
    });
    console.log("[ReactGA] pageview event sent");
  }

  const getBlogData = async () => {
    try {
      const { data } = await api.get(`/blogs/${blog_id}`)
      console.log('data: ', data);
      setBlog(data);
      sendPageViewEventToGA(data.title)
    } catch (error) {
      console.log(error);
      toast(error?.message);
    }
  }


  const deletePost = async (id) => {
    try {
      const { data } = await api.delete(`/admin/blog/${id}`);

      toast("Blog Deleted Successfully");
      navigate('/blogs')

    } catch (error) {
      console.error(error);
      toast('Error Deleting Blog')
    }
  };

  useEffect(() => {
    getBlogData();
  }, [])

  return (
    <Layout>
      <Container>
        <div className=''>
          <div className="bg-white p-3 rounded-xl shadow-xl relative">
            {
              user?.role == 'admin' && (
                <div className='absolute right-4 top-5 cursor-pointer flex gap-4'>
                  <DeleteIcon className='cursor-pointer' onClick={() => deletePost(blog.slug)} />
                  <EditIcon className='cursor-pointer' onClick={() => {
                    navigate(`/admin/blog/edit/${blog?.slug}`)
                  }} />
                </div>
              )
            }
            <div className=' py-2'>
              <BackButton />
            </div>
            <div className=''>
              <h3 className=' text-2xl lg:text-4xl font-bold font-poppins mb-5'>
                {blog?.title}
              </h3>

              <div className=' w-full  h-[300px] overflow-hidden rounded-tl-lg rounded-tr-lg'>
                <img src={`${process.env.REACT_APP_BACKEND_RESOURCE}/images/blog/${blog?.cover?.filename}`} alt="blog image" className=' w-full h-full object-cover' />
              </div>
              <div className='flex flex-wrap gap-4 py-3'>
                {
                  blog?.tags?.map((cat, index) => (
                    // <Link key={cat} to={`/blogs/category/:id`}>
                    <Chip key={cat.name} size="small" label={cat.name} />
                    // <span className=' bg-primary text-white px-2 rounded-full' key={cat._id}>{cat.name}</span>
                    // </Link>
                  ))
                }
              </div>
              <p className='mt-5 mb-6'>
                {blog?.description}
              </p>
              <Markdown children={blog?.content} />
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export default SingleBlog