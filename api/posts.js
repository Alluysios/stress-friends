const express = require('express');
const Post = require('../models/Post');
const { protect } = require('../middleware/auth');
const { resizeUploadedImages, uploadImages } = require('../middleware/uploader');
const commentRouter = require('./comment');

const router = express.Router();

// use comment router if it encounter a route like /:pid/comments
router.use('/:pid/comments', commentRouter);

// @route   GET /
// @desc    Get all Posts
// @access  Private
router.get('/', protect, async (req, res) => {
    const posts = await Post.find({}).populate({
        path: 'comments',
        populate: {
            path: 'user replies',
            select: 'firstname lastname image',
            populate: {
                path: 'user',
                select: 'firstname lastname image'
            }
        }
    }).populate({ path: 'user', select:'firstname lastname image' }).sort({ date: -1 });

    res.status(200).json({
        posts
    });
});

// @route   GET /
// @desc    Get Post by id
// @access  Private
router.get('/:pid', protect, async (req, res) => {
    const post = await Post.findById(req.params.pid).populate({
        path: 'comments',
        populate: {
            path: 'user replies',
            select: 'firstname lastname image',
            populate: {
                path: 'user',
                select: 'firstname lastname image'
            }
        }
    }).populate({ path: 'user', select:'firstname lastname image' }).sort({ date: -1 });
    res.status(200).json({
        post
    });
});


// @route   POST /
// @desc    Create Post
// @access  Private
router.post('/', 
    protect, 
    uploadImages,
    resizeUploadedImages,
    async (req, res) => {
    console.log(req.body);
    // Insert user to body
    if(!req.body.user) req.body.user = req.user; 

    // Create post
    const post = await Post.create(req.body);

    res.status(201).json({
        post
    });
});

// @route   PATCH /
// @desc    Edit Post
// @access  Private
router.patch('/:pid', protect, async (req, res) => {
    const post = await Post.findById(req.params.pid);
    if(post.user.toString() !== req.user._id.toString()) return res.status(401).json({ errors: [{ msg: 'You don\'t have the permission to perform the action' }]});

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
    const post = await Post.findById(req.params.pid);
    if(post.user.toString() !== req.user._id.toString()) return res.status(401).json({ errors: [{ msg: 'You don\'t have the permission to perform the action' }]});

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

    const user = {
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        post: post._id,
        _id: req.user.id
    };

    // Find the user index
    const userIndex = likes.findIndex(id => user._id === id.toString());

    // Check if user like else remove them from the array.
    likes.includes(req.user.id) ? likes.splice(userIndex, 1) : likes.unshift(user);
    
    await post.save();
    res.status(200).json({
        post: post.likes
    });
});


module.exports = router;