const router = require('express').Router();
const {verifyAdmin, checkAdmin} = require('../controllers/adminTasks.js')
const authenticateToken = require('../middleware/authenticateToken.js')

router.route('/admin-login').post(verifyAdmin);
router.route('/verify-image').post(checkAdmin);

module.exports = router;