const express = require('express');
const router = express.Router();

const {createProduct, showAllProducts} = require('../controllers/productTasks.js')
const authenticateToken = require('../middleware/authenticateToken.js')
router.route('/products').post(authenticateToken, createProduct).get(showAllProducts);

module.exports = router;