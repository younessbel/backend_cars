const { User } = require('../models/associations');
const { hashPassword, comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/token');

exports.signup = async (req, res, next) => {
  try {
    const { full_name, email, password, workshop_name, phone, city } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    const password_hash = await hashPassword(password);
    const user = await User.create({
      full_name,
      email,
      password_hash,
      workshop_name,
      phone,
      city,
    });
    const token = generateToken({ id: user.id, email: user.email, isAdmin: user.isAdmin });
    res.status(201).json({
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        workshop_name: user.workshop_name,
        phone: user.phone,
        city: user.city,
        isAdmin: user.isAdmin,
        created_at: user.created_at,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const valid = await comparePassword(password, user.password_hash);
    if (!valid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = generateToken({ id: user.id, email: user.email, isAdmin: user.isAdmin });
    res.json({
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        workshop_name: user.workshop_name,
        phone: user.phone,
        city: user.city,
        isAdmin: user.isAdmin,
        created_at: user.created_at,
      },
    });
  } catch (err) {
    next(err);
  }
}; 