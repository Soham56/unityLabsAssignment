const {ForbiddenRouteError} = require('../errors');

const verifySeller = (req, res, next)=>{
    const {type} = req.userDetails;
    if(type!=='seller'){
        throw new ForbiddenRouteError('You have no access to this Route !');
    }
    next();
}

module.exports = verifySeller;
