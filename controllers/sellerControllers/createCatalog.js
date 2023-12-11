const Products = require('../../models/product');
const Catalog = require('../../models/catalog');
const { ForbiddenRouteError } = require('../../errors');
const { StatusCodes } = require('http-status-codes');

const createCatalog = async (req, res)=>{
    const {userId} = req.userDetails;

    //Fetching all seller products to into the catalog
    const userProductList = req.body;

    //Cutomizing the details to fit into the schema structure
    const productList = userProductList.map((userProduct)=>{
        return {
            ...userProduct,sellerId:userId
        }
    });

    //Creating those products into the Products Database
    await Products.create(productList);

    //Selecting all products of the seller
    const sellerAllProductList = await Products.find({sellerId: userId});

    //Customizing products according to the schema's structure
    const sellerCatalogProducts = sellerAllProductList.map((sellerProduct)=>{
        return {
            productId: sellerProduct._id.toString(),
            name: sellerProduct.name,
            price: sellerProduct.price
        }
    });

    //Creating a new catalog if the sellerId is not present in the database
    //Otherwise updating current catalog
    const {_id:catalogId, products} = await Catalog.findOneAndUpdate({sellerId: userId}, {
        sellerId: userId,
        products: sellerCatalogProducts
    },{
        new: true,
        upsert: true
    });

    res.status(StatusCodes.CREATED).json({
        catalogId,
        products
    });

}

module.exports = createCatalog;