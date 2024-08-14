require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((error) => {
        console.error('Connexion à MongoDB échouée !', error.message);
        console.error('Erreur complète:', error);
})

module.exports = mongoose;