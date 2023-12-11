const { StatusCodes } = require('http-status-codes');
const Catalog = require('../../models/catalog');
const { ForbiddenRouteError } = require('../../errors');

const getSellerCatalog = async (req, res)=>{
    const {type} = req.userDetails;
    if(type!=='buyer'){
        throw new ForbiddenRouteError('You are a seller, No access to this route');
    }
    const {seller_id:sellerId} = req.params;
    const {products} = await Catalog.findOne({sellerId});

    return res.status(StatusCodes.OK).json(products);
}

module.exports = getSellerCatalog;