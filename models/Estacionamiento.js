// models/Estacionamiento.js

const { DataTypes } = require('sequelize')
const sequelize = require('../sequelize')

const Estacionamiento = sequelize.define('Estacionamiento', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  spots: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  parkingType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

module.exports = Estacionamiento
