const express = require('express');
const User = require('../models/User');

const router = express.Router();

const { protect } = require('../middleware/auth');

// @route   GET /
// @desc    Get User Profile
// @access  Private
router.get('/', protect, async(req, res) => {
    // get user
    const user = await User.findById(req.user.id);

    // if there is no user return an error
    if(!user) return res.status(400).json({ errors: [{ msg: 'No user with that id found' }]});

    res.status(200).json({
        user
    });
});

// @route   PATCH /
// @desc    Update user profile
// @access  Private
router.patch('/', protect, async(req, res) => {
    const { firstname, lastname, email } = req.body;

    // check if user updating for password
    if(req.body.password) return res.status(400).json({ errors: [{ msg: 'Please go to update password. This is only for updating profile. '}]});
    const user = await User.findByIdAndUpdate(req.user.id, {
        firstname,
        lastname,
        email
    }, { new: true });

    if(!user) res.status(401).json({ errors: [{ msg: 'No user with that id.' }]});

    res.status(200).json({
        user
    });
});

// @route   PATCH /
// @desc    Update user profile
// @access  Private
router.patch('/changePassword', protect, async(req, res) => {
    const { currentPassword, newPassword, passwordConfirm } = req.body;

    const user = await User.findById(req.user.id).select('+password');
    // Check if current password is correct
    if(!await user.comparePassword(currentPassword, user.password)) return res.status(401).json({ errors: [{ msg: 'Current password wrong' }]});

    // Check if new password is same with passwordConfirm
    if(newPassword !== passwordConfirm) return res.status(401).json({ errors: [{ msg: 'Password not the same' }]});

    // Update Password to new one.
    user.password = newPassword;
    await user.save();

    user.password = undefined;

    res.status(200).json({
        user
    });
})

module.exports = router;