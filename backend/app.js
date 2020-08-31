const path = require('path');
const express = require('express');
const app = express();

const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');

// API
const authRouter = require('./api/auth');

/*
===================
 GLOBAL MIDDLEWARE 
===================
*/
// Compress Files
app.use(compression());
// Security HTTP Headers
app.use(helmet());

// Development logging
if(process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS (prevent HTML Codes)
app.use(xss());

// able to read cookie in the body
app.use(cookieParser());

// Body parser, reading data from the body into the req.body (limit 10kb)
app.use(express.json({ limit: '10kb' }));

// parse data from urlencoded form (files), {extended: true} = pass complex data
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

/*
==============
    ROUTES
==============
*/
app.use('/api/v1/auth', authRouter);

// Global error handling this means the response cycle didn't make it if we reach this point.
app.all('*', (req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl} on this server!`);
    err.status = 'fail';
    err.statusCode = 404;
    next();
});

module.exports = app;