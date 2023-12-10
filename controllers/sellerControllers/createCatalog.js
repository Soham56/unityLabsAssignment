const Products = require('../../models/product');
const Catalog = require('../../models/catalog');
const { ForbiddenRouteError } = require('../../errors');

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

    console.log(productList);

    res.send('created catalog');

}

module.exports = createCatalog;