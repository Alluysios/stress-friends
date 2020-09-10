import axios from 'axios';

import {
    GET_ALL_POSTS,
    GET_POST,
    CREATE_POST,
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
        const res = await axios.get(`/api/v1/posts/${pid}`);
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
        await axios.delete(`/api/v1/posts/${pid}`);
        dispatch({ type: DELETE_POST, payload: pid  });
    } catch (err) {
        console.log(err);
    }
}

// UPDATE POST LIKES
export const updatePostLike = (pid) => async dispatch => {
    try {
        const res = await axios.patch(`/api/v1/posts/${pid}/like`);
        dispatch({ type: UPDATE_POST_LIKE, payload: {  pid, likes: res.data } });
    } catch (err) {
        const errors = err.response.data.errors;
        dispatch({ type: POST_ERROR, payload: errors });
    }
}

// GET ALL COMMENTS
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
        dispatch({ type: CREATE_COMMENT, payload: res.data });
    } catch (err) {
        const errors = err.response.data.errors;
        dispatch({ type: POST_ERROR, payload: errors });
    }
}

// UPDATE COMMENT LIKES
export const updateCommentLike = (cid) => async dispatch => {
    try {
        const res = await axios.patch(`/api/v1/comments/${cid}/like`);
        dispatch({ type: UPDATE_COMMENT_LIKES, payload: { cid, likes: res.data } });
    } catch (err) {
        const errors = err.response.data.errors;
        dispatch({ type: POST_ERROR, payload: errors });
    }
}

// DELETE SINGLE COMMENT
export const deleteComment = (pid, cid) => async dispatch => {
    try {
        await axios.delete(`/api/v1/posts/${pid}/comments/${cid}`);
        dispatch({ type: DELETE_COMMENT, payload: { cid }  });
    } catch (err) {
        console.log(err);
    }
}


// CREATE COMMENT
export const createReply = (formData, pid, cid) => async dispatch => {
    try {
        const res = await axios.post(`/api/v1/posts/${pid}/comments/${cid}/reply`, formData);
        dispatch({ type: REPLY_ON_COMMENT, payload: { cid, comment: res.data } });
    } catch (err) {
        
    }
}

// UPDATE COMMENT LIKES
export const updateReplyLike = (cid, rid) => async dispatch => {
    try {
        const res = await axios.patch(`/api/v1/comments/${cid}/reply/${rid}/like`);
        dispatch({ type: UPDATE_REPLY_LIKES, payload: { cid, rid, likes: res.data } });
    } catch (err) {
        const errors = err.response.data.errors;
        dispatch({ type: POST_ERROR, payload: errors });
    }
}

// DELETE SINGLE COMMENT
export const deleteReply = (cid, rid, pid) => async dispatch => {
    try {
        await axios.delete(`/api/v1/posts/${pid}/comments/${cid}/reply/${rid}`);
        dispatch({ type: DELETE_REPLY, payload: { pid, cid, rid }  });
    } catch (err) {
        console.log(err);
    }
}