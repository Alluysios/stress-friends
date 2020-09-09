const path = require('path');
const express = require('express');
const app = express();

const compression = require('compression');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// API
const authRouter = require('./api/auth');
const postRouter = require('./api/posts');
const userRouter = require('./api/users');
const commentRouter = require('./api/comment');

/*
===================
 GLOBAL MIDDLEWARE 
===================
*/

// Compress Files
app.use(compression());
// Security HTTP Headers
app.use(helmet());
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

app.use(cors());
app.options('*', cors());
// Serve static files
app.use('/uploads', express.static('uploads'))
/*
==============
    ROUTES
==============
*/
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/users', userRouter);

app.use(express.static('frontend/build'));
// Serve static files
if(process.env.NODE_ENV === 'production') {

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}

module.exports = app;