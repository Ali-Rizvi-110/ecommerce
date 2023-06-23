import React, { useState } from 'react';
import "../css-files/register.css"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:4500/api/v1/admin/admin-login', {
        email,
        password
      });
  
      const { data } = response;
      console.log(data);
      if (data.accessToken) {
        // Store the access token in local storage
        sessionStorage.setItem('accessToken', data.accessToken);
        console.log(`User with email ${email} logged in`);
        console.log("session ", JSON.stringify(sessionStorage))
  
        // Fetch the user details using the access token
        // const userResponse = await axios.get('http://localhost:4500/api/v1/userinfo/details', {
        //   headers: {
        //     Authorization: `Bearer ${data.accessToken}`
        //   }
        // });
        // console.log(userResponse);
        // const { firstName } = userResponse.data;
  
        // Navigate to the home page with the user ID
        navigate(`/admin-dashboard`);
      } else {
        console.log('Invalid email or password');
      }
    } catch (error) {
      console.log({ err: 'Error in login submit', error });
    }
  };
  
  
  return (
    <div className="register-page">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete='off'
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete='off'
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <h4>If Not Registered <Link to="/register">Register</Link></h4>
    </div>
  );
}

export default AdminLogin