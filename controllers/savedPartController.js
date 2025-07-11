const { UserSavedPart, CarPart } = require('../models/associations');

exports.save = async (req, res, next) => {
  try {
    const { car_part_id } = req.body;
    const user_id = req.user.id;
    // Prevent duplicate
    const exists = await UserSavedPart.findOne({ where: { user_id, car_part_id } });
    if (exists) return res.status(400).json({ message: 'Already saved' });
    const saved = await UserSavedPart.create({ user_id, car_part_id });
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

exports.list = async (req, res, next) => {
  try {
    const saved = await UserSavedPart.findAll({
      where: { user_id: req.user.id },
      include: [CarPart],
    });
    res.json(saved);
  } catch (err) {
    next(err);
  }
};

exports.unsave = async (req, res, next) => {
  try {
    const saved = await UserSavedPart.findByPk(req.params.id);
    if (!saved || saved.user_id !== req.user.id) {
      return res.status(404).json({ message: 'Not found' });
    }
    await saved.destroy();
    res.json({ message: 'Un-saved' });
  } catch (err) {
    next(err);
  }
}; 