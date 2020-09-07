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
    GET_ALL_COMMENTS,
    CREATE_COMMENT,
    GET_COMMENTS_ON_POST,
    LIKE_COMMENT,
    UNLIKE_COMMENT,
    REPLY_COMMENT_ON_POST,
    POST_ERROR
} from './types';

// GET ALL POSTS
export const getAllPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/v1/posts');
        dispatch({ type: GET_ALL_POSTS, payload: res.data });
    } catch (err) {
        const errors = err.response.data.errors;
        dispatch({ type: POST_ERROR, payload: errors });
    }
}

// GET SINGLE POST
export const getPost = (pid) => async dispatch => {
    try {
        const res = await axios.post('/api/v1/posts/', null, {
            params: {
                pid
            }
        });
        dispatch({ type: GET_POST, payload: res.data });
    } catch (err) {
        const errors = err.response.data.errors;
        dispatch({ type: POST_ERROR, payload: errors });
    }
}

// CREATE POST
export const createPost = (formData) => async dispatch => {
    try {
        const res = await axios.post('/api/v1/posts', formData);
        dispatch({ type: CREATE_POST, payload: res.data });
    } catch (err) {
        const errors = err.response.data.errors;
        dispatch({ type: POST_ERROR, payload: errors });
    }
}

// DELETE SINGLE POST
export const deletePost = (pid) => async dispatch => {
    try {
        const res = await axios.post('/api/v1/posts/', null, {
            params: {
                pid
            }
        });
        dispatch({ type: DELETE_POST, payload: res.data });
    } catch (err) {
        const errors = err.response.data.errors;
        dispatch({ type: POST_ERROR, payload: errors });
    }
}


// LIKE COMMENT
export const likePost = (pid) => async dispatch => {
    try {
        const res = await axios.patch(`/api/v1/posts/${pid}/like`);
        dispatch({ type: LIKE_POST, payload: res.data });
        console.log('its working!');
    } catch (err) {
        const errors = err.response.data.errors;
        dispatch({ type: POST_ERROR, payload: errors });
    }
}

// UNLIKE COMMENT
export const unlikePost = (formData, pid) => async dispatch => {
    try {
        const res = await axios.post(`/api/v1/posts/${pid}/comments`, formData);
        dispatch({ type: CREATE_COMMENT, payload: res.data });
    } catch (err) {
        const errors = err.response.data.errors;
        dispatch({ type: POST_ERROR, payload: errors });
    }
}

// CREATE COMMENT
export const getAllComments = () => async dispatch => {
    try {
        const res = await axios.get(`/api/v1/comments`);
        dispatch({ type: GET_ALL_COMMENTS, payload: res.data });
    } catch (err) {
        const errors = err.response.data.errors;
        dispatch({ type: POST_ERROR, payload: errors });
    }
}

// CREATE COMMENT
export const createComment = (formData, pid) => async dispatch => {
    try {
        const res = await axios.post(`/api/v1/posts/${pid}/comments`, formData);
        console.log(res.data);
        dispatch({ type: CREATE_COMMENT, payload: res.data });
    } catch (err) {
        const errors = err.response;
        dispatch({ type: POST_ERROR, payload: errors });
    }
}
