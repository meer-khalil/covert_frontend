import React, { useState, useEffect } from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import api from '../../../util/api';
import { toast } from 'react-toastify';
import { Chip } from '@mui/material';



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
        <div className='w-full md:max-w-xl border-gray-400 border rounded p-4'>
            <h3 className="mb-5 font-bold">Category</h3>
            <form onSubmit={handleSubmit}>
                <div className=' flex items-center gap-3'>
                    <TextField
                        placeholder="Enter the Benefit"
                        variant="outlined"
                        name="benefit"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        fullWidth
                        size='medium'
                        autoComplete="off"
                        inputProps={{ style: { fontSize: 15 } }}
                        InputLabelProps={{
                            style: { fontSize: 15, color: "GrayText" },
                        }}
                    />
                    <Button
                        type="submit"
                        size='small'
                        variant="contained"
                        className=' h-[3.3rem] rounded'
                        onClick={handleSubmit}
                    >
                        Update
                    </Button>
                </div>
            </form>
            <div>
                <div className='flex flex-wrap mt-5 gap-3'>
                    {
                        categories?.map((el, i) => (
                            <Chip label={el.name} onDelete={() => removeCategory(el._id)} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Category