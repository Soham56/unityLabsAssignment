const {ForbiddenRouteError} = require('../errors');

const verifyBuyer = (req, res, next)=>{
    const {type} = req.userDetails;
    if(type!='buyer') {
        throw new ForbiddenRouteError("You have no access to this Route !");
    }
    next();
}

module.exports = verifyBuyer;
