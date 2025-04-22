const CustomError = require('../utils/CustomError');

let asyncErrorHandler = function (fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(error => next(error));
    }
}

let globalErrorHandler = function (error, req, res, next) {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    if (process.env.NODE_ENV === 'development') {
        devErrors(error, res);
    }
    else if (process.env.NODE_ENV === 'production') {
        prodErrors(error, res);
    }
}

let devErrors = function (error, res) {
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        stack: error.stack,
        error: error
    });
}

let prodErrors = function (error, res) {
    if (error.isOperational) {
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message
        });
    }
    else {
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!'
        });
    }
}


module.exports = {
    asyncErrorHandler,
    globalErrorHandler,
}