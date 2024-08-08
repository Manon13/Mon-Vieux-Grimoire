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

Installation du framework Express:
`npm install express --save`

Installation de mongoose
`npm install mongoose`

Installation de l'unique validator de mongoose:
`npm install mongoose-unique-validator`

Installation de bcrypt:
`npm install bcrypt --save`

Installation de Json Web Tokens:
`npm install jsonwebtoken`

Installation de multer:
`npm install --save multer`

Installation de CORS:
`npm install cors --save`

Installation de sharp:
`npm install sharp`

Installation de dotenv:
`npm install @dotenvx/dotenvx -g`

### Configuration 
Créer un fichier .env à la racine du projet et ajoutez-y les variables suivantes: 
```
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