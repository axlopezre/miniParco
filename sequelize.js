const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: '172.17.0.2',
  port: 5432,
  username: 'postgres',
  password: '12345',
  database: 'postgres'
});

module.exports = sequelize;
