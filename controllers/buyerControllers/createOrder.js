const { StatusCodes } = require('http-status-codes');
const { ForbiddenRouteError } = require('../../errors');
const Orders = require('../../models/order');
const Catalog = require('../../models/catalog');

const createOrder = async (req, res)=>{
    const {userId} = req.userDetails;
    const {seller_id:sellerId} = req.params;

    //Buyer Given List of items
    let buyerOrderList = req.body;

    const {products:sellerCatalog} = await Catalog.findOne({sellerId});

    // Filtering those items which are actually present in seller catalog
    // In case buyer includes some items which are not present in seller catalog
    buyerOrderList = buyerOrderList.filter((buyerOrder)=>{
        return sellerCatalog.includes(buyerOrder);
    })

    // Final query list to create order
    const buyerQueryOrderList = buyerOrderList.map((buyerOrder)=>{
        return {
            buyerId: userId,
            sellerId,
            productId: buyerOrder.productId
        }
    })
    
    // Get back those created orders
    const orders = await Orders.create(buyerQueryOrderList);

    return res.status(StatusCodes.CREATED).json({orders});
}

module.exports = createOrder;