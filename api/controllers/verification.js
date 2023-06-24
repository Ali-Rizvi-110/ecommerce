const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const User = require('../models/userSchema.js')
require('dotenv').config({path: '../.env'});
// Create an OAuth2 client
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
// console.log(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN);

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

const sendMail = async (sendTo, otp) => {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'alirizvi783@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        const mailOptions = {
            from: 'ALI_RIZVI ✉️ <alirizvi783@gmail.com>',
            to: sendTo,
            subject: 'mail from nodemailer with gmail api',
            text: 'hello from gmail using nodemailer and google api',
            html: `<h1>your otp is ${otp}</h1>`
        }

        const result = transport.sendMail(mailOptions)
        return result;

    } catch (error) {
        console.log(error)
        return error;
    }
}
let generateOTP = () => {
  let num = 0;
  for(let i=0; i<6; ++i){
    let x = 1+Math.floor(Math.random()*8);
    num = num*10+x;
  }return num;
};
// const sendTo = 'abhishekvishwakarma3244@gmail.com';
// verify otp to get into the database (register)
const authenticateOTP = async (req, res) => {
  try {
    const otp = generateOTP();
    const sendTo = req.body.email;
    const result = await sendMail(sendTo, otp);
    // console.log('Email Sent...', result);
    return res.status(200).json({result, otp: otp})
  } catch (error) {
    console.log(error.message);
    return res.status(500).json('internal server error');
  }
}

// forgot password

const forgotPassword = async (req, res) => {
  try {
    const otp = generateOTP();
    const sendTo = req.body.email;
    console.log("Req body ", req.body);
    console.log("Req body ", req.body);
    console.log("Req body ", req.body);
    const result = await sendMail(sendTo, otp);
    return res.status(200).json({result, otp: otp});
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error in forgot Password');
  }
}

const bcrypt = require('bcrypt');

const changePassword = async (req, res) => {
  try {
    const newPassword = req.body.newPassword;
    const email = req.body.email;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();
    console.log(user.password);

    return res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  authenticateOTP,
  forgotPassword,
  changePassword
}

// sendMail(sendTo, otp).then(result=> console.log('Email Sent...', result)).catch(error=> console.log(error.message));