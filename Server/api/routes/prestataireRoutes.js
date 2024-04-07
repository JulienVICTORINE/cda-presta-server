const express = require('express');
const router = express.Router();
const { checkRolesToken, verifyToken } = require("../middleware/auth.js");


// Importation du contrôleur service
const prestataireController = require('../controllers/prestataireCtrl');

// Route pour éditer un prestataire
router.put('/prestataires/:id', prestataireController.editPrestataire, verifyToken, checkRolesToken(["Admin", "Prestataire"]));

// Route pour récupérer tous les prestataires
router.get('/prestataires', prestataireController.getAllPrestataires);

// Route pour récupérer un prestataire par son ID
router.get('/prestataires/:id', prestataireController.getPrestataireById);

// Route pour récupérer les prestataires en fonction de l'ID de service
router.get('/prestataires/service/:serviceId', prestataireController.getPrestatairesByService);


module.exports = router;