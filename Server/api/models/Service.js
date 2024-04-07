const { DataTypes } = require("sequelize");
const sequelize = require("../database/db.js");

const Service = sequelize.define(
    "Services",
    {
        idService: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        nomService: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { freezeTableName: true }
);

module.exports = Service;