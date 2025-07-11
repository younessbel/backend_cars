const { User } = require('../models/associations');

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password_hash'] },
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.updateMe = async (req, res, next) => {
  try {
    const { full_name, workshop_name, phone, city } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.full_name = full_name || user.full_name;
    user.workshop_name = workshop_name || user.workshop_name;
    user.phone = phone || user.phone;
    user.city = city || user.city;
    await user.save();
    res.json({
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      workshop_name: user.workshop_name,
      phone: user.phone,
      city: user.city,
      isAdmin: user.isAdmin,
      created_at: user.created_at,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password_hash'] },
      order: [['created_at', 'DESC']]
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
}; 