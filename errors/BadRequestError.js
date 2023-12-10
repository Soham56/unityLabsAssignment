const CustomErrorApi = require('./customErrorApi');
const {StatusCodes} = require('http-status-codes');

class BadRequestError extends CustomErrorApi{
    constructor(message){
        super(message);
        this.status = StatusCodes.BAD_REQUEST;
    }
}

module.exports = BadRequestError;