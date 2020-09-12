const express = require('express');
const crimesController = require('./controllers/crimesController');

const routes = express.Router();

routes.get('/heatmap', crimesController.index);

module.exports = routes;