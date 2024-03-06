const { checkduplicate } = require('../controller/duplicateadharController');
const { addNewRegister, deleteRegistration, getAllRegistration, aproveregistration, denyregistrations } = require('../controller/registerController');
const { authMiddleware, isAdmin, isAuthenticatedforRegistrationDESkManipulations } = require('../middleware/authmiddleware');

const Router = require('express').Router();


Router.post('/register', addNewRegister);
Router.post("/checkaadhar",checkduplicate);
Router.delete('/deleteRegistration',authMiddleware,isAdmin,deleteRegistration)
Router.get('/allregistrations',authMiddleware,isAuthenticatedforRegistrationDESkManipulations,getAllRegistration);
Router.post('/approveRegistration/:id',authMiddleware,isAuthenticatedforRegistrationDESkManipulations,aproveregistration);
Router.post('/denyRegistrations',authMiddleware,isAuthenticatedforRegistrationDESkManipulations,denyregistrations);
module.exports = Router;
