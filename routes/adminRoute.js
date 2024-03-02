const { addAdmin, deleteAdmin } = require('../controller/adminController');

const Router = require('express').Router();

Router.post('/addAdmin', addAdmin);
Router.delete('/deleteAdmin', deleteAdmin)


module.exports = Router;