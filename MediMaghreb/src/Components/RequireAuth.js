import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 

const RequireAuth = ({ children }) => {
    const checkToken = () => {
        const token = localStorage.getItem('token');
        if (!token) return false;
    
        try {
            const { exp } = jwtDecode(token);
            if (Date.now() >= exp * 1000) {
                localStorage.clear();
                return false;
            }
            return true;
        } catch (error) {
            return false;
        }
    };
    if (!checkToken()) {
        return <Navigate to="/authentication" replace />;
    }

    return children;
};

export default RequireAuth;
