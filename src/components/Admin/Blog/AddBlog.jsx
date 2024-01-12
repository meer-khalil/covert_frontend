import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

import ImageSelector from "./ImageSelector";
import api from "../../../util/api";
import HandleTags from "./HandleTags.jsx";
import { toast } from "react-toastify";


const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [options, setOptions] = useState([]);

  const handleCategory = (e) => {
    setCategories(prev => [...(new Set([...prev, e.target.value]))])
    setCategory('');
  }

  const addCategory = () => {
    setCategories(prev => [...(new Set([...prev, category]))])
    setCategory('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let categoryIds = categories.map((e) => e._id)

    console.log('Ids: ', categoryIds);

    const postData = {
      title,
      shortDescription,
      longDescription,
      image,
      tags: categoryIds
    };

    try {
      const res = await api.post("/admin/blog/new", postData);
      console.log("CHeck the data: ", res);
      if (res.data.success) {
        toast("Blog Created Successfully");
        // Reset form fields if needed
        setTitle("");
        setShortDescription("");
        setLongDescription("");
        setImage("");
        setCategories([])
      }
    } catch (error) {
      toast("Error while creating the blog");
      console.error("Error creating blog post:", error);
    }
  };

  const removeCategory = (category) => {
    setCategories((prev) => prev.filter((e) => e._id !== category._id))
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

  useEffect(() => {
    fetchCategories();
  }, [])

  return (
    <div>

      <h1 className="text-center text-4xl font-extrabold mb-10">
        Create Blog Post
      </h1>

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
            Create Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
