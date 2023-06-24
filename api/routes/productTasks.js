const express = require('express');
const router = express.Router();

const {createProduct, showAllProducts, deleteProduct} = require('../controllers/productTasks.js')
const authenticateToken = require('../middleware/authenticateToken.js')
router.route('/products').post(authenticateToken, createProduct).get(showAllProducts);
router.route('/delete').post(authenticateToken, deleteProduct);

module.exports = router;