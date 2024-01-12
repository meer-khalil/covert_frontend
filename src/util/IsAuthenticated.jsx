import React, { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const IsAuthenticated = () => {

    const { pathname } = useLocation()
    const { isAuthenticated } = useContext(UserContext)

    useEffect(() => {
        isAuthenticated()
    }, [pathname])
    return null
}

export default IsAuthenticated