import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const ProtectedRoute = ({ children, isAdmin }) => {

    const { user } = useContext(UserContext)

    return (
        <>
            {
                !user ?
                    <Navigate to="/login" />
                    :
                    children
            }

        </>
    );
};

export default ProtectedRoute;