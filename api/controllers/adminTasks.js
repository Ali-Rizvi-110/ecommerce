const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyAdmin = async (req, res) => {
  const { username, password } = req.body;

  if (username === "abcd@1234" && password === "abcd@1234") {
    return res.status(200).json('success');
  }

  const payload = { username: username }; // Create the payload object

  try {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET); // Sign the JWT with the payload and secret key
    return res.status(200).json({ accessToken: accessToken }); // Return the access token in the response
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' }); // Handle any errors that occur during signing
  }
};

const checkAdmin = (req, res, next) => {
  const { accessToken } = req.body;
  // Verify the access token
  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    // Access token is valid
    // Handle the image upload here
    // Access the uploaded file using req.file
    // Process the file, save it, and perform any required operations

    // Return a response indicating the success of the upload
    res.status(200).json({ message: 'Image uploaded successfully' });
  } catch (error) {
    // Access token is invalid or expired
    res.status(401).json({ error: 'Invalid access token' });
  }
};

module.exports = {
  verifyAdmin,
  checkAdmin,
};
