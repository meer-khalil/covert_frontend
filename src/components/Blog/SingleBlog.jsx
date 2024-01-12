import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import Layout from '../Layouts/Layout'
import api from '../../util/api'
import { toast } from 'react-toastify'
import { backend_resource } from '../../util/variables'
import Markdown from './Markdown'
import Edit from '../SVGs/Edit'
import { UserContext } from '../../context/UserContext'
import Container from '../Layouts/Container'
const SingleBlog = () => {

  const navigate = useNavigate();
  const { blog_id } = useParams()
  const [blog, setBlog] = useState({});

  const { user } = useContext(UserContext);

  const getBlogData = async () => {
    try {
      const { data } = await api.get(`/blog/${blog_id}`)
      console.log('data: ', data.blog);
      setBlog(data.blog);
    } catch (error) {
      console.log('Error: ', error);
      toast(error?.message);
    }
  }


  useEffect(() => {
    getBlogData();
  }, [])

  return (
    <Layout>
      <Container>
        <div className='pt-8'>
          <div className="bg-white p-3 rounded-xl shadow-xl relative">
            {
              user?.role == 'admin' && (
                <div onClick={() => {
                  navigate(`/admin/blog/edit/${blog?._id}`)
                }} className=' absolute right-4 top-5 cursor-pointer'>
                  <Edit />
                </div>
              )
            }
            <h3 className=' text-2xl lg:text-4xl font-bold font-poppins mb-5'>
              {blog?.title}
            </h3>
            {/* <div style={{
            backgroundImage: `url(${check})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} className=' py-40 rounded-xl overflow-hidden'>
          </div> */}
            <div className=' w-full  h-[300px] overflow-hidden rounded-tl-lg rounded-tr-lg'>
              <img src={`${backend_resource}/images/blog/${blog?.cover?.filename}`} alt="blog image" className=' w-full h-full' />
            </div>
            <div className='flex flex-wrap gap-4 py-3'>
              {
                blog?.tags?.map((cat) => (
                  // <Link key={cat} to={`/blogs/category/:id`}>
                  <span className=' bg-primary text-white px-2 rounded-full' key={cat}>{cat}</span>
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
      </Container>
    </Layout>
  )
}

export default SingleBlog