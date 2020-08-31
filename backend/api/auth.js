const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/auth');

const sendToken = (user, statusCode, res) => {
    const { id } = user;

    // JWT Sign for token
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 25 * 60 * 60 * 1000),
        httpOnly: true
    }
    // cookie will send encrypt version (only in https)
    if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    res.cookie('jwt', token, cookieOptions);

    // Remove password from the output
    user.password = undefined;

    // Return JSON
    res.status(statusCode).json({
        token,
        user
    });
}

// @route   GET /
// @desc    Authenticated user only || Logged in user only
// @access  Private
router.get('/', protect, (req, res) => {
    res.status(200).json({
        user: req.user
    })
})

// @route   POST api/v1/signUp
// @desc    Creates a user
// @access  public
router.post('/signUp', [
    // firstname and lastname must be not empty
    check('firstname').not().isEmpty().withMessage('firstname is required'),
    check('lastname').not().isEmpty().withMessage('lastname is required'),
    // email must be an email
    check('email').isEmail().withMessage('not recognize as email'),
    // password in only min of 6 char and max of 16 char
    check('password').isLength({ min: 6, max: 16 }).withMessage('must be at least minimum of 6 char and max of 16')
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Check if user exist and return error msg if it does
    const checkUser = await User.findOne({ email: req.body.email });
    if(checkUser) return res.status(400).json({ errors: [{ msg: 'Email already exist' }]})

    // Sign Up User
    const { firstname, lastname, email, password } = req.body;
    const user = await User.create({
        firstname, lastname, email, password
    });

    // Send token
    sendToken(user, 401, res);
});

// @route   POST api/v1/login
// @desc    Logins a user
// @access  public
router.post('/login', async(req, res) => {
    const { email, password } = req.body;
    // check if email and password exists
    // msg: incorrect email and password (security reasons)
    if(!email || !password) return res.status(400).json({ errors: [{ msg: 'Incorrect email or password' }]});

    // check if user exist and password is correct
    const user = await User.findOne({ email });
    if(!user || !await user.comparePassword(password, user.password)) return res.status(400).json({ errors: [{ msg: 'Incorrect email or password' }]});

    // send token
    sendToken(user, 200, res);
});

module.exports = router;