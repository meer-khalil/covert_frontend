import React, { useState, useEffect } from 'react';
import api from '../../../util/api';

import login from "../../../images/check2.webp";

// import './PropertyForm.css'
import ImageUploader from './ImageUploader';
import { useNavigate, useParams } from 'react-router-dom';
import { Autocomplete, Checkbox, FormControl, FormControlLabel, FormGroup, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { toast } from 'react-toastify';
import DisplayImages from './DisplayImages';
import ImageUploader2 from './ImageUploader2';
import ShowDatePicker from '../../SellProperty/components/ShowDatePicker';
import BasicDatePicker from '../../SellProperty/components/BasicDatePicker';


// icons
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PercentIcon from '@mui/icons-material/Percent';
import SendIcon from '@mui/icons-material/Send';

const PropertyForm = () => {

	const { slug } = useParams();

	const [propertyData, setPropertyData] = useState({});
	const [editDate, setEditDate] = useState(false)
	const [btnLoading, setBtnLoading] = useState(false);
	const [defaultImage, setDefaultImage] = useState(0);

	const [selectedImages, setSelectedImages] = useState([])

	const [images, setImages] = useState([]);
	const [feature, setFeature] = useState('');
	const [features, setFeatures] = useState([]);
	const [oldImages, setOldImages] = useState([]);

	const handlePropertyTypeChange = (event, newValue) => {
		handlePropertyData({ target: { name: 'propertyType', value: newValue } });
	};

	const handlePropertyConditionChange = (event, newValue) => {
		handlePropertyData({ target: { name: 'propertyCondition', value: newValue } });
	};

	const handleHOAChange = (event, newValue) => {
		handlePropertyData({ target: { name: 'hasHoa', value: newValue } });
	};

	const handleChange = (idx) => {
		setDefaultImage(idx)
	}

	async function getPropertyData(slug) {
		let url = `/properties/${slug}`;
		const { data } = await api.get(url);

		let property = data
		console.log('property: ', property);
		console.log('Property Updating: ', property);
		const {
			description,
			address,
			numberOfBeds,
			numberOfBaths,
			builtYear,
			sqFt,
			lotSqft,
			price,
			actualCAP,
			proFormaCAP,
			units,
			propertyType,
			zipcode,
			propertyCondition,
			occupancy,
			rentalIncome,
			hasHoa,

			finance_cash,
			finance_sellerFinance,
			finance_mortgage,
			defaultImage,
			images,
			category,
			features
		} = property;

		setPropertyData({
			description,
			address,
			numberOfBeds,
			numberOfBaths,
			builtYear,
			sqFt,
			lotSqft,
			price,
			actualCAP,
			proFormaCAP,
			units,
			propertyType,
			zipcode,
			propertyCondition,
			occupancy,
			rentalIncome,
			hasHoa,

			finance_cash,
			finance_sellerFinance,
			finance_mortgage,
		})

		setDefaultImage(defaultImage)
		setImages(images);
		setSelectedImages(images);
		setOldImages(images);
		setFeatures(features);
	}
	useEffect(() => {
		if (slug) {
			console.log('Here is Slug: ', slug);
			getPropertyData(slug);
		} else {
			console.log('There is no id', slug);
		}
	}, [slug]);

	useEffect(() => {
		console.log('current: ', propertyData);
	}, [propertyData])

	const handlePropertyData = (e) => {
		console.log('event: ', e);
		const { name, value, type, checked } = e.target;

		if (type === 'checkbox') {
			setPropertyData(prev => ({ ...prev, [name]: checked }))
		} else {
			setPropertyData(prev => ({ ...prev, [name]: value }))
		}

	}
	const handleSubmit = async (event) => {
		// event.preventDefault();
		setBtnLoading(true);
		const formData = new FormData();
		propertyData.defaultImage = defaultImage;
		formData.append('property', JSON.stringify(propertyData))

		for (let i = 0; i < features.length; i++) {
			formData.append('features', features[i])
		}

		try {
			if (slug) {

				let newImages = images.filter((obj) => !obj.hasOwnProperty('_id'));
				let oldImages = images.filter((obj) => obj.hasOwnProperty('_id'));

				for (let i = 0; i < newImages.length; i++) {
					formData.append('images', newImages[i]);
				}
				for (let i = 0; i < oldImages.length; i++) {
					formData.append('oldImages', JSON.stringify(oldImages[i]))
				}

				const { data } = await api.put(`/admin/properties/${slug}`, formData, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				});
				console.log('Updated Property: ', data);
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
		setBtnLoading(false);
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
			<div className=' max-w-4xl'>
				<h1 className="text-2xl md:text-4xl font-extrabold mb-4 font-poppins uppercase -tracking-tight">
					{
						slug ? "Update Property" : "Create Property"
					}
				</h1>
				<form onSubmit={(e) => { e.preventDefault() }} className='flex-1'>

					<div className=' mb-5'>
						<TextField
							label="Description"
							variant="outlined"
							name="description"
							value={propertyData?.description}
							onChange={handlePropertyData}
							fullWidth
							autoComplete="off"
							inputProps={{ style: { fontSize: 15 } }}
							InputLabelProps={{
								style: { fontSize: 15, color: "GrayText" },
							}}
							multiline
							rows={6}
						/>
					</div>

					<TextField
						label="Address"
						variant="outlined"
						name='address'
						value={propertyData?.address}
						onChange={handlePropertyData}
						fullWidth
						autoComplete="off"
						inputProps={{ style: { fontSize: 15 } }}
						InputLabelProps={{
							style: { fontSize: 15, color: "GrayText" },
						}}
					/>

					<div className="flex items-center gap-5 mt-3">

						<div className="flex-1">
							<TextField
								fullWidth
								name='numberOfBeds'
								onChange={handlePropertyData}
								label="Number of Beds"
								type="number"
								value={propertyData?.numberOfBeds}
							/>
						</div>

						<div className="flex-1">
							<TextField
								fullWidth
								name='numberOfBaths'
								onChange={handlePropertyData}
								label="Number of Baths"
								type="number"
								value={propertyData?.numberOfBaths}
							/>
						</div>

						<div className='flex-1'>
							{
								!editDate ? (
									<ShowDatePicker
										propertyData={propertyData}
									/>
								) : (
									<BasicDatePicker
										handlePropertyData={handlePropertyData}
										propertyData={propertyData}
									/>
								)
							}

						</div>

						<div className="flex-1">
							<TextField
								fullWidth
								name='sqFt'
								onChange={handlePropertyData}
								label="SqFt"
								type="number"
								value={propertyData?.sqFt}
							/>
						</div>

						<div className="flex-1">
							<TextField
								fullWidth
								name='lotSqft'
								onChange={handlePropertyData}
								label="Lot SqFt"
								type="number"
								value={propertyData?.lotSqft}
							/>
						</div>

					</div>

					{/* <div className="flex gap-2 my-3">
						<div className="flex-1">
							<TextField
								value={propertyData?.price}
								name='price'
								onChange={handlePropertyData}
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
					</div> */}


					<div className="flex gap-5 my-10">
						<div className="flex-1">
							<TextField
								fullWidth
								name='price'
								onChange={handlePropertyData}
								label="Price"
								type="number"
								value={propertyData?.price}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											{/* <IconButton> */}
											<AttachMoneyIcon fontSize='small' />
											{/* </IconButton> */}
										</InputAdornment>
									)
								}}
							/>
						</div>

						<div className="flex-1">
							<TextField
								fullWidth
								name='actualCAP'
								onChange={handlePropertyData}
								label="Actual CAP"
								type="number"
								value={propertyData?.actualCAP}
								InputProps={{
									endAdornment: (
										<InputAdornment>
											<IconButton>
												<PercentIcon fontSize='small' />
											</IconButton>
										</InputAdornment>
									)
								}}
							/>
						</div>

						<div className="flex-1">
							<TextField
								fullWidth
								name='proFormaCAP'
								onChange={handlePropertyData}
								label="Pro Forma CAP"
								type="number"
								value={propertyData?.proFormaCAP}
								InputProps={{
									endAdornment: (
										<InputAdornment>
											<IconButton>
												<PercentIcon fontSize='small' />
											</IconButton>
										</InputAdornment>
									)
								}}
							/>
						</div>

						<div className="flex-1">
							<TextField
								fullWidth
								name='units'
								onChange={handlePropertyData}
								label="Units"
								type="number"
								value={propertyData?.units}
							/>
						</div>
						<div className='flex-1'>
							<Autocomplete
								disablePortal
								fullWidth
								id="combo-box-for-property-type"
								options={['Single Family', 'Townhomes', 'Multifamily', 'Apartments']}
								// defaultValue='Single Family'
								onChange={handlePropertyTypeChange}
								value={propertyData?.propertyType}
								renderInput={(params) => <TextField {...params} label="Property Type" />}
							/>
						</div>
					</div>

					<div className="flex items-center gap-5 mb-10">

						<div className="flex-1">
							<TextField
								name='zipcode'
								fullWidth
								value={propertyData?.zipcode}
								onChange={(e) => {
									if (e.target.value.length <= 5) {
										handlePropertyData(e)
									}
								}}
								label="Zipcode"
								type="text"
							/>
						</div>

						<div className='flex-1'>
							<Autocomplete
								disablePortal
								fullWidth
								id="combo-box-for-property-condition"
								options={[
									'Move-In Ready',
									'Good Condition',
									'Fair Condition',
									'Fixer-Upper',
									'Distressed Property',
									'As-Is',
									'Needs TLC (Tender Loving Care)',
									'New Construction',
									'Renovated/Updated'
								]}
								onChange={handlePropertyConditionChange}
								value={propertyData?.propertyCondition}
								renderInput={(params) => <TextField {...params} label="Property Condition" />}
							/>
						</div>

						<div className="flex-1">
							<TextField
								name='occupancy'
								fullWidth
								value={propertyData?.occupancy}
								onChange={handlePropertyData}
								label="Occupancy"
								type="number"
							/>
						</div>

						<div className="flex-1">
							<TextField
								fullWidth
								name='rentalIncome'
								value={propertyData?.rentalIncome}
								onChange={handlePropertyData}
								label="Rental Income"
								type="number"
							/>
						</div>

						<div className='flex-1'>
							<Autocomplete
								disablePortal
								fullWidth
								id="combo-box-for-hoa"
								options={['Yes', 'No', 'Maybe']}
								onChange={handleHOAChange}
								value={propertyData?.hasHoa}
								renderInput={(params) => <TextField {...params} label="Has HOA" />}
							/>
						</div>
					</div>


					<div className="flex gap-4">

						<div>
							<FormGroup>
								<FormControlLabel
									control={
										<Checkbox
											name='finance_cash'
											onChange={handlePropertyData}
											checked={propertyData.finance_cash === true}
										/>
									}
									label={'Cash'}
								/>
							</FormGroup>
						</div>

						<div>
							<FormGroup>
								<FormControlLabel
									control={
										<Checkbox
											name='finance_sellerFinance'
											onChange={handlePropertyData}
											checked={propertyData.finance_sellerFinance === true}
										/>
									}
									label={'Seller Finance'}
								/>
							</FormGroup>
						</div>

						<div>
							<FormGroup>
								<FormControlLabel
									control={
										<Checkbox
											name='finance_mortgage'
											onChange={handlePropertyData}
											checked={propertyData.finance_mortgage === true}
										/>
									}
									label={'Mortgage'}
								/>
							</FormGroup>
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
								defaultImage={defaultImage}
								setDefaultImage={setDefaultImage}
							/>
						)
					}

					{/* <div>
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
					</div> */}

					<div className='flex justify-end mt-5'>
						{/* <button
							class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
							onClick={handleSubmit}
						>{id ? 'Update Property' : 'Create Property'}</button> */}
						<LoadingButton
							size="large"
							color="success"
							onClick={handleSubmit}
							loading={btnLoading}
							loadingPosition="start"
							startIcon={<SendIcon />}
							variant="outlined">
							Send
						</LoadingButton>
					</div>
				</form>
			</div>
		</div>
	);
};

export default PropertyForm;
