const router = require('express').Router();

const {authenticateOTP, forgotPassword, changePassword} = require('../controllers/verification.js')
router.route('/verifyotp').post(authenticateOTP);
router.route('/forgot-password').post(forgotPassword);
router.route('/change-password').post(changePassword);

module.exports = router;