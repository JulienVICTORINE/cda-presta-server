const express = require('express');
const router = express.Router();

// Importation du contrôleur user
const userController = require('../controllers/userCtrl');

const { checkRolesToken, verifyToken } = require("../middleware/auth.js");


// Route pour créer un nouvel utilisateur
router.post('/register', userController.createAUser);

// Route pour récupérer tous les utilisateurs
router.get('/users', userController.getAllUsers);

// Route pour récupérer un utilisateur par son ID
router.get('/users/:id', userController.getUserById);

// Route pour récupérer tous les utilisateurs activés
router.get('/users/activated', userController.getAllActivatedUsers);

// Route pour récupérer tous les utilisateurs non activés
router.get('/users-not-activated', userController.getUserNotActivated, verifyToken, checkRolesToken(["Admin"]));

// Route pour valider un compte utilisateur
router.put('/validate-account/:id', userController.validateUserAccount, verifyToken, checkRolesToken(["Admin"]));

// Route pour supprimer un utilisateur par son ID
router.delete('/users/delete/:id', userController.deleteUser, verifyToken, checkRolesToken(["Admin", "Prestataire"]));


module.exports = router;