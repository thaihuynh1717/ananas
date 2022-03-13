const express = require('express');
const router = express.Router();
const pageController = require('../controllers/PageController');

router.get('/', pageController.index);

module.exports = router;
