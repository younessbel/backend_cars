const { Purchase, User, CarPart } = require('../models/associations');

exports.buy = async (req, res, next) => {
  try {
    const { car_part_id } = req.body;
    const userId = req.user.id;
    const carPart = await CarPart.findByPk(car_part_id);
    if (!carPart) return res.status(404).json({ message: 'Car part not found' });
    const purchase = await Purchase.create({
      user_id: userId,
      car_part_id,
      status: 'completed',
    });
    // Optionally update purchased_parts JSON
    const user = await User.findByPk(userId);
    let purchased = Array.isArray(user.purchased_parts) ? user.purchased_parts : [];
    if (!purchased.includes(car_part_id)) {
      purchased.push(car_part_id);
      user.purchased_parts = purchased;
      await user.save();
    }
    res.status(201).json(purchase);
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const purchases = await Purchase.findAll({
      where: { user_id: req.user.id },
      include: [CarPart],
    });
    res.json(purchases);
  } catch (err) {
    next(err);
  }
};

exports.getAllAdmin = async (req, res, next) => {
  try {
    const purchases = await Purchase.findAll({
      include: [CarPart, User],
      order: [['purchase_date', 'DESC']]
    });
    res.json(purchases);
  } catch (err) {
    next(err);
  }
}; 