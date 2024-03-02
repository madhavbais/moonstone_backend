const { addEvent } = require('../controller/eventController');

const Router = require('express').Router();

Router.post('/addData',addEvent);




module.exports = Router;