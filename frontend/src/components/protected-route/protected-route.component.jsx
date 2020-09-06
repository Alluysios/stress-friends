import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = ({ component: Component, auth, ...rest}) => {
    {/* if authenticated render the component or else redirect to auth */}
    return <Route 
        {...rest}
        render={props => (
            auth.isAuthenticated ?
            <Component {...props} />
            :
            <Redirect to='auth' />
        )}
    />
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(ProtectedRoute);
