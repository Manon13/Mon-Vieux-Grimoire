const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Middleware pour l'authentification des utilisateurs via JWT
 * 
 * @param {Object} req - L'ojet représentant la requête
 * @param {Object} res - L'objet représentant la réponse
 * @param {Function} next - La fonction à appeler après le middleware
 */
 
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};