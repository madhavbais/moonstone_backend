const { addNewRegister, deleteRegistration } = require('../controller/registerController');

const Router = require('express').Router();


Router.post('/register', addNewRegister);
Router.delete('/deleteRegistration', deleteRegistration)

module.exports = Router;
