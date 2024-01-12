import React, { useEffect, useState } from 'react'
import api from '../../util/api';

const Emails = () => {
    const [emails, setEmails] = useState([]);

    const fetchEmails = async () => {
        try {
            const { data } = await api.get('/admin/email')
            const { emails } = data
            console.log('Emails: ', emails);
            setEmails(emails)
        } catch (error) {
            console.log('Error: ', error.message);
            alert('Error while fetching Emails')
        }
    }

    useEffect(() => {

        fetchEmails();

    }, [])

    return (
        <div>
            <h3 className=' text-3xl font-bold mb-4'>Emails</h3>
            <ul className=' pl-12'>
                {
                    emails?.map((el) => (
                        <li className=' list-decimal text-xl'>{el.email}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Emails