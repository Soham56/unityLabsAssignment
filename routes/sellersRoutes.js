const express = require('express');
const router = express.Router();

const createCatalog = require('../controllers/sellerControllers/createCatalog');
const getOrders = require('../controllers/sellerControllers/getOrders');

router.route('/create-catalog').post(createCatalog);
router.route('/orders').get(getOrders);

module.exports = router;
