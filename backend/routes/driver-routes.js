const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const {
  signup,
  login,
  getDriverPhones
} = require('../controllers/driver-controllers');

router.post('/signup',
  [
    body('code')
      .notEmpty(),
    body('email')
      .normalizeEmail()
      .isEmail(),
    body('password')
      .isLength({ min: 6 }),
    body('phones')
      .notEmpty()
  ],
  signup
);

router.post('/login', login);

router.post('/contacts', getDriverPhones);

module.exports = router;
