const router = require('express').Router();

const {authenticateOTP} = require('../controllers/verification.js')
router.route('/verifyotp').post(authenticateOTP);

module.exports = router;