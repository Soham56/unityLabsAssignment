const { StatusCodes } = require('http-status-codes');
const Catalog = require('../../models/catalog');
const { ForbiddenRouteError } = require('../../errors');

const getSellerCatalog = async (req, res)=>{
    const {seller_id:sellerId} = req.params;

    //Selecting only products from wanted seller catalog
    const catalog = await Catalog.findOne({sellerId});

    if(!catalog){
        return res.status(StatusCodes.OK).json({
            msg: `No catalog present for sellerId ${sellerId}`
        });
    }

    return res.status(StatusCodes.OK).json({products: catalog.products});
}

module.exports = getSellerCatalog;