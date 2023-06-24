import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState(1);
    const [myOtp, setMyOtp] = useState(0);
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        console.log(generatedOtp);
    }, [generatedOtp]);
    useEffect(()=>{
        console.log(typeof(generatedOtp), typeof(myOtp));
        console.log(myOtp);
    }, [myOtp]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
        // Send a request to the server to generate and send OTP
        const user = await axios.get(`http://localhost:4500/api/v1/userinfo/user/${email}`);
        // console.log(user.data);
        const response = await axios.post('http://localhost:4500/api/v1/forgot-password', {email});
        setMessage(response.data.message);
        setGeneratedOtp(response.data.otp);

        } catch (error) {
        console.error('Error sending OTP:', error);
        setMessage('An error occurred while sending OTP. Please try again.');
        }
    };


    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const changePassword = async () => {
        try {
            const response = await axios.post('http://localhost:4500/api/v1/change-password', {newPassword, email});
            if(!response){
                console.log('Response not found in change password function');
                return;
            }
            navigate('/login');
        } catch (error) {
            console.log({err: "Error in change Password function", error});
        }
    }

    return (
        <div>
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
            <label>
            Email:
            <input type="email" value={email} onChange={handleChange} required />
            </label>
            <button type="submit">Send OTP</button>
        </form>
        {generatedOtp!==1 && <label htmlFor="otp">
           Enter Otp from Email:- <input type='Number' id="otp" onChange={(e)=>setMyOtp(parseInt(e.target.value, 10))} />
        </label> 
        }
        { generatedOtp===myOtp && <label htmlFor="newPassword">
            Enter New Password:- <input type="text" id = "newPassword" required onChange={(e)=>setNewPassword(e.target.value)} placeholder='write your new password' /> 
        </label> 
        }
        { generatedOtp===myOtp && newPassword &&
             <button onClick={changePassword} >Change Your Password</button>
        }

        {message && <p>{message}</p>}
        </div>
    );
};

export default ForgotPassword;
