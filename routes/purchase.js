const express = require('express');
const { body } = require('express-validator');
const authenticateToken = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const purchaseController = require('../controllers/purchaseController');

const router = express.Router();

router.post(
  '/',
  authenticateToken,
  [body('car_part_id').isInt()],
  purchaseController.buy
);

router.get('/', authenticateToken, purchaseController.getAll);
router.get('/admin/all', authenticateToken, isAdmin, purchaseController.getAllAdmin);

module.exports = router; 