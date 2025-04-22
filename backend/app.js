const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const sanitizer = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const defaultRoute = require('./routes/DefaultRoute');
const { globalErrorHandler } = require('./controllers/ErrorController');

let app = express();

let limiter = rateLimit({
    max: 10000,
    windowMs: 60 * 60 * 1000, // 1 hour
    message: 'Too many requests from this IP, please try again in an hour!'
});

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));
app.use(limiter);
app.use(sanitizer());
app.use(xss());
app.use(hpp());

app.use(defaultRoute);

app.use(globalErrorHandler);


module.exports = app;