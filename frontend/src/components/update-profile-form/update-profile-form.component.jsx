import React, { useState } from 'react';
import { connect } from 'react-redux';

import { updateProfile } from '../../actions/auth.action';

import FormButton from '../form-button/form-button.component';
import FormInput from '../form-input/form-input.component';

const AccountInfoForm = ({ updateProfile }) => {
    
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: ''
    });
    
    const handleInput = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        updateProfile(formData)
    }

    return (
        <form className='form-info' onSubmit={handleSubmit}>
            <h2>Account Info</h2>
            <FormInput 
                type='text'
                name='firstname'
                id='firstname'
                label='Firstname'
                onChange={handleInput}
            />
            <FormInput 
                type='text'
                name='lastname'
                id='lastname'
                label='Lastname'
                onChange={handleInput}
            />
            <FormInput 
                type='email'
                name='email'
                id='email'
                label='Email'
                onChange={handleInput}
            />
            <FormButton 
                value='Update Account'
                btnClass='primary'
            />
        </form>
    )
}

export default connect(null, {updateProfile})(AccountInfoForm);
