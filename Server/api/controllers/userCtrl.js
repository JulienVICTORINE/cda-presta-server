// Import des modèles définis avec Sequelize
const User = require('../models/User.js');

// Import de la bibliothèque de validation des données
const Joi = require('joi');

// Import de la bibliothèque de hachage de mot de passe
const bcrypt = require('bcrypt');


// Contrôleur pour la création d'un utilisateur
const createAUser = async (req, res) => {
    try {
        // Récupération des données du formulaire depuis le corps de la requête
        const { email, password, role, activated } = req.body;

        // Création d'un schéma de validation pour les données du formulaire
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).max(255).required(),
            role: Joi.string().required(),
            activated: Joi.number().integer().min(0).max(1).required()
        });

        // Fonction de validation des données du formulaire
        const validationResult = schema.validate({ email, password, role, activated });

        if (validationResult.error) {
            return res.status(400).json({ message: validationResult.error.message });
        }

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 12);

        // Création d'un nouvel utilisateur avec Sequelize
        const newUser = await User.create({
            email,
            password: hashedPassword, // Utilisez le mot de passe haché
            role,
            activated,
        });

        // Envoi d'une réponse indiquant que l'utilisateur a été créé avec succès
        res.status(201).json({ message: 'User created successfully', user: newUser });

    } catch (error) {
        // Gestion des erreurs
        console.error(error);
        res.status(500).json({ message: 'An error occurred while creating the user' });
    }
};


// Contrôleur pour récupérer tous les utilisateurs
const getAllUsers = async (req, res) => {
    try {
        // Récupérer tous les utilisateurs depuis la base de données
        const users = await User.findAll();

        // Vérifier s'il n'y a aucun utilisateur trouvé
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        // Renvoyer la liste des utilisateurs
        res.status(200).json(users);
    } catch (error) {
        // Gestion des erreurs
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching users' });
    }
};

// Contrôleur pour récupérer un utilisateur par son ID
const getUserById = async (req, res) => {
    try {
        // Récupérer l'ID de l'utilisateur à partir des paramètres de la requête
        const { id } = req.params;

        // Recherche de l'utilisateur dans la base de données en fonction de l'ID
        const user = await User.findByPk(id);

        // Vérifier si l'utilisateur existe
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Renvoyer l'utilisateur trouvé
        res.status(200).json(user);
    } catch (error) {
        // Gestion des erreurs
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching the user' });
    }
};


// Contrôleur pour récupérer tous les utilisateurs activés
const getAllActivatedUsers = async (req, res) => {
    try {
        // Récupérer tous les utilisateurs activés depuis la base de données
        const activatedUsers = await User.findAll({ where: { activated: 1 } });

        // Vérifier s'il n'y a aucun utilisateur activé trouvé
        if (!activatedUsers || activatedUsers.length === 0) {
            return res.status(404).json({ message: 'No activated users found' });
        }

        // Renvoyer la liste des utilisateurs activés
        res.status(200).json(activatedUsers);
    } catch (error) {
        // Gestion des erreurs
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching activated users' });
    }
};

// Contrôleur pour récupérer tous les utilisateurs non activés
const getUserNotActivated = async (req, res) => {
    try {
        // Récupérer tous les utilisateurs non activés depuis la base de données
        const notActivatedUsers = await User.findAll({ where: { activated: 0 } });

        // Vérifier s'il n'y a aucun utilisateur non activé trouvé
        if (!notActivatedUsers || notActivatedUsers.length === 0) {
            return res.status(404).json({ message: 'No not activated users found' });
        }

        // Renvoyer la liste des utilisateurs non activés
        res.status(200).json(notActivatedUsers);
    } catch (error) {
        // Gestion des erreurs
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching not activated users' });
    }
};


// Contrôleur pour valider un compte utilisateur
const validateUserAccount = async (req, res) => {
    try {
        // Récupérer l'ID de l'utilisateur à valider depuis les paramètres de la requête
        const { id } = req.params;

        // Recherche de l'utilisateur dans la base de données en fonction de l'ID
        const user = await User.findByPk(id);

        // Vérifier si l'utilisateur existe
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Mettre à jour le champ 'activated' de l'utilisateur à 1 pour le valider
        user.activated = 1;
        await user.save();

        // Renvoyer un message de succès
        res.status(200).json({ message: 'User account validated successfully', user });
    } catch (error) {
        // Gestion des erreurs
        console.error(error);
        res.status(500).json({ message: 'An error occurred while validating user account' });
    }
};


// Contrôleur pour supprimer un utilisateur
const deleteUser = async (req, res) => {
    try {
        // Récupérer l'ID de l'utilisateur à supprimer depuis les paramètres de la requête
        const { id } = req.params;

        // Recherche de l'utilisateur dans la base de données en fonction de l'ID
        const user = await User.findByPk(id);

        // Vérifier si l'utilisateur existe
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Supprimer l'utilisateur de la base de données
        await user.destroy();

        // Renvoyer un message de succès
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        // Gestion des erreurs
        console.error(error);
        res.status(500).json({ message: 'An error occurred while deleting the user' });
    }
};


module.exports = { 
    createAUser, 
    getAllUsers, 
    getUserById, 
    getAllActivatedUsers, 
    getUserNotActivated, 
    validateUserAccount,
    deleteUser,
};