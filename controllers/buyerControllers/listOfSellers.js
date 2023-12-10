const User = require('../../models/user');
const {ForbiddenRouteError} = require('../../errors');
const { StatusCodes } = require('http-status-codes');

const listOfUser = async (req, res)=>{
    const {userId, type} = req.userDetails;
    if(type!='buyer') {
        throw new ForbiddenRouteError("You have no access to this route");
    }

    const sellers = await User.find({type: 'seller'}).select('username _id');

    return res.status(StatusCodes.OK).json({sellers});
}

module.exports = listOfUser;