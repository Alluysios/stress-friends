import { combineReducers } from 'redux';

import post from './post/post.reducer';
import auth from './auth/auth.reducer';

export default combineReducers({
    post,
    auth
});