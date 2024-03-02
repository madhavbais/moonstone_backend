const { addEvent, GetAllevents, GetEventDataByCategory, updateEvent, geteventById, deleteEvent } = require('../controller/eventController');

const Router = require('express').Router();

Router.post('/addData',addEvent);
Router.get('/alleventData',GetAllevents);
Router.get('/geteventBycategory',GetEventDataByCategory);
Router.get('/:eventid',geteventById)
Router.put('/updateEvent/:eventid',updateEvent);
Router.delete('/:eventid',deleteEvent)
module.exports = Router;