const express = require('express');
const app = express();
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

mongoose.connect('mongodb+srv://Manon:IoeEXULfrzWDBudgzU@cluster0.qgvxpgy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => {
    console.error('Connexion à MongoDB échouée !', error.message);
    console.error('Erreur complète:', error);
  });

app.use(express.json());

app.use('/api/auth', userRoutes);

module.exports = app;