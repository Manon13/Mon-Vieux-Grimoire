![Node.js](https://img.shields.io/static/v1?label=Node.js&message=v20.15.1&color=blue)
![Express](https://img.shields.io/static/v1?label=Express&message=v4.19.2&color=blue)
![MongoDB](https://img.shields.io/static/v1?label=MongoDB&message=v6.8.0&color=green)
![Mongoose](https://img.shields.io/static/v1?label=Mongoose&message=v8.5.1&color=blue)
![Bcrypt](https://img.shields.io/static/v1?label=Bcrypt&message=v5.1.1&color=blue)
![JWT](https://img.shields.io/static/v1?label=JWT&message=v9.0.2&color=blue)
![cors](https://img.shields.io/static/v1?label=cors&message=v2.8.5&color=blue)
![dotenv](https://img.shields.io/static/v1?label=dotenv&message=v16.4.5&color=blue)
![mongoose-unique-validator](https://img.shields.io/static/v1?label=mongoose-unique-validator&message=v5.0.1&color=blue)
![multer](https://img.shields.io/static/v1?label=multer&message=v1.4.5-lts.1&color=blue)
![sharp](https://img.shields.io/static/v1?label=sharp&message=v0.33.4&color=blue)

# API pour le site Mon Vieux Grimoire 

Cette API fournit des fonctionnalités pour gérer les livres d'un site de notation de livres. 


## Table des matières

- [Technologies Utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [Endpoints](#endpoints)
- [Structure du Projet](#structure-du-projet)

## Technologies Utilisées
* Node.js
* Express
* MongoDB
* Mongoose
* Bcrypt
* JWT

## Installation
Instructions pour installer l'API localement.

### Clonez le dépôt
`git clone https://github.com/Manon13/Mon-Vieux-Grimoire.git`

### Instalation des dépendances
Installation des dépendances du projet:
`npm install`

Installation des outils de développement (optionnel)
`npm install -g nodemon`

### Configuration 
Créer un fichier .env à la racine du projet et ajoutez-y les variables suivantes: 
```bash
MONGODB_URI="db_uri"

JWT_SECRET_TOKEN="token_secret"

JWT_EXPIRES_IN="token_expiration_time"
```

### Utilisation
Démarrage du serveur avec:
`npm start`

### Endpoints

#### Authentification
* `POST /api/auth/signup`: Crée un nouvel utilisateur.
* `POST /api/auth/login`: Authentifie un utilisateur et retourne un token JWT.

#### Les routes du livre
* `GET /api/books`: Récupère la liste de tous les livres. 
* `POST /api/books`: Crée un nouveau livre.
* `GET /api/books/bestrating`: Récupère les 3 livres les mieux notés.
* `GET /api/books/:id`: Récupère un livre spécifique par son ID.
* `PUT /api/books/:id`: Modifie un livre spécifique.
* `DELETE /api/books/:id`: Supprime un livre spécifique.
* `POST /api/books/:id/rating`: Note un livre spécifique.

### Structure du projet
* `back-end`: Contient tous les fichiers de l'API.
    * `controllers`: Gère la logique métier de l'API en traitant les requêtes et en interagissant avec les modèles de données.
    * `images`: Contient toutes les images de livre importé.
    * `middleware`: Intercepte et traite les requêtes pour ajouter des fonctionnalités comme l'authentification et la compression des images.
    * `models`: Définit tous les schémas de données et les interactions avec la base de données.
    * `routes`: Définit les chemins d'accès de l'API et associe chaque route à un contrôleur spécifique.
    * .env: Contient les variables d'environnement utilisées pour configurer l'application.
    * app.js: Configure Express avec les routes, les middlewares, et la connexion à MongoDB, tout en gérant CORS et les paramètres d'environnement.
    * server.js: Démarre le serveur HTTP avec Express, configure le port, et gère les erreurs de démarrage.
