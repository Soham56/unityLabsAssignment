const { StatusCodes } = require('http-status-codes');
const { ForbiddenRouteError } = require('../../errors');
const Orders = require('../../models/order');

const getOrders = async (req, res)=>{
    const {userId, type} = req.userDetails;
    if(type!=='seller'){
        throw new ForbiddenRouteError("You have no access to this route !");
    }

    //Finding orders for sellerId
    const orders = await Orders.find({sellerId: userId});

    return res.status(StatusCodes.OK).json(orders);
}

module.exports = getOrders;