// Home.jsx

import React, { useEffect, useState } from 'react';
import '../css-files/home.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ShowProducts from './ShowProducts';
import Navbar from '../components/common/Navbar';

const Home = () => {
    const location = useLocation();
    // console.log(location);
    const path = location.pathname.split('/')[1];
    const [name, setName] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        const checkAccessToken = () => {
          const accessToken = sessionStorage.getItem('accessToken');
          if (accessToken) {
            // console.log('Access Token:', accessToken);
            setName(path);
            // Perform any actions with the access token if needed
          } else {
            console.log('Access Token not found in sessionStorage');
          }
        };
    
        checkAccessToken();
      }, []);

    const logout = () => {
        sessionStorage.removeItem('accessToken');
        navigate('/login');
    }

    return (
        <div>
            <Navbar name = {name}/>
            <div>
                <ShowProducts/>
            </div>
        
        {/* Rest of the home content */}
        {/* ... */}
        </div>
    );
}

export default Home;
