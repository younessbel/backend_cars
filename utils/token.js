const jwt = require('jsonwebtoken');
const config = require('../config/config');

function generateToken(payload) {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
}

module.exports = {
  generateToken,
}; 