import React, { useEffect, useState } from 'react';
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
    const [myOtp, setMyotp] = useState(0);
    const [generatedOtp, setGeneratedOtp] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Enter in handleSubmit');
        // Perform registration logic here
        try {
            const response = await axios.post('http://localhost:4500/api/v1/userinfo/users', {
                firstName,
                lastName,
                email,
                password,
                contact
            });
            // const otp = response.data.otp;
            // setGeneratedOtp(otp);
            console.log(response.user);
            const name = response.data.user.firstName;
            console.log(`user ${name} created into the database`);
            navigate("/login");
        } catch (error) {
            console.log({err: "error in submitting form", error})
            return;
        }
    };
    useEffect(()=>{
        console.log('changed', myOtp);
        // console.log(typeof(generatedOtp), typeof(myOtp))
        // if(generatedOtp==myOtp){
        //     console.log("done");
        // }
    }, [myOtp])
    useEffect(()=>{
        // console.log('changed generated otp', generatedOtp);
    }, [generatedOtp]);
    const generateOtp = async (e)=> {
        e.preventDefault();
        console.log('Enter generateOtp');
        try {
            console.log("Enter try of generateOtp");
            const response = await axios.post('http://localhost:4500/api/v1/verifyotp', {email});
            setGeneratedOtp(response.data.otp)
            // console.log(typeof(response.data.otp));
            // console.log("response ", response.data.otp);
            // console.log(generatedOtp, "my generated otp");
        } catch (error) {
            console.log({err: 'Error in generateOtp Function', error});
        }
    }

    return (
        <div className="register-page">
        <h2>Register</h2>
        <form className="register-form">
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
                    type="number"
                    id="contact"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                    autoComplete="off"
                />
            </div>
            { generatedOtp===1 && <button onClick={generateOtp}>Generate OTP</button> }
            {generatedOtp !== 1 && (
                <div className="form-group">
                    <label htmlFor="otp">Enter otp form mail:</label>
                    <input
                    type="number"
                    id="otp"
                    onChange={(e) => setMyotp(parseInt(e.target.value, 10))}
                    required
                    autoComplete="off"
                    />
                </div>
            )}
            {generatedOtp !== 1 && generatedOtp === myOtp && <button onClick = {handleSubmit} type="submit">Register</button>}
        </form>
        <h4>If Already Register <Link to="/login" >Login</Link></h4>
        </div>
)};

export default RegisterUser;
