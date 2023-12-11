const { StatusCodes } = require('http-status-codes');
const { ForbiddenRouteError } = require('../../errors');
const Orders = require('../../models/order');

const createOrder = async (req, res)=>{
    const {userId, type} = req.userDetails;
    if(type!=='buyer'){
        throw new ForbiddenRouteError('You are a seller , No access to this Route');
    }

    const {seller_id:sellerId} = req.params;

    const buyerOrderList = req.body;

    const buyerQueryOrderList = buyerOrderList.map((buyerOrder)=>{
        return {
            buyerId: userId,
            sellerId,
            productId: buyerOrder.productId
        }
    })
    
    const orders = await Orders.create(buyerQueryOrderList);

    return res.status(StatusCodes.CREATED).json({orders});
}

module.exports = createOrder;