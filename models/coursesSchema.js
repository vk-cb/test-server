const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./authSchema'); // Ensure this imports the correct User model

const Course = sequelize.define('Course', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    instructorId: {
        type: DataTypes.INTEGER,
        references: {
            model: User, // This references the `User` model
            key: 'id',
        },
        allowNull: false
    }
});

// Define associations if they aren't already defined in the models
User.hasMany(Course, { foreignKey: 'instructorId' });
Course.belongsTo(User, { foreignKey: 'instructorId' });

module.exports = Course;
