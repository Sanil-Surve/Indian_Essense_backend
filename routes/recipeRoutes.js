const express = require('express');
const { suggestRecipes } = require('../controllers/recipeController');
const router = express.Router();

router.post('/suggest-recipes', suggestRecipes);

module.exports = router;