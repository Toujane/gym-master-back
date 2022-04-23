const CustomAPIError = require('./customError');
const { ReasonPhrases, StatusCodes } = require('http-status-codes');
class BadRequestError extends CustomAPIError {
	constructor(message) {
		super(message);
		this.statusCode = StatusCodes.BAD_REQUEST;
	}
}

module.exports = BadRequestError;
