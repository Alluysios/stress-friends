import axios from 'axios';

import {
    GET_ALL_POSTS,
    GET_ALL_POSTS_ON_USER,
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
} from './types';

export const getAllPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/v1/posts');
        dispatch({ type: GET_ALL_POSTS, payload: res.data })
    } catch (err) {
        const errors = err.response.data.errors;
        dispatch({ type: POST_ERROR, payload: errors });
    }
}

export const getAllUserPosts = () => dispatch => {
    try {
        
    } catch (err) {
        
    }
}