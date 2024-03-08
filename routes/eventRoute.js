const { addEvent, GetAllevents, GetEventDataByCategory, updateEvent, geteventById, deleteEvent, checkevent } = require('../controller/eventController');
const { authMiddleware, isAdmin } = require('../middleware/authmiddleware');
const Router = require('express').Router();


Router.get('/alleventData',GetAllevents);
Router.get('/geteventBycategory',GetEventDataByCategory);
Router.get('/:eventid',geteventById)
Router.post('/addData',authMiddleware,isAdmin,addEvent);
Router.post('/addData',authMiddleware,isAdmin,checkevent);
Router.put('/updateEvent/:eventid',authMiddleware,isAdmin,updateEvent);
Router.delete('/:eventid',authMiddleware,isAdmin,deleteEvent)
module.exports = Router;