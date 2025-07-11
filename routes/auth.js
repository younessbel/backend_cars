const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();


router.post(
  '/signup',
  [
    body('full_name').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('workshop_name').optional(),
    body('phone').optional(),
    body('city').optional(),
  ],
  authController.signup
);

router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').notEmpty(),
  ],
  authController.login
);

module.exports = router; 