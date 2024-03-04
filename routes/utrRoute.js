const {createUtr, getAllUtrs } = require("../controller/utrController")
const Router = require('express').Router();


// Create a new UTR
Router.post('/addUtrs', createUtr);

// Get all UTRs
Router.get("/getUtrs", getAllUtrs);

module.exports = Router;
