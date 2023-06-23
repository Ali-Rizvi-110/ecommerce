import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const addProductHandler = () => {
        const accessToken = sessionStorage.getItem('accessToken');
        if(accessToken){
            navigate('/register-product');
            return;
        }
        navigate('/admin');
    }
    return (
        <div>
        <h2>Welcome to the Dashboard</h2>
        <p>This is your personalized dashboard.</p>
        <button onClick={()=> { 
                // console.log(sessionStorage);
                sessionStorage.removeItem('accessToken');
                // console.log(sessionStorage)
                navigate('/admin');
        }}>Logout</button>
        {/* Add your dashboard content here */}

        <button onClick={addProductHandler} >Add Products</button>

        </div>
    );
};

export default Dashboard;
