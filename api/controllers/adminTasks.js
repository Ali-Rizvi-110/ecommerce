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

module.exports = {
  verifyAdmin,
};
