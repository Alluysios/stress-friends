import React, { Fragment } from 'react';
import './signin.styles.scss';

import FormButton from '../form-button/form-button.component';
import FormInput from '../form-input/form-input.component';

const SignIn = () => {
    return (
        <Fragment>
            <form className='form-signin'>
                <FormInput 
                    type='text'
                    name='firstname'
                    id='firstname'
                    label='Firstname'
                    placeholder='John'
                />
                <FormInput 
                    type='text'
                    name='lastname'
                    id='lastname'
                    label='Lastname'
                    placeholder='Doe'
                />
                <FormInput 
                    type='email'
                    name='email'
                    id='email'
                    label='Email'
                    placeholder='johndoe@example.com'
                />
                <FormInput 
                    type='password'
                    name='password'
                    id='password'
                    label='Password'
                    placeholder='********'
                />
                <FormInput 
                    type='password'
                    name='passwordConfirm'
                    id='passwordConfirm'
                    label='Password Confirm'
                    placeholder='********'
                />
                <FormButton 
                    value='Sign In'
                    btnClass='primary'
                />
            </form>
        </Fragment>
    )
}

export default SignIn;
