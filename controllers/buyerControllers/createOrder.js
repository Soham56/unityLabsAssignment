const { StatusCodes } = require('http-status-codes');
const { ForbiddenRouteError } = require('../../errors');
const Orders = require('../../models/order');
const Catalog = require('../../models/catalog');

const createOrder = async (req, res)=>{
    const {userId} = req.userDetails;
    const {seller_id:sellerId} = req.params;

    //Buyer Given List of items
    const buyerOrderList = req.body;

    const {products:sellerCatalog} = await Catalog.findOne({sellerId});

    // Filtering those items which are actually present in seller catalog
    // In case buyer includes some items which are not present in seller catalog
    const buyerFilteredOrderList = buyerOrderList.filter((buyerOrder)=>{
        return sellerCatalog.some((sellerProduct)=> {
            return sellerProduct.productId === buyerOrder.productId;
        });
    });


    // Final query list to create order
    const buyerQueryOrderList = buyerFilteredOrderList.map((buyerOrder)=>{
        return {
            buyerId: userId,
            sellerId,
            productId: buyerOrder.productId
        }
    })
    
    // Get back those created orders
    const orders = await Orders.create(buyerQueryOrderList);

    const orderedProducts = orders.map((orderedProduct)=>{
        return {
            productId: orderedProduct.productId,
            orderId: orderedProduct._id
        }
    });

    return res.status(StatusCodes.CREATED).json(orderedProducts);
}

module.exports = createOrder;