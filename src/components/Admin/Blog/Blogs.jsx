import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

import Cross from '../../SVGs/Cross'
import Edit from '../../SVGs/Edit'
import ImageSelector from './ImageSelector';
import api from '../../../util/api';
import Categaries from '../../Blog/Categaries';
import { toast } from 'react-toastify';
import HandleTags from './HandleTags';
import { useNavigate } from 'react-router-dom';

const Blogs = () => {

  const navigate = useNavigate();
  const [posts, setPosts] = useState(null)
  const [post, setPost] = useState(null)


  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [options, setOptions] = useState([]);

  const [fCategory, setFcategory] = useState(null);

  const handleCategory = (e) => {
    setCategory(e.target.value)
  }

  const addCategory = () => {
    setCategories([...categories, category])
    addBlogToCategory(category._id, post._id);
    setCategory('');
  }

  const addBlogToCategory = async (_category, blogId) => {
    // console.log('category: ', _category);
    // return
    try {

      const { category } = await api.put(`/categories/addblog/${_category}`, { id: blogId })

      console.log('categoryBlog: ', category);
      alert('Added Blog to Category')
    } catch (error) {
      console.log('Error adding blog to Category');
      alert('Error adding Blog to category')
    }
  }

  const removeCategory = (category) => {
    setCategories((prev) => prev.filter((e) => e._id !== category._id))
    removeBlogToCategory(category._id, post._id)
  }


  const removeBlogToCategory = async (_category, blogId) => {
    try {

      const res = await api.put(`/categories/removeblog/${_category}`, { id: blogId })

      console.log('categoryBlog(remove): ', res);
      alert('Remove Blog from Category')

    } catch (error) {
      console.log('Error removing blog from Category');
      alert('Error removing Blog from category')
    }
  }

  const fetchCategories = async () => {
    try {

      const { data } = await api.get("/categories");
      setOptions(data.categories);
      console.log('Categories: ', data);

    } catch (error) {
      console.error("Failed to Get the Home Data:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const putData = {
      title,
      shortDescription,
      longDescription,
      image,
      tags: categories
    };

    try {

      console.log('Put Data: ', putData);
      const res = await api.put(`/admin/blog/${post._id}`, putData)

      console.log('CHeck the data: ', res);

      if (res.data.success) {

        console.log('Blog post updated successfully');
        toast('Blog Updated Successfully');

        // Reset form fields if needed
        setTitle('');
        setShortDescription('');
        setLongDescription('');
        setCategories([]);
        setImage('');

        setPost(null)
        fetchPosts()
      }

    } catch (error) {
      alert('Error')
      console.error('Error creating blog post:', error);
    }
  };


  const fetchPosts = async () => {
    const { data } = await api.get('/blogs')
    setPosts(data.blogs)
    console.log('Data: ', data.blogs);
  }

  const deletePost = async (id) => {
    try {
      const { data } = await api.delete(`/admin/blog/${id}`);

      toast("Blog Deleted Successfully");

      let temp = posts.filter((el) => el._id !== id)
      setPosts(temp)

    } catch (error) {
      console.error('Error deleting post:', error);
      toast('Error Deleting Blog')
    }
  };



  const fetchBlogData = async () => {

    let url = ''
    if (fCategory) {

      url = `/categories/${fCategory}`

    } else {
      url = `/blogs`
    }

    try {
      const { data } = await api.get(url);

      setPosts(data.blogs);

      console.log('Blog Data: ', data);

    } catch (error) {
      console.error("Failed to Get the Home Data:", error.message);
    }
  };


  useEffect(() => {
    // fetchPosts()
    fetchCategories();
  }, [])


  useEffect(() => {
    fetchBlogData()
  }, [fCategory])

  return (
    <div>
      {
        post ? (
          <div>
            <h1 className='text-center text-4xl font-semibold mb-10'>Create Blog Post</h1>


            <form
              onSubmit={handleSubmit}
              className="shadow-2xl max-w-[40rem] mx-auto py-5 px-3 md:py-12 md:px-12"
            >
              <TextField
                label="Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                autoComplete="off"
                inputProps={{ style: { fontSize: 15 } }}
                InputLabelProps={{
                  style: { fontSize: 15, color: "GrayText" },
                }}
              />

              <div className=" my-6">
                <TextField
                  label="Short Description"
                  variant="outlined"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  fullWidth
                  autoComplete="off"
                  inputProps={{ style: { fontSize: 15 } }}
                  InputLabelProps={{
                    style: { fontSize: 15, color: "GrayText" },
                  }}
                  multiline
                  rows={3}
                />

              </div>

              <HandleTags
                category={category}
                categories={categories}
                handleCategory={handleCategory}
                addCategory={addCategory}
                removeCategory={removeCategory}
                options={options}
              />

              <div className=" my-6">
                <TextField
                  label="Long Description"
                  variant="outlined"
                  value={longDescription}
                  onChange={(e) => setLongDescription(e.target.value)}
                  fullWidth
                  autoComplete="off"
                  inputProps={{ style: { fontSize: 15 } }}
                  InputLabelProps={{
                    style: { fontSize: 15, color: "GrayText" },
                  }}
                  multiline
                  rows={5}
                />

              </div>

              <ImageSelector image={image} setImage={setImage} />
              <div className="mt-10 flex justify-end">
                <button
                  type="submit"
                  className="border-2 border-secondary px-5 py-3 bg-transparent hover:bg-primary hover:text-white"
                >
                  Update Blog
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className='flex flex-col gap-5'>
            <div className="mb-5">
              <Categaries category={fCategory} setCategory={setFcategory} />
            </div>
            {
              posts?.map((post) => (
                <>

                  <div className='flex gap-5'>
                    <div className='flex-1 h-28 overflow-hidden bg-cover'>
                      <img src={`${process.env.REACT_APP_BACKEND_RESOURCE}/images/blog/${post?.cover?.filename}`} alt="post" className=' w-full h-full' />
                    </div>
                    <div style={{ flex: 3 }}>
                      <h3 className='text-2xl font-semibold tracking-widest'>{post.title}</h3>
                      <p>{post.description}</p>
                    </div>
                    <div className='flex-1 flex gap-2'>
                      <div onClick={() => deletePost(post._id)} className=' cursor-pointer'>
                        <Cross />
                      </div>
                      <div onClick={() => {
                        navigate(`/admin/blog/edit/${post._id}`)
                      }} className=' cursor-pointer'>
                        <Edit />
                      </div>
                    </div>
                  </div>
                </>
              ))
            }
          </div>
        )
      }
    </div>
  )
}

export default Blogs