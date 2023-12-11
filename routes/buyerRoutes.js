const express = require('express');
const router = express.Router();

const listOfSellers = require('../controllers/buyerControllers/listOfSellers');
const createOrder = require('../controllers/buyerControllers/createOrder');
const getSellerCatalog = require('../controllers/buyerControllers/sellerCatalog');

router.route('/list-of-sellers').get(listOfSellers);
router.route('/seller-catalog/:seller_id').get(getSellerCatalog);
router.route('/create-order/:seller_id').post(createOrder);

module.exports = router;