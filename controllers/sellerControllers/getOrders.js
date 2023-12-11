const { StatusCodes } = require('http-status-codes');
const { ForbiddenRouteError } = require('../../errors');
const Orders = require('../../models/order');

const getOrders = async (req, res)=>{
    const {userId} = req.userDetails;

    //Finding orders for sellerId
    const orders = await Orders.find({sellerId: userId}).select('productId buyerId');

    return res.status(StatusCodes.OK).json(orders);
}

module.exports = getOrders;