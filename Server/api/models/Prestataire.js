const { DataTypes } = require("sequelize");
const sequelize = require("../database/db.js");
const User = require("./User.js"); // Importer le modèle User correctement

const Prestataire = sequelize.define(
  "Prestataires",
  {
    idPrestataire: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    telephone: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    ville: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    idService: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "idUser",
        onDelete: "CASCADE",
      },
    },
  },
  { freezeTableName: true }
);

module.exports = Prestataire; // Exporter le modèle Prestataire
