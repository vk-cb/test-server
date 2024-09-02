const Sequelize = require('sequelize')

const sequelize = new Sequelize('test-server', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '+05:30',  
   
   
  });

  module.exports = sequelize;