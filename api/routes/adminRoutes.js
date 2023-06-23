const router = require('express').Router();
const {verifyAdmin} = require('../controllers/adminTasks.js')
const authenticateToken = require('../middleware/authenticateToken.js')

router.route('/admin-login').post(verifyAdmin);

module.exports = router;