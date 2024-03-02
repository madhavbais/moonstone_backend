const { addRegister } = require('../controller/registerController');

const Router = require('express').Router();


Router.post('/register', addNewRegister);

module.exports = Router;
