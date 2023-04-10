import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const GalleryContext = createContext();

const ContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState();


    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
        if (!userInfo) navigate("/");
    }, [navigate]);

    return (
        <GalleryContext.Provider value={{ user, setUser }}>{children}</GalleryContext.Provider>
    )
}

export const GalleryState = () => {
    return useContext(GalleryContext);
}

export default ContextProvider;