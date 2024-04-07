const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const User = sequelize.define(
    "Users",
    {
        idUser: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        password: {
            type: DataTypes.TIME,
            allowNull: false,
        },

        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        activated: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },
    { freezeTableName: true }
);

module.exports = User;