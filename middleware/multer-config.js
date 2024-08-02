const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration de multer pour stocker les images en mémoire
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('image');

// Middleware pour compresser les images
const resizeImage = async (req, res, next) => {
    
    if (!req.file) {
        return next();
    }

    const { buffer, originalname } = req.file;

    // Retirer l'extension du nom du fichier original
    const baseName = path.basename(originalname, path.extname(originalname));

    // Utiliser une date formatée sans caractères spéciaux
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const ref = `${timestamp}-${baseName}.webp`;

    // Chemin complet du fichier
    const filePath = path.join('images', ref);

    // Vérifier si le dossier images existe, sinon le créer
    if (!fs.existsSync('images')) {
        fs.mkdirSync('images');
    }

    try {
        // Compresser l'image et la sauvegarder dans le dossier 'images'
        await sharp(buffer)
            .webp({ quality: 20 })
            .toFile(filePath);

        console.log('Image saved as WebP:', filePath);

        // Mettre à jour req.file.filename pour qu'il soit utilisé dans le contrôleur
        req.file.filename = ref;
        next();
    } catch (error) {
        res.status(500).json({ error: 'Image compression failed' });
    }
};

module.exports = [upload, resizeImage];
