const express = require('express');
const cors = require('cors');

// Importation des routes
const userRoutes = require('./api/routes/userRoutes');
const authRoutes = require('./api/routes/authRoutes');
const serviceRoutes = require('./api/routes/serviceRoutes');
const prestataireRoutes = require('./api/routes/prestataireRoutes');


const app = express();

app.use(cors());
app.use(express.json())

app.use(userRoutes);
app.use(authRoutes);
app.use(serviceRoutes);
app.use(prestataireRoutes);

// Démarrer le serveur
app.listen(3001, () => {
    console.log('Serveur démarré sur le port 3001');
});
