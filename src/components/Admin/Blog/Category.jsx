import React, { useState, useEffect } from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import api from '../../../util/api';
import { toast } from 'react-toastify';



const Category = () => {

    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);

    const removeCategory = async (id) => {

        try {
            const { data } = await api.delete(`/categories/${id}`);
            console.log('deleted: category(): ', data);
            fetchCategories();
        } catch (error) {
            console.log('Error While creating Category: ', error.message);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let _data = { name: category }

        try {
            const { data } = await api.post('/categories', _data);
            toast(`Category Created: ${data.category.name}`)
            setCategory('')
            fetchCategories();

        } catch (error) {
            console.log('Error While creating Category: ', error.message);
            toast(`Error: ${category}`)
        }
    }

    const fetchCategories = async () => {
        try {
            const { data } = await api.get("/categories");

            const { categories } = data;

            setCategories(categories);
            console.log("Category Data: ", data);
        } catch (error) {
            console.error("Failed to Get the category Data:", error.message);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='mt-5'>
                    <label className=" font-bold">Category</label>
                    <TextField
                        // label="Title"
                        placeholder="Enter the Benefit"
                        variant="outlined"
                        name="benefit"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        fullWidth
                        autoComplete="off"
                        inputProps={{ style: { fontSize: 15 } }}
                        InputLabelProps={{
                            style: { fontSize: 15, color: "GrayText" },
                        }}
                        sx={{ marginTop: "10px" }}
                    />
                    {/* <div className="flex justify-end">
                        <Button
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                p: 1,
                                bgcolor: "#716EDC",
                                "&:hover": {
                                    backgroundColor: "#716EDC",
                                },
                            }}
                        >
                            Add Benefit
                        </Button>
                    </div> */}
                </div>

                <div className="flex justify-end">

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            p: 1,
                            bgcolor: "#716EDC",
                            "&:hover": {
                                backgroundColor: "#716EDC",
                            },
                        }}
                        onClick={handleSubmit}
                    >
                        Update
                    </Button>
                </div>
            </form>
            <div>

                <h3 className=' text-xl font-bold'>Categories</h3>
                <ul className=' pl-12'>
                    {
                        categories?.map((el, i) => (
                            <div className='group'>
                                <div className='relative w-fit'>
                                    <li key={i} className=' list-disc'>{el.name}</li>
                                    <span onClick={() => removeCategory(el._id)} className=' absolute hidden text-xl font-bold cursor-pointer group-hover:block -right-20 -top-1'>x</span>
                                </div>
                            </div>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Category