const { StatusCodes } = require('http-status-codes');
const Catalog = require('../../models/catalog');
const { ForbiddenRouteError } = require('../../errors');

const getSellerCatalog = async (req, res)=>{
    const {seller_id:sellerId} = req.params;

    //Selecting only products from wanted seller catalog
    const {products} = await Catalog.findOne({sellerId});

    return res.status(StatusCodes.OK).json(products);
}

module.exports = getSellerCatalog;