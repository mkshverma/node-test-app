var express = require('express');
var HomeRouter = express.Router();
var HomeController = require('../controllers/home.controller')

/* Show Home page */
HomeRouter.get('/emi-calculator', HomeController.emicalculator);
HomeRouter.get('/smtp-checker', HomeController.smtpchecker);
HomeRouter.post('/check-smtp', HomeController.checksmtp);
HomeRouter.get('/', HomeController.index);

module.exports = HomeRouter;
