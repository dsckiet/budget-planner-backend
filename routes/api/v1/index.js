const express = require('express');
const router = express.Router();

const indexController = require('../../../controllers/index_controller');

router.get('/test', indexController.test);

router.post('/add_offline_transaction/:email', indexController.add_offline_transaction);

router.post('/add_user/:email', indexController.add_user);

router.post('/complete_user_profile/:email', indexController.complete_user_profile);

module.exports = router;