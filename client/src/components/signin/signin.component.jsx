import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './signin.styles.scss';

import FormButton from '../form-button/form-button.component';
import FormInput from '../form-input/form-input.component';

// Actions
import { signIn } from '../../actions/auth.action';

const SignIn = ({ signIn, history }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    const handleInput = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        signIn(formData, history);
    }

    return (
        <Fragment>
            <form className='form-signIn' onSubmit={handleSubmit}>
                <FormInput 
                    type='email'
                    name='email'
                    id='email'
                    label='Email'
                    placeholder='johndoe@example.com'
                    onChange={handleInput}
                />
                <FormInput 
                    type='password'
                    name='password'
                    id='password'
                    label='Password'
                    placeholder='********'
                    onChange={handleInput}
                />
                <FormButton 
                    value='Sign In'
                    btnClass='primary'
                    fluid={true}
                />
            </form>
        </Fragment>
    )
}

export default withRouter(connect(null, { signIn })(SignIn));
