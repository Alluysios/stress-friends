const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    images: [String],
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
    date: {
        type: Date,
        default: Date.now
    }
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

postSchema.virtual('comments', {
    // Name of the model
    ref: 'Comment',
    // field names
    foreignField: 'post',
    localField: '_id'
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;