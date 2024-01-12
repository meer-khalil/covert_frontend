import React, { createContext, useState } from "react";
import api from "../util/api";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const PropertyContext = createContext();


/*
  We assume only we have learned by living far from home.
  Everybody learns. Don't worry about your brathors.
  They will also learn. They just need time.
  Give them time. when the time will come, they will learn.
  Relax, and wait for the right moment to change their mind.
*/

export const PropertyProvider = ({ children }) => {
  const [propertyData, setPropertyData] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [files, setFiles] = useState([]);


  const [monthlyExpense, setMonthlyExpense] = useState(0)
  const [initialExpense, setInitialExpense] = useState(0);
  const [mortgage, setMortgage] = useState(0);
  const [cashFlow, setCashFlow] = useState(0);
  const [downPayment, setDownPayment] = useState(0);

  const handlePropertyData = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setPropertyData(prev => ({ ...prev, [name]: checked }))
    } else {
      setPropertyData(prev => ({ ...prev, [name]: value }))
    }

  }


  useEffect(() => {

    console.log('PropertyData: ', propertyData);

  }, [propertyData])

  const handleProperty = async () => {
    const formData = new FormData();
    formData.append('property', JSON.stringify(propertyData))
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      const { data } = await api.post('/seller/properties/new', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log('Data: ', data);
      toast("Property Successfully Created!")
    } catch (error) {
      console.log('Error: ', error);
      alert('Error While creating Property!')
    }
  }


  return (
    <PropertyContext.Provider
      value={{
        propertyData, handlePropertyData,
        images, setImages,
        files, setFiles,
        selectedImages, setSelectedImages,
        handleProperty,
        monthlyExpense, setMonthlyExpense,
        initialExpense, setInitialExpense,
        mortgage, setMortgage,
        downPayment, setDownPayment
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};
