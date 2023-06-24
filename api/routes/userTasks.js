const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema.js")

// const {getAllTasks, getTask} = require('..')

const {getAllUsers, createUser, deleteUser, getUser, loginUser, addToWishlist, addToCart, getWishlist, 
 getUserWithEmail, removeFromWishlist, getCart, increaseCartItem, decreaseCartItem} = require('../controllers/userTasks');

router.route('/users').get(getAllUsers).post(createUser);
router.route('/users/:id').delete(deleteUser).get(getUser);
router.route('/user/:email').get(getUserWithEmail)
router.route('/login').post(loginUser)

const authenticateToken = require('../middleware/authenticateToken.js')

router.route('/wishlist').post(authenticateToken, addToWishlist).get(authenticateToken, getWishlist);
router.route('/wishlist/:id').delete(authenticateToken, removeFromWishlist);
// router.post('/cart', authenticateToken, addToCart);
router.route('/cart').get(authenticateToken, getCart).post(authenticateToken, addToCart);
router.route('/cart/increase/:id').put(authenticateToken, increaseCartItem);
router.route('/cart/decrease/:id').put(authenticateToken, decreaseCartItem);

router.get('/details', authenticateToken, async (req, res) => {
    try {
      const userId = req.user.userId;
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error in retrieving user details' });
    }
});
// Middleware to authenticate the access token


module.exports = router;