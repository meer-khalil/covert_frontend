import React, { useState, useEffect } from 'react';
import api from '../../../util/api';

import login from "../../../images/check2.png";

// import './PropertyForm.css'
import ImageUploader from './ImageUploader';
import { useNavigate, useParams } from 'react-router-dom';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import DisplayImages from './DisplayImages';
import ImageUploader2 from './ImageUploader2';

const PropertyForm = () => {

	const { id } = useParams();

	const [selectedImages, setSelectedImages] = useState([])

	const [address, setAddress] = useState('');
	// const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [category, setCategory] = useState('');
	const [actualCAP, setActualCAP] = useState('');
	const [proFormaCAP, setProFormaCAP] = useState('');
	const [occupancy, setOccupancy] = useState('');
	const [units, setUnits] = useState('');
	const [images, setImages] = useState([]);
	const [feature, setFeature] = useState('');
	const [features, setFeatures] = useState([]);
	const [oldImages, setOldImages] = useState([]);

	async function getPropertyData(id) {
		let url = `/properties/${id}`;
		const { data } = await api.get(url);

		let { property } = data

		console.log('Property Updating: ', property);
		const {
			address,
			// description,
			price,
			actualCAP,
			proFormaCAP,
			occupancy,
			units,
			images,
			category,
			features
		} = property;

		setAddress(address);
		// setDescription(description);
		setPrice(price);
		setCategory(category);
		setActualCAP(actualCAP);
		setProFormaCAP(proFormaCAP);
		setOccupancy(occupancy);
		setUnits(units);
		setImages(images);
		setSelectedImages(images);
		setOldImages(images);
		setFeatures(features);
	}
	useEffect(() => {
		if (id) {
			console.log('Here is Id: ', id);
			getPropertyData(id);
		} else {
			console.log('There is no id', id);
		}
	}, [id]);

	const handleSubmit = async (event) => {
		// event.preventDefault();

		const formData = new FormData();

		// let property = {
		// 	address,
		// 	price,
		// 	actualCAP,
		// 	proFormaCAP,
		// 	occupancy,
		// 	units,
		// 	category,
		// 	features
		// }
		// formData.append('property', JSON.stringify(property))

		formData.append('address', address)
		// formData.append('description', description)
		formData.append('price', price)
		formData.append('actualCAP', actualCAP)
		formData.append('proFormaCAP', proFormaCAP)
		formData.append('occupancy', occupancy)
		formData.append('units', units)
		formData.append('category', category)

		for (let i = 0; i < features.length; i++) {
			formData.append('features', features[i])
		}
		try {
			if (id) {

				let newImages = images.filter((obj) => !obj.hasOwnProperty('_id'));
				let oldPreserved = images.filter((obj) => obj.hasOwnProperty('_id'));

				let deleteImages = oldImages.filter(e => {
					let del = true;
					for (let index = 0; index < oldPreserved.length; index++) {
						const element = oldPreserved[index];
						if (element?._id === e._id) {
							del = false
							break;
						}
					}
					if (del) {
						return e;
					}
				})

				for (let i = 0; i < newImages.length; i++) {
					formData.append('images', newImages[i]);
				}
				for (let i = 0; i < deleteImages.length; i++) {
					formData.append('deleteImages', JSON.stringify(deleteImages[i]))
				}
				for (let i = 0; i < oldPreserved.length; i++) {
					formData.append('oldImages', JSON.stringify(oldPreserved[i]))
				}

				const { data } = await api.put(`/admin/properties/${id}`, formData, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				});
				console.log('Updated Property: ', data.property);
				toast("Property Updated")
			} else {

				for (let i = 0; i < images.length; i++) {
					formData.append('images', images[i]);
				}

				const { data } = await api.post('/admin/properties/new', formData);
				console.log('Created: \n', data.propertyData);
				toast("Property Created!")
			}
		}

		catch (error) {
			console.error('Error Updating/Creating Property:', error.message);
			toast(error.message);
		}
	};


	const removeFeature = (index) => {
		console.log('index: ', index);
		// Create a copy of the original features array
		const temp = [...features];
		// Remove the item at the specified index using splice
		temp.splice(index, 1);
		// Return the modified array
		setFeatures(temp);
	}

	return (
		<div className='flex justify-center'>
			<div className='max-w-2xl'>
				<h1 className="text-2xl md:text-4xl font-extrabold mb-4 font-poppins uppercase -tracking-tight">
					{
						id ? "Update Property" : "Create Property"
					}
				</h1>
				<form onSubmit={(e) => { e.preventDefault() }} className='flex-1'>

					<TextField
						label="Address"
						variant="outlined"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						fullWidth
						autoComplete="off"
						inputProps={{ style: { fontSize: 15 } }}
						InputLabelProps={{
							style: { fontSize: 15, color: "GrayText" },
						}}
					/>

					<div className="flex gap-2 my-3">
						<div className="flex-1">
							<TextField
								value={price}
								onChange={(e) => setPrice(e.target.value)}
								label="Price"
								type="number"
							/>
						</div>


						<div className=" mb-3 flex-1">
							<FormControl fullWidth>
								<InputLabel id="category-select-label">Property Type</InputLabel>
								<Select
									labelId="category-select-label"
									id="category-select"
									value={category}
									label="Property Type"
									onChange={(e) => setCategory(e.target.value)}
								>
									{
										['Single Family', 'Townhomes', 'Multifamily', 'Apartments'].map((e) => (
											<MenuItem value={e}>{e}</MenuItem>
										))
									}
								</Select>
							</FormControl>
						</div>

						<div className="flex-1">
							<TextField
								value={actualCAP}
								onChange={(e) => setActualCAP(e.target.value)}
								label="Actual CAP"
								type="number"
							/>
						</div>
					</div>


					<div className="flex gap-2 mb-3">

						<div className="flex-1">
							<TextField
								value={proFormaCAP}
								onChange={(e) => setProFormaCAP(e.target.value)}
								label="Pro Forma CAP"
								type="number"
							/>
						</div>
						<div className="flex-1">
							<TextField
								value={occupancy}
								onChange={(e) => setOccupancy(e.target.value)}
								label="Occupancy"
								type="number"
							/>
						</div>
						<div className="flex-1">
							<TextField
								value={units}
								onChange={(e) => setUnits(e.target.value)}
								label="Units"
								type="number"
							/>
						</div>
					</div>


					{
						// id ? (

						// 	(images.length > 0) && (
						// 		<ImageUploader
						// 			images={images}
						// 			setImages={setImages}
						// 		/>
						// 	)

						// ) : (
						<ImageUploader2
							images={images}
							setImages={setImages}
							setSelectedImages={setSelectedImages}
						/>
						// )
					}

					{
						selectedImages.length > 0 && (
							<DisplayImages
								selectedImages={selectedImages}
								setSelectedImages={setSelectedImages}
								setImages={setImages}
							/>
						)
					}

					<div>
						<div className='flex gap-2'>

							<TextField
								label="Feature"
								variant="outlined"
								value={feature}
								onChange={(e) => setFeature(e.target.value)}
								fullWidth
								autoComplete="off"
								inputProps={{ style: { fontSize: 15 } }}
								InputLabelProps={{
									style: { fontSize: 15, color: "GrayText" },
								}}
							/>
							<div className='flex justify-end'>
								<button
									class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
									onClick={() => { setFeatures((prev) => [...prev, feature]); setFeature('') }}
								>Add</button>
							</div>
						</div>

						<div>
							{
								features.map((feature, index) => (
									<li className='relative group'>
										<span>{feature}</span>
										<span onClick={() => removeFeature(index)} className='hidden cursor-pointer group-hover:inline text-2xl text-black font-bold absolute right-3'>x</span>
									</li>
								))
							}
						</div>
					</div>

					<div className='flex justify-end mt-5'>
						<button
							class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
							onClick={handleSubmit}
						>{id ? 'Update Property' : 'Create Property'}</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default PropertyForm;
