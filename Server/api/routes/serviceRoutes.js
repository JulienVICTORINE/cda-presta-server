const express = require('express');
const router = express.Router();

// Importation du contrôleur service
const serviceController = require('../controllers/serviceCtrl');

// Route qui permet d'ajouter un service
router.post('/service', serviceController.createService);

// Route qui renvoie tous les services
router.get('/services', serviceController.getAllServices);

// Route qui renvoie un service spécifique en fonction de son identifiant
router.get('/service/:id', serviceController.getServiceById);

// Route qui permet de supprimer un service spécifique en fonction de son identifiant
router.delete('/service/:id', serviceController.deleteService);

// Route qui permet de mettre à jour les informations d'un service spécifique en fonction de son identifiant
router.patch('/service/:id', serviceController.updateService);


module.exports = router;
