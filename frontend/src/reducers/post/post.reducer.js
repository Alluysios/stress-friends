import {
    GET_ALL_POSTS,
    GET_POST,
    CREATE_POST,
    EDIT_POST,
    DELETE_POST,
    LIKE_POST,
    UNLIKE_POST,
    GET_ALL_COMMENTS,
    CREATE_COMMENT,
    GET_COMMENTS_ON_POST,
    LIKE_COMMENT,
    UNLIKE_COMMENT,
    REPLY_ON_COMMENT,
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
                posts: state.posts.filter(post => post._id !== payload.pid),
                loading: false
            }
        case LIKE_POST:
            const posts = state.posts.map(post => post.id == payload.user.post ? { ...post, likes: [...post.likes, payload.user._id] } : post)
            return {
                ...state,
                posts: posts,
                loading: false
            }
        case GET_ALL_COMMENTS: 
            return {
                ...state,
                comments: payload.comments,
                postComments: {
                    comments: payload.comments,
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
        case REPLY_ON_COMMENT:
            return {
                ...state,
                replies: [...state.replies, payload.replies],
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
