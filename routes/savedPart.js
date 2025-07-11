const express = require('express');
const { body } = require('express-validator');
const authenticateToken = require('../middleware/auth');
const savedPartController = require('../controllers/savedPartController');

const router = express.Router();

router.post(
  '/',
  authenticateToken,
  [body('car_part_id').isInt()],
  savedPartController.save
);

router.get('/', authenticateToken, savedPartController.list);
router.delete('/:id', authenticateToken, savedPartController.unsave);

module.exports = router; 