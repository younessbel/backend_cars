const User = require('./User');
const CarPart = require('./CarPart');
const Purchase = require('./Purchase');
const UserSavedPart = require('./UserSavedPart');

// Purchases
User.hasMany(Purchase, { foreignKey: 'user_id' });
Purchase.belongsTo(User, { foreignKey: 'user_id' });
CarPart.hasMany(Purchase, { foreignKey: 'car_part_id' });
Purchase.belongsTo(CarPart, { foreignKey: 'car_part_id' });

// Saved Parts
User.hasMany(UserSavedPart, { foreignKey: 'user_id' });
UserSavedPart.belongsTo(User, { foreignKey: 'user_id' });
CarPart.hasMany(UserSavedPart, { foreignKey: 'car_part_id' });
UserSavedPart.belongsTo(CarPart, { foreignKey: 'car_part_id' });

module.exports = {
  User,
  CarPart,
  Purchase,
  UserSavedPart,
}; 