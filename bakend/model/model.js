const Sequelize = require('sequelize');

const sequelize = require('../utils/DataBase');

const Candy = sequelize.define('candyShop', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  candyName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  candyDescription: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  candyPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  candyQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Candy;