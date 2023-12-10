const Products = require('../../models/product');
const Catalog = require('../../models/catalog');
const { ForbiddenRouteError } = require('../../errors');
const { StatusCodes } = require('http-status-codes');

const createCatalog = async (req, res)=>{
    const {userId, type} = req.userDetails;
    if(type!=='seller'){
        throw new ForbiddenRouteError('You have no access to this Route !');
    }

    const userProductList = req.body;
    const productList = userProductList.map((userProduct)=>{
        return {
            ...userProduct,sellerId:userId
        }
    });

    await Products.create(productList);
    const sellerAllProductList = await Products.find({sellerId: userId});

    const sellerCatalogProducts = sellerAllProductList.map((sellerProduct)=>{
        return {
            productId: sellerProduct._id.toString(),
            name: sellerProduct.name,
            price: sellerProduct.price
        }
    });

    const catalog = await Catalog.findOneAndUpdate({sellerId: userId}, {
        sellerId: userId,
        products: sellerCatalogProducts
    },{
        new: true,
        upsert: true
    });

    res.status(StatusCodes.CREATED).json(catalog);

}

module.exports = createCatalog;