const mongoose = require('mongoose');
const User = require('./User');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    replies: [
        {
            content: String,
            date: {
                type: Date,
                default: Date.now
            },
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User'
            }
        }
    ],
    likes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ],
    post: {
        type: mongoose.Schema.ObjectId,
        ref: 'Post'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;