import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import './signup.styles.scss';

// Components
import FormButton from '../form-button/form-button.component';
import FormInput from '../form-input/form-input.component';

// Actions
import { signUp } from '../../actions/auth.action';

const SignUp = ({ signUp }) => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });

    const handleInput = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        signUp(formData);
    }

    return (
        <Fragment>
            <form className='form-signup' onSubmit={handleSubmit}>
                <FormInput 
                    type='text'
                    name='firstname'
                    id='firstname'
                    label='Firstname'
                    placeholder='John'
                    onChange={handleInput}
                />
                <FormInput 
                    type='text'
                    name='lastname'
                    id='lastname'
                    label='Lastname'
                    placeholder='Doe'
                    onChange={handleInput}
                />
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
                <FormInput 
                    type='password'
                    name='passwordConfirm'
                    id='passwordConfirm'
                    label='Password Confirm'
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
    );
}

export default connect(null, { signUp })(SignUp);
