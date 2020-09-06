import React, { Fragment } from 'react';
import './App.styles.scss';
import { Route, Switch } from 'react-router-dom';

import Header from './components/header/header.component';
import Posts from './pages/posts/posts.component';
import Account from './pages/profile/profile.component';
import Settings from './pages/settings/settings.component';
import SignInSignUp from './pages/signin-signup/signin-signup.component';

const App = () => {
    return (
        <Fragment>
            <Header />
            <div className="container">
                <Switch>
                    <Route exact path='/' component={Posts} />
                    <Route path='/account' component={Account} />
                    <Route path='/settings' component={Settings} />
                    <Route path='/signin' component={SignInSignUp} />
                </Switch>
            </div>
        </Fragment>
    )
}

export default App;