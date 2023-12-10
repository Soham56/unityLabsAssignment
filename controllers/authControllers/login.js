const {StatusCodes} = require('http-status-codes');
const {UnauthorizedError} = require('../../errors');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res)=>{
    const authorizationHeader = req.headers.authorization;
    if(!authorizationHeader || !authorizationHeader.startsWith('Bearer ')){
        throw new UnauthorizedError('You are not authorized, Please register !');
    }

    const token = authorizationHeader.split(' ')[1];
    const isVerifiedUser = jwt.verify(token, process.env.JWT_SECREAT);
    if(!isVerifiedUser){
        throw new UnauthorizedError('You are not authorized, Please register !');
    }

    return res.status(StatusCodes.ACCEPTED).json({msg: 'User Successfully Logged In'});
}

module.exports = loginUser;