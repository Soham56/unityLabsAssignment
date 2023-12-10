const CustomErrorApi = require('./customErrorApi');
const {StatusCodes} = require('http-status-codes');

class UnauthorizedError extends CustomErrorApi{
    constructor(message){
        super(message);
        this.status = StatusCodes.UNAUTHORIZED;
    }
}

module.exports = UnauthorizedError;