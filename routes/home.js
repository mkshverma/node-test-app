var express = require('express');
var HomeRouter = express.Router();
var HomeController = require('../controllers/home.controller')
var Base64Controller = require('../controllers/basesf.controller')
var BeautifyController = require('../controllers/beautify.controller')

/* Show Home page */
HomeRouter.route('/beautify-html').get(BeautifyController.html).post(BeautifyController.html);
HomeRouter.route('/beautify-js').get(BeautifyController.js).post(BeautifyController.js);
HomeRouter.route('/beautify-css').get(BeautifyController.css).post(BeautifyController.css);
HomeRouter.route('/base64encode').get(Base64Controller.encode).post(Base64Controller.encode);
HomeRouter.route('/base64decode').get(Base64Controller.decode).post(Base64Controller.decode);
HomeRouter.get('/emi-calculator', HomeController.emicalculator);
HomeRouter.get('/smtp-checker', HomeController.smtpchecker);
HomeRouter.post('/check-smtp', HomeController.checksmtp);
HomeRouter.get('/', HomeController.index);

module.exports = HomeRouter;
