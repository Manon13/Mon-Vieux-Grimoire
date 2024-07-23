const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
// const multer = require('../middleware/multer-config');

const bookCtrl = require('../controllers/book');


router.get('/books', bookCtrl.getAllBooks);
router.get('/books/:id', bookCtrl.getOneBook);
// router.get('/books/bestrating', bookCtrl.getBestRatingBooks);
router.post('/books', auth, bookCtrl.createBook);
router.put('/books/:id', auth, bookCtrl.modifyBook);
router.delete('/books/:id', auth, bookCtrl.deleteBook);
// router.post('/books/:id/rating', auth, bookCtrl.rateBook);


module.exports = router;