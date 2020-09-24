import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './signin-signup.styles.scss';
import backgroundImg from './happy.jpg';

// Components
import SignUp from '../../components/signup/signup.component';
import SignIn from '../../components/signin/signin.component';
import ToastMessage from '../../components/toast-message/toast-message.component.jsx';

const SignInSignUp = ({ auth }) => {
    const [toggleBtn, setToggleBtn] = useState(true);

    return (
        <Fragment>
            {
                auth.isAuthenticated ? <Redirect to='/' /> :
                <Fragment>
                    <div className="flex-container">
                        <div className="image-container">
                            <h1 className='moto'>“Friendship is the hardest thing in the world to explain. It’s not something you learn in school. But if you haven’t learned the meaning of friendship, you really haven’t learned anything.”</h1>
                            <img src={backgroundImg} className='background-image'alt='Friends gathering together to see the stars' />
                        </div>
                        <div className="auth">
                            <p>
                                Use this account or Sign Up!
                                <span className='test'> email: <strong>test@gmail.com</strong></span>
                                <span className='test'> password: <strong>password123</strong></span>
                            </p>
                            <div className="group-link">
                                <span onClick={() => setToggleBtn(true)} className='auth-toggle auth-toggle-signin'> Sign In? </span>
                                <span onClick={() => setToggleBtn(false)} className='auth-toggle auth-toggle-signup'> Sign Up? </span>
                            </div>
                            { auth.errors !== null ? <ToastMessage msg={auth.errors} /> : null }
                            {
                                toggleBtn ? <SignIn /> : <SignUp />
                            }
                        </div>
                    </div>
                </Fragment>
            }
        </Fragment>
            
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(SignInSignUp);
