import React, { Fragment } from 'react';
import './signup.styles.scss';

import FormButton from '../form-button/form-button.component';
import FormInput from '../form-input/form-input.component';

const SignUp = () => {
    return (
        <Fragment>
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
                <FormButton 
                    value='Sign In'
                    btnClass='primary'
                />
        </Fragment>
    )
}

export default SignUp;
