import { Button } from '@mui/material'
import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'

const Popup = () => {

    const { setShowPopUp } = useContext(UserContext);

    return (
        <div className='flex justify-center z-50 items-center bg-transparent fixed left-0 top-0 right-0 bottom-0 '>
            <div className=' absolute left-0 top-0 right-0 bottom-0 opacity-50 bg-gray-800'></div>

            <div className=' w-[500px] h-[220px] flex flex-col justify-between bg-white z-10 py-5 px-10 rounded-md'>
                <div>
                    <h2 className='text-2xl font-bold'>
                        <span className=' text-5xl text-[#716EDC]'>Congrats!</span>
                    </h2>
                    <p className='mt-3 text-xl'>
                    Unbelievable investment deals will now be sent directly to your email!
                    </p>
                </div>
                <div className=' flex justify-end'>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{ bgcolor: "#716EDC", "&:hover": { bgcolor: "#716EDC" } }}
                        onClick={() => setShowPopUp(false)}
                    >
                        Ok
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Popup