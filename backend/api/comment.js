const express = require('express');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const { protect } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

/*******
 *  baseURL: /posts/:pid
 ********/

 // @route   GET /
// @desc    Get all comments and replies
// @access  Public
router.get('/', async(req, res) => {
    const comments = await Comment.find({}).populate({
        path: 'user replies',
        select: 'firstname lastname image',
        populate: {
            path: 'user',
            select: 'firstname lastname image'
        }
    });

    res.status(200).json({
        comments
    });
});

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
router.delete('/:cid', protect, async(req, res) => {
    const commentId = req.params.cid;
    await Comment.findByIdAndDelete(commentId);

    res.status(204).json(commentId);
});

// @route   PATCH /:cid/reply
// @desc    Reply comment on post
// @access  Private
router.post('/:cid/reply', protect, async(req, res) => {
    // Grab content in req.body
    const userReply = {
        content: req.body.content,
        user: req.user
    }
    // Get comment replies
    const comment = await Comment.findById(req.params.cid);
    const { replies } = comment;

    // push content to replies array
    replies.unshift(userReply);

    await comment.save();

    res.status(201).json({
        reply: userReply
    });
});

// @route   PATCH /:cid/reply
// @desc    Delete reply comment on post
// @access  Private
router.delete('/:cid/reply/:rid', protect, async(req, res) => {
    // Get comment replies
    const comment = await Comment.findById(req.params.cid);
    // return an error if no comment found with that ID
    if(!comment) return res.status(400).json({ errors: [{ msg: "Comment not found" }]});
    const { replies } = comment;

    // Get the reply comment
    const reply = replies.filter(reply => reply._id === req.params.rid);

    // Check if this is the users reply if it doesn't return an error
    if(reply.user === req.user.id) return res.status(400).json({ errors: [{ msg: "You can't delete someones comment" }]});
    
    // Find the index with the user id
    const userIndex = replies.findIndex(reply => reply.user.toString() === req.user.id);
    // return removed reply
    const removed = replies.splice(userIndex, 1);

    await comment.save();

    res.json(removed);
});

// @route   PATCH /:cid/like
// @desc    Like comment on post
// @access  Private
router.patch('/:cid/like', protect, async(req, res) => {
    // Get user
    const user = {
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        _id: req.user.id
    };
    
    // Get comment
    const comment = await Comment.findById(req.params.cid);
    
    // check if user already like the comment
    const { likes } = comment;
    if(likes.includes(req.user._id)) return res.status(400).json({ errors: [{ msg: 'Comment already liked.' }]})

    // push user id to likes
    likes.unshift(user);

    await comment.save();

    res.status(200).json({
        user
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
    const userIndex = likes.findIndex(id => req.user.id === id.toString());
    // Returns the id that's been removed
    const removed = likes.splice(userIndex, 1);

    await comment.save();

    res.status(200).json({
        likes: removed
    });
});

module.exports = router;