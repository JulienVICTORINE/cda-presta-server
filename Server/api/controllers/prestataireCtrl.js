// Import des modèles définis avec Sequelize
const Prestataire = require('../models/Prestataire.js')


// Contrôleur pour éditer un prestataire
const editPrestataire = async (req, res) => {
    try {
        // Récupérer l'ID du prestataire à éditer depuis les paramètres de la requête
        const { id } = req.params;

        // Recherche du prestataire dans la base de données en fonction de l'ID
        const prestataire = await Prestataire.findByPk(id);

        // Vérifier si le prestataire existe
        if (!prestataire) {
            return res.status(404).json({ message: 'Prestataire not found' });
        }

        // Mettre à jour les champs du prestataire avec les nouvelles données du formulaire
        prestataire.fullName = req.body.fullName;
        prestataire.telephone = req.body.telephone;
        prestataire.description = req.body.description;
        prestataire.ville = req.body.ville;
        prestataire.idService = req.body.idService;

        // Enregistrer les modifications dans la base de données
        await prestataire.save();

        // Renvoyer un message de succès avec le prestataire mis à jour
        res.status(200).json({ message: 'Prestataire updated successfully', prestataire });
    } catch (error) {
        // Gestion des erreurs
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating prestataire' });
    }
};


// Contrôleur pour récupérer tous les prestataires
const getAllPrestataires = async (req, res) => {
    try {
        // Récupérer tous les prestataires depuis la base de données
        const prestataires = await Prestataire.findAll();

        // Vérifier s'il n'y a aucun prestataire trouvé
        if (!prestataires || prestataires.length === 0) {
            return res.status(404).json({ message: 'No prestataires found' });
        }

        // Renvoyer la liste des prestataires
        res.status(200).json(prestataires);
    } catch (error) {
        // Gestion des erreurs
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching prestataires' });
    }
};


// Contrôleur pour récupérer un prestataire par son ID
const getPrestataireById = async (req, res) => {
    try {
        // Récupérer l'ID du prestataire à partir des paramètres de la requête
        const { id } = req.params;

        // Recherche du prestataire dans la base de données en fonction de l'ID
        const prestataire = await Prestataire.findByPk(id);

        // Vérifier si le prestataire existe
        if (!prestataire) {
            return res.status(404).json({ message: 'Prestataire not found' });
        }

        // Renvoyer le prestataire trouvé
        res.status(200).json(prestataire);
    } catch (error) {
        // Gestion des erreurs
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching the prestataire' });
    }
};


// Contrôleur pour récupérer les prestataires en fonction de l'ID de service
const getPrestatairesByService = async (req, res) => {
    try {
        // Récupérer l'ID du service à partir des paramètres de la requête
        const { serviceId } = req.params;

        // Recherche des prestataires dans la base de données en fonction de l'ID de service
        const prestataires = await Prestataire.findAll({ where: { idService: serviceId } });

        // Vérifier s'il n'y a aucun prestataire trouvé
        if (!prestataires || prestataires.length === 0) {
            return res.status(404).json({ message: 'No prestataires found for this service' });
        }

        // Renvoyer la liste des prestataires trouvés pour ce service
        res.status(200).json(prestataires);
    } catch (error) {
        // Gestion des erreurs
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching prestataires by service' });
    }
};


module.exports = { 
    editPrestataire, 
    getAllPrestataires, 
    getPrestataireById, 
    getPrestatairesByService 
};
