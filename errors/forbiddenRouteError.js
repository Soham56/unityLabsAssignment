const CustomErrorApi = require('./customErrorApi');
const {StatusCodes} = require('http-status-codes');

class ForbiddenRouteError extends CustomErrorApi{
    constructor(message){
        super(message);
        this.status = StatusCodes.FORBIDDEN;
    }
}

module.exports = ForbiddenRouteError;