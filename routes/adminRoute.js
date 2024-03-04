const { addAdmin, deleteAdmin, loginUser, handleRefreshToken, checkvalidity } = require('../controller/adminController');
const { authMiddleware, isAdmin, isValid, isValidForEventManipulation } = require('../middleware/authmiddleware');

const Router = require('express').Router();

Router.post('/addAdmin',authMiddleware,isAdmin, addAdmin);
Router.delete('/deleteAdmin', authMiddleware,isAdmin,deleteAdmin)
Router.post("/login",loginUser);
Router.get("/refresh",handleRefreshToken);
Router.get('/checkvalidity',authMiddleware,isValid,checkvalidity);

Router.get('/checkForEventManipulation',authMiddleware,isValidForEventManipulation,checkvalidity);
module.exports = Router;