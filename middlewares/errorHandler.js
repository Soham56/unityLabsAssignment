const {StatusCodes} = require('http-status-codes');

const errorHandler = (err, req, res, next)=>{
    const customError = {};
    customError.msg = err.message || 'Something went wrong, try again later';
    customError.status  = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(customError.status).json({msg: customError.msg});
}

module.exports = errorHandler;