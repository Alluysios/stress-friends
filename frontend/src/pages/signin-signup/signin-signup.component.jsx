import React, { Fragment, useState } from 'react';
import './signin-signup.styles.scss';
import backgroundImage from './happy.jpg';

import SignUp from '../../components/signup/signup.component';
import SignIn from '../../components/signin/signin.component';

const SignInSignUp = () => {
    const [toggleBtn, setToggleBtn] = useState(false);
    return (
        <Fragment>
            <div className="flex-container">
                
                <div className="image-container">
                    <h1 className='moto'>“Friendship is the hardest thing in the world to explain. It’s not something you learn in school. But if you haven’t learned the meaning of friendship, you really haven’t learned anything.”</h1>
                    <img src={backgroundImage} alt="background image" className='background-image'/>
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
                    {
                        toggleBtn ? <SignUp /> : <SignIn />
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default SignInSignUp;
