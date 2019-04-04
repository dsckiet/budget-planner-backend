const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index_controller');

router.get('/test', indexController.test);

module.exports = router;