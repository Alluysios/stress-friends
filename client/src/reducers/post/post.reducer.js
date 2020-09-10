import {
    GET_ALL_POSTS,
    GET_POST,
    CREATE_POST,
    EDIT_POST,
    DELETE_POST,
    UPDATE_POST_LIKE,
    GET_ALL_COMMENTS,
    CREATE_COMMENT,
    DELETE_COMMENT,
    UPDATE_COMMENT_LIKES,
    REPLY_ON_COMMENT,
    DELETE_REPLY,
    UPDATE_REPLY_LIKES,
    POST_ERROR
} from '../../actions/types';

const INITIAL_STATE = {
    post: null,
    posts: [],
    comments: [],
    loading: true,
    errors: []
}

export default (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch(type) {
        case GET_ALL_POSTS: 
            return {
                ...state,
                posts: payload.posts,
                loading: false
            }
        case GET_POST: 
            return {
                ...state,
                post: payload.post,
                loading: false
            }
        case CREATE_POST: 
            return {
                ...state,
                posts: [payload.post, ...state.posts],
                loading: false
            }
        case EDIT_POST:
            return {
                ...state,
                post: payload.post,
                loading: false
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload),
                loading: false
            }
        case UPDATE_POST_LIKE:
            return {
                ...state,
                posts: state.posts.map(post => post.id === payload.pid ? { ...post, likes: payload.likes.post } : post),
                loading: false
            }
        case GET_ALL_COMMENTS: 
            return {
                ...state,
                comments: payload.comments,
                postComments: {
                    replies: payload.reply
                },
                loading: false
            }
        case CREATE_COMMENT:
            return {
                ...state,
                comments: [...state.comments, payload.comments],
                loading: false
            }
        case DELETE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter(comment => comment._id !== payload.cid),
                loading: false
            }
        case UPDATE_COMMENT_LIKES:
            return {
                ...state,
                comments: state.comments.map(comment => comment._id === payload.cid ? { ...comment, likes: payload.likes.comment } : comment),
                loading: false
            }
        case REPLY_ON_COMMENT:
            return {
                ...state,
                comments: state.comments.map(comment => comment._id === payload.cid ? { ...comment, replies: payload.comment.reply } : comment),
                loading: false
            }
        case DELETE_REPLY:
            const deleteReply = (comment) => comment.replies.filter(reply => reply._id !== payload.rid);
            return {
                ...state,
                comments: state.comments.map(comment => comment._id === payload.cid ? {...comment, replies: deleteReply(comment) } : comment),
                loading: false
            }
        case UPDATE_REPLY_LIKES:
            const updateReply = (comment) => {
                if(comment._id === payload.cid) {
                    return comment.replies.map(reply => reply._id === payload.rid ? { ...reply, likes: payload.likes.reply } : reply);
                } else {
                    return comment;
                }
            }
            return {
                ...state,
                comments: state.comments.map(comment => comment._id === payload.cid ? {...comment, replies: updateReply(comment) } : comment),
                loading: false
            }
        case POST_ERROR:
            return {
                ...state,
                errors: payload
            }
        default:
            return state;
    }
}
