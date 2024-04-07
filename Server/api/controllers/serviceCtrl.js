// Import des modèles définis avec Sequelize
const Service = require('../models/Service.js')

// Contrôleur pour créer un nouveau service
const createService = async (req, res) => {
    try {
        // Récupérer les données du formulaire depuis le corps de la requête
        const { nomService } = req.body;

        // Créer un nouveau service dans la base de données
        const newService = await Service.create({
            nomService,
        });

        // Envoi d'une réponse indiquant que le service a été créé avec succès
        res.status(201).json({ message: 'Service created successfully', service: newService });
    } catch (error) {
        // Gestion des erreurs
        console.error(error);
        res.status(500).json({ message: 'An error occurred while creating the service' });
    }
};


// Contrôleur pour récupérer tous les services
const getAllServices = async (req, res) => {
    try {
        // Récupérer tous les services depuis la base de données
        const services = await Service.findAll();

        // Vérifier s'il n'y a aucun service trouvé
        if (!services || services.length === 0) {
            return res.status(404).json({ message: 'No services found' });
        }

        // Renvoyer la liste des services
        res.status(200).json(services);
    } catch (error) {
        // Gestion des erreurs
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching services' });
    }
};


// Contrôleur pour récupérer un service par son ID
const getServiceById = async (req, res) => {
    try {
        // Récupérer l'ID du service à partir des paramètres de la requête
        const { id } = req.params;

        // Recherche du service dans la base de données en fonction de l'ID
        const service = await Service.findByPk(id);

        // Vérifier si le service existe
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        // Renvoyer le service trouvé
        res.status(200).json(service);
    } catch (error) {
        // Gestion des erreurs
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching the service' });
    }
};


// Contrôleur pour modifier un service
const updateService = async (req, res) => {
    try {
        // Récupérer l'ID du service à partir des paramètres de la requête
        const { serviceId } = req.params;

        // Recherche du service dans la base de données en fonction de l'ID
        const service = await Service.findByPk(serviceId);

        // Vérifier si le service existe
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        // Mettre à jour les champs du service avec les nouvelles données du formulaire
        service.nomService = req.body.nomService;

        // Enregistrer les modifications dans la base de données
        await service.save();

        // Renvoyer un message de succès avec le service mis à jour
        res.status(200).json({ message: 'Service updated successfully', service });
    } catch (error) {
        // Gestion des erreurs
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating the service' });
    }
};


// Contrôleur pour supprimer un service
const deleteService = async (req, res) => {
    try {
        // Récupérer l'ID du service à partir des paramètres de la requête
        const { id } = req.params;

        // Recherche du service dans la base de données en fonction de l'ID
        const service = await Service.findByPk(id);

        // Vérifier si le service existe
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        // Supprimer le service de la base de données
        await service.destroy();

        // Renvoyer un message de succès
        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        // Gestion des erreurs
        console.error(error);
        res.status(500).json({ message: 'An error occurred while deleting the service' });
    }
};


module.exports = { 
    createService, 
    getAllServices, 
    getServiceById, 
    updateService, 
    deleteService 
};