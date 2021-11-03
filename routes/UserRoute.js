const express = require('express');
const router = express.Router();

const Auth = require('../middlewares/AuthMiddleware');

const UserController = require('../controllers/UserController');
var multiparty = require('connect-multiparty');
const multipartyMiddleware = multiparty();
router.post('/send_otp', UserController.sendOTP);
router.post('/verify_otp', UserController.verification);
router.post('/basic_info', Auth, UserController.basicInfo);
router.post(
  '/upload_image',
  Auth,
  multipartyMiddleware,
  UserController.uploadImage,
);

module.exports = router;
