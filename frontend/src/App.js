import React, { Fragment, useEffect } from 'react';
import './App.styles.scss';
import { Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';
import store from './store';

import { userLoad } from './actions/auth.action';

import Header from './components/header/header.component';
import Profile from './pages/profile/profile.component';
import Settings from './pages/settings/settings.component';
import SignInSignUp from './pages/signin-signup/signin-signup.component';
import Landing from './pages/landing/landing.component';
import PostView from './components/post-view/post-view.component';
import ProtectedRoute from './components/protected-route/protected-route.component';
import setAuthToken from './utils/setAuthToken';

let token = Cookies.get('token');
if(token) {
    setAuthToken(token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(userLoad());
    }, [])
    return (
        <Fragment>
            <Header />
            <div className="container">
                <Switch>
                    <ProtectedRoute exact path='/' component={Landing} />
                    <ProtectedRoute exact path='/profile' component={Profile} />
                    <ProtectedRoute exact path='/settings' component={Settings} />
                    <Route exact path='/auth' component={SignInSignUp} />
                    <Route exact path='/post/:pid' component={PostView} />
                </Switch>
            </div>
        </Fragment>
    )
}

export default App;