const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();


/**
 * Gère l'inscription d'un utilisateur et le chiffrement du mot de passe
 * 
 * @param {Object} req - L'objet représentant la requête
 * @param {Object} res - L'objet représentant la réponse
 * @param {Function} next - La fonction à appeler après le middleware
 */
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé avec succès!' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};


/**
 * Gère la connexion d'un utilisateur en vériiant l'email et le mot de passe
 * et en renvoyant un token d'authentification
 * 
 * @param {Object} req - L'objet représentant la requête
 * @param {Object} res - L'objet représentant la réponse
 * @param {Function} next - La fonction à appeler après le middleware
*/
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id }, process.env.JWT_SECRET_TOKEN,
                            { expiresIn: process.env.JWT_EXPIRES_IN }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};