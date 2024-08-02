const Book = require('../models/Book');
const fs = require('fs');

exports.getAllBooks = (req, res, next) => {
    Book.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => res.status(200).json(book))
        .catch(error => res.status(404).json({ error }));
};

exports.getBestRatingBooks = (req, res, next) => {
    // return res.status(418).json({ error: "I'm a teapot" });
    // return res.status(200).json({ message: 'getBestRatingBooks' });
    Book.find().sort({ averageRating: -1 }).limit(3)
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
};

exports.createBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject.userId;

    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: imageUrl
    });

    book.save()
        .then(() => res.status(201).json({ message: 'Livre enregistré avec succès!' }))
        .catch((error) => res.status(400).json({ error }));
};

exports.modifyBook = (req, res, next) => {
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete bookObject._userId;

    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (book.userId !== req.auth.userId) {
                res.status(403).json({ error: '403: unauthorized request' });
            } else {
                Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Livre modifié avec succès!' }))
                    .catch((error) => res.status(400).json({ error }));
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => {
            if (book.userId !== req.auth.userId) {
                res.status(403).json({ error: '403: unauthorized request' });
            } else {
                const filename = book.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Book.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Livre supprimé avec succès!' }))
                        .catch(error => res.status(400).json({ error }));
                });
            }
        })
        .catch(error => res.status(500).json({ error }));
};

exports.rateBook = (req, res, next) => {
    const userId = req.body.userId;
    const rating = req.body.rating;

    // Check if rating is in range 1-5
    if (rating < 1 || rating > 5) {
        return res.status(400).json({ error: '400: invalid rating' });
    }

    Book.findOne({ _id: req.params.id })
        .then(book => {
            if (!book) {
                return res.status(404).json({ error: 'Livre non trouvé.' });
            }

            // Check if user has already rated the book
            if (book.ratings.some(r => r.userId === userId)) {
                return res.status(403).json({ error: '403: unauthorized request' });
            }

            // Add rating to ratings array and update averageRating
            book.ratings.push({ userId: userId, grade: rating });
            const averageRating = book.ratings.reduce((acc, r) => acc + r.grade, 0) / book.ratings.length;

            book.averageRating = averageRating;

            book.save()
                .then(updatedBook => res.status(200).json(updatedBook))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};