const express = require('express');
const { body } = require('express-validator');
const authenticateToken = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/me', authenticateToken, userController.getMe);

router.put(
  '/me',
  authenticateToken,
  [
    body('full_name').optional().notEmpty(),
    body('workshop_name').optional(),
    body('phone').optional(),
    body('city').optional(),
  ],
  userController.updateMe
);

router.get('/', authenticateToken, isAdmin, userController.getAllUsers);

module.exports = router; 