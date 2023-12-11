const { StatusCodes } = require('http-status-codes');
const Catalog = require('../../models/catalog');
const { ForbiddenRouteError } = require('../../errors');

const getSellerCatalog = async (req, res)=>{
    const {type} = req.userDetails;
    if(type!=='buyer'){
        throw new ForbiddenRouteError('You have no access to this Route !');
    }
    const {seller_id:sellerId} = req.params;

    //Selecting only products from wanted seller catalog
    const {products} = await Catalog.findOne({sellerId});

    return res.status(StatusCodes.OK).json(products);
}

module.exports = getSellerCatalog;