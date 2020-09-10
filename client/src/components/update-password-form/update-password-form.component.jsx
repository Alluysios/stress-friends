import React, { useState } from 'react';
import { connect } from 'react-redux';

import { changedPassword } from '../../actions/auth.action';

import FormButton from '../form-button/form-button.component';
import FormInput from '../form-input/form-input.component';

const UpdatePasswordForm = ({ changedPassword }) => {

    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        passwordConfirm: ''
    });
    
    const handleInput = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        changedPassword(formData);
    }

    return (
        <form className='form-password' onSubmit={handleSubmit}>
            <hr className="divider"/>
            <h2>Change Password</h2>
            <FormInput 
                type='password'
                name='currentPassword'
                id='currentPassword'
                placeholder="********"
                label='Current Password'
                onChange={handleInput}
            />
            <FormInput 
                type='password'
                name='newPassword'
                id='newPassword'
                label='New Password'
                placeholder="********"
                onChange={handleInput}
            />
            <FormInput 
                type='password'
                name='passwordConfirm'
                id='passwordConfirm'
                label='Confirm Password'
                placeholder="********"
                onChange={handleInput}
            />
            <FormButton 
                value='Change Password'
                btnClass='primary'
            />
        </form>
    )
}

export default connect(null, {changedPassword})(UpdatePasswordForm);
