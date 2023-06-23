import React, { useState } from 'react';
import "../css-files/register.css"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
const RegisterUser = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [contact, setContact] = useState('')
    const navigate = useNavigate('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform registration logic here
        try {
            const response = await axios.post('http://localhost:4500/api/v1/userinfo/users', {
                firstName,
                lastName,
                email,
                password,
                contact
            });
            console.log(`user ${firstName} Added to the Database`)
        } catch (error) {
            console.log({err: "error in submitting form", error})
        }
        navigate("/login");
    };

    return (
        <div className="register-page">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
            <label htmlFor="first-name">First Name:</label>
            <input
                type="text"
                id="first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                autoComplete="off"
            />
            </div>
            <div className="form-group">
            <label htmlFor="last-name">Last Name:</label>
            <input
                type="text"
                id="last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                autoComplete="off"
            />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="off"
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
                    autoComplete="off"
                />
            </div>
            <div className="form-group">
                <label htmlFor="contact">Contact No:</label>
                <input
                    type="tel"
                    id="contact"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                    autoComplete="off"
                />
            </div>
            <button type="submit">Register</button>
        </form>
        <h4>If Already Register <Link to="/login" >Login</Link> </h4>
        </div>
)};

export default RegisterUser;
