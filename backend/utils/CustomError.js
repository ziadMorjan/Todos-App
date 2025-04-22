module.exports = class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.stack = this.stack;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}