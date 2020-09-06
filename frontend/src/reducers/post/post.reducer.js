import {
    GET_ALL_POSTS,
    GET_POST,
    CREATE_POST,
    EDIT_POST,
    DELETE_POST,
    LIKE_POST,
    UNLIKE_POST,
    CREATE_COMMENT,
    GET_COMMENTS_ON_POST,
    LIKE_COMMENT,
    UNLIKE_COMMENT,
    REPLY_COMMENT_ON_POST,
    POST_ERROR
} from '../../actions/types';

const INITIAL_STATE = {
    post: null,
    posts: [],
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
                posts: [...state.posts, payload.post],
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
        case POST_ERROR:
            return {
                ...state,
                errors: payload
            }
        default:
            return state;
    }
}
