const { addAdmin, deleteAdmin, loginUser, handleRefreshToken } = require('../controller/adminController');
const { authMiddleware, isAdmin } = require('../middleware/authmiddleware');

const Router = require('express').Router();

Router.post('/addAdmin',authMiddleware,isAdmin, addAdmin);
Router.delete('/deleteAdmin', authMiddleware,isAdmin,deleteAdmin)
Router.post("/login",loginUser);
Router.get("/refresh",handleRefreshToken);

module.exports = Router;