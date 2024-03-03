const Router = require('express').Router;
const { getCounts } = require("../controller/countController");

const router = Router();

// Route for getting counts
router.get('/', getCounts);

module.exports = router;
