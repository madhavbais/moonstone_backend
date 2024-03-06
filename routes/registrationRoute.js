const { checkduplicate } = require('../controller/duplicateadharController');
const { addNewRegister, deleteRegistration, getAllRegistration } = require('../controller/registerController');
const { authMiddleware, isAdmin } = require('../middleware/authmiddleware');

const Router = require('express').Router();


Router.post('/register', addNewRegister);
Router.post("/checkaadhar",checkduplicate);
Router.delete('/deleteRegistration',authMiddleware,isAdmin,deleteRegistration)
Router.get('/allregistrations',authMiddleware,isAdmin,getAllRegistration);
module.exports = Router;
