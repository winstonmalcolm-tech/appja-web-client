import React, { useState, useEffect } from 'react';
import TokenContext from './tokenContext';
import { useNavigate } from 'react-router-dom';

const TokenContextProvider = ({ children }) => {

    const [token, setToken] = useState(null);
    //const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (accessToken != null) {
            setToken({accessToken, refreshToken});
        } 
        

    }, []);

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setToken(null);
    }

    return (
        <TokenContext.Provider value={{token, setToken, logout}}>
            { children }
        </TokenContext.Provider>
    )
}

export default TokenContextProvider