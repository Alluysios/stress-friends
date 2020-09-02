const express = require('express');
const Comment = require('../models/Comment');
const { protect } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

// @route   GET /:pid/comments
// @desc    Get all comments on posts
// @access  Public
router.get('/:pid/comments', async(req, res) => {
    const comments = await Comment.findById(req.params.cid);

    res.status(200).json({
        comments
    });
});

// @route   POST posts/:pid/comments
// @desc    Comment on post
// @access  Private
router.post('/', protect, async(req, res) => {
    // add user and post id
    if(!req.body.user) req.body.user = req.user;
    if(!req.body.post) req.body.post = req.params.pid;

    const comments = await Comment.create(req.body);

    res.status(201).json({
        comments
    });
});

// @route   PATCH /:cid/comments
// @desc    Edit comment on post
// @access  Private
router.patch('/:cid/comments', async(req, res) => {
    
});

// @route   DELETE /:cid/comments
// @desc    Delete comment on post
// @access  Private
router.delete('/:cid/comments', async(req, res) => {
    
});

module.exports = router;