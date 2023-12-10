const BadRequestError = require('./BadRequestError');
const UnauthorizedError = require('./UnauthorizedError');
const NotFoundError = require('./NotFoundError');
const ForbiddenRouteError = require('./forbiddenRouteError');

module.exports = {
    BadRequestError,
    UnauthorizedError,
    NotFoundError,
    ForbiddenRouteError
}