const express = require('express');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const { protect } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

/*******
 *  baseURL: /posts/:pid
 ********/

// @route   GET /
// @desc    Get all comments on posts
// @access  Public
router.get('/', async(req, res) => {
    const post = await Post.findById(req.params.pid).populate('comments');
    const { comments } = post;
    res.status(200).json({
        comments
    });
});

// @route   POST /
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

// @route   PATCH /
// @desc    Edit comment on post
// @access  Private
router.patch('/:cid', protect, async(req, res) => {
    const comment = await Comment.findByIdAndUpdate(req.params.cid, req.body, {
        new: true
    });

    res.status(200).json({
        comment
    });
});

// @route   DELETE /:pid/comments
// @desc    Delete comment on post
// @access  Private
router.delete('/', protect, async(req, res) => {
    console.log('hello');
    await Comment.findByIdAndDelete(req.params.pid);

    res.status(204).json();
});

// @route   PATCH /:cid/like
// @desc    Like comment on post
// @access  Private
router.patch('/:cid/like', protect, async(req, res) => {
    // Get comment
    const comment = await Comment.findById(req.params.cid);
    
    // check if user already like the comment
    const { likes } = comment;
    if(likes.includes(req.user._id)) return res.status(400).json({ errors: [{ msg: 'Comment already liked.' }]})

    // push user id to likes
    likes.unshift(req.user);

    await comment.save();

    res.status(200).json({
        comment
    });
});

// @route   PATCH /:cid/unlike
// @desc    Unlike comment on post
// @access  Private
router.delete('/:cid/unlike', protect, async(req, res) => {
    // Get comment likes
    const comment = await Comment.findById(req.params.cid);
    const { likes } = comment;
    
    // find the index and remove from the array
    const userIndex = likes.findIndex(id => req.user.id === id);
    likes.splice(userIndex, 1);

    await comment.save();

    res.status(200).json({
        comment
    });
});

module.exports = router;