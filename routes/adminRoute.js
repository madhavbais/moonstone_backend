const { addAdmin } = require('../controller/adminController');
const { deleteAdmin } = require('../controller/adminController');

const Router = require('express').Router();

Router.post('/addAdmin', addAdmin);
Router.delete('/deleteAdmin', deleteAdmin)


module.exports = Router;