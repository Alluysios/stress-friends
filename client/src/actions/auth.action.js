import axios from 'axios';
import Cookies from 'js-cookie';
import setAuthToken from '../utils/setAuthToken';

import {
    USER_LOADED,
    SIGN_IN,
    SIGN_OUT,
    SIGN_UP,
    CHANGED_PASSWORD,
    UPDATE_PROFILE,
    AUTH_ERROR
} from './types';


export const userLoad = () => async dispatch => {
    const token = Cookies.get('token');
    if(token) {
        setAuthToken(token);
    }

    try {
        const res = await axios.get('/api/v1/auth');
        dispatch({ type: USER_LOADED, payload: res.data })
    } catch (err) {
        const errors = err.response.data.errors;
        dispatch({ type: AUTH_ERROR, payload: errors });
    }
}

export const signIn = (formData, history) => async dispatch => {
    try {
        const res = await axios.post('/api/v1/auth/signIn', formData);
        dispatch({ type: SIGN_IN, payload: res.data });
        dispatch(userLoad());
        if(res.status === 200) history.push('/');
    } catch (err) {
        const errors = err.response.data.errors;
        dispatch({ type: AUTH_ERROR, payload: errors });
    }
}

export const signUp = (formData, history) => async dispatch => {
    try {
        const res = await axios.post('/api/v1/auth/signUp', formData);
        dispatch({ type: SIGN_UP, payload: res.data });
        dispatch(userLoad());
        if(res.status === 200) history.push('/');
    } catch (err) {
        const errors = err.response.data.errors;
        dispatch({ type: AUTH_ERROR, payload: errors });
    }
}

export const signOut = () => dispatch => {
    dispatch({ type: SIGN_OUT });
}

export const updateProfile = formData => async dispatch => {
    try {
        const res = await axios.patch('/api/v1/users/updateProfile', formData);
        dispatch({ type: UPDATE_PROFILE, payload: res.data })
        dispatch({ type: 'PROFILE_UPDATED', payload: 'Profile updated!' });
    } catch (err) {
        const errors = err.response.data.errors;
        dispatch({ type: AUTH_ERROR, payload: errors });
    }
}

export const changedPassword = formData => async dispatch => {
    try {
        const res = await axios.patch('/api/v1/users/changePassword', formData);
        dispatch({ type: CHANGED_PASSWORD, payload: res.data })
        dispatch({ type: 'PASSWORD_UPDATED', payload: 'Password updated!' });
    } catch (err) {
        const errors = err.response.data.errors;
        dispatch({ type: AUTH_ERROR, payload: errors });
    }
}