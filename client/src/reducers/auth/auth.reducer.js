import {
    USER_LOADED,
    SIGN_IN,
    SIGN_OUT,
    SIGN_UP,
    CHANGED_PASSWORD,
    UPDATE_PROFILE,
    AUTH_ERROR
} from '../../actions/types';

import Cookies from 'js-cookie';

const INITIAL_STATE = {
    user: null,
    isAuthenticated: false,
    loading: true,
    token: !Cookies.get('token') && null,
    errors: null
}

export default (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch(type) {
        case USER_LOADED:
            return {
                ...state,
                user: payload.user,
                isAuthenticated: true,
                loading: false,
            }
        case SIGN_IN: 
        case SIGN_UP:
            Cookies.set('token', payload.token)
            return {
                ...state,
                user: payload.user,
                isAuthenticated: true,
                loading: false,
            }
        case SIGN_OUT: {
            Cookies.remove('token', { path: '' });
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                token: null,
                loading: false
            }
        }
        case CHANGED_PASSWORD:
        case UPDATE_PROFILE: 
            return {
                ...state,
                user: payload.user,
                loading: false
            }
        case AUTH_ERROR: 
            return {
                ...state,
                errors: payload
            }
        default:
            return state;
    }
}