const CustomErrorApi = require('./customErrorApi');
const {StatusCodes} = require('http-status-codes');

class NotFoundError extends CustomErrorApi{
    constructor(message){
        super(message);
        this.status = StatusCodes.NOT_FOUND;
    }
}

module.exports = NotFoundError;