const express = require('express');
const { body } = require('express-validator');
const authenticateToken = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const carPartController = require('../controllers/carPartController');

const router = express.Router();

router.get('/', carPartController.getAll);
router.get('/:id', carPartController.getById);

router.post(
  '/',
  authenticateToken,
  isAdmin,
  [
    body('brand_name').notEmpty(),
    body('price').isDecimal(),
    body('short_description').notEmpty(),
  ],
  carPartController.create
);

router.put(
  '/:id',
  authenticateToken,
  isAdmin,
  carPartController.update
);

router.delete(
  '/:id',
  authenticateToken,
  isAdmin,
  carPartController.delete
);

module.exports = router; 