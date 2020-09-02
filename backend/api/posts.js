const express = require('express');
const Post = require('../models/Post');
const { protect } = require('../middleware/auth');
const commentRouter = require('./comment');

const router = express.Router();

// use comment router if it encounter a route like /:pid/comments
router.use('/:pid/comments', commentRouter);

// @route   GET /
// @desc    Get all Posts
// @access  Private
router.get('/', protect, async (req, res) => {
    const posts = await Post.find({}).populate('comments');

    res.status(200).json({
        posts
    });
});

// @route   POST /
// @desc    Create Post
// @access  Private
router.post('/', protect, async (req, res) => {
    const posts = await Post.create(req.body);

    res.status(201).json({
        posts
    });
});

// @route   PATCH /
// @desc    Edit Post
// @access  Private
router.patch('/:pid', protect, async (req, res) => {
    const posts = await Post.findByIdAndUpdate(req.params.pid, req.body, {
        new: true
    });

    res.status(200).json({
        posts
    });
});

// @route   DELETE /
// @desc    Delete Post
// @access  Private
router.delete('/:pid', protect, async (req, res) => {
    await Post.findByIdAndDelete(req.params.pid);

    res.status(204).json();
});

// @route   PATCH /:pid
// @desc    Like a post
// @access  Private
router.patch('/:pid/like', protect, async (req, res) => {
    // Get the post
    const post = await Post.findById(req.params.pid);
    const { likes } = post;
    // Return an error message if post already like
    if(likes.includes(req.user.id)) return res.status(400).json({ errors: [{ msg: 'You already liked this post.' }]})
    // Push the user id and save
    likes.unshift(req.user.id);
    await post.save();

    res.status(200).json({
        post
    });
});

// @route   PATCH /:pid
// @desc    Unlike a post
// @access  Private
router.patch('/:pid/unlike', protect, async (req, res) => {
    // Get the post
    const post = await Post.findById(req.params.pid);
    const { likes } = post;

    // Find the user index
    const userIndex = likes.findIndex(id => req.user.id === id);
    // Remove user from likes
    likes.splice(userIndex, 1);

    await post.save();
    res.status(200).json({
        post
    });
});

module.exports = router;