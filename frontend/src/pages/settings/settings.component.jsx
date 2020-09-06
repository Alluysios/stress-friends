import React, { Fragment } from 'react';
import './settings.styles.scss';

import FormButton from '../../components/form-button/form-button.component';
import FormInput from '../../components/form-input/form-input.component';

const Settings = () => {
    return (
        <div className='setting'>
            <div className='setting-info'>
                <form className='form-info'>
                    <h2>Account Info</h2>
                    <FormInput 
                        type='text'
                        name='firstname'
                        id='firstname'
                        label='Firstname'
                    />
                    <FormInput 
                        type='text'
                        name='lastname'
                        id='lastname'
                        label='Lastname'
                    />
                    <FormInput 
                        type='email'
                        name='email'
                        id='email'
                        label='Email'
                    />
                    <FormButton 
                        value='Update Account'
                        btnClass='primary'
                    />
                </form>
            </div>
            <div className='setting-password'>
                <form className='form-password'>
                    <hr className="divider"/>
                    <h2>Change Password</h2>
                    <FormInput 
                        type='password'
                        name='currentPassword'
                        id='currentPassword'
                        label='Current Password'
                    />
                    <FormInput 
                        type='password'
                        name='newPassword'
                        id='newPassword'
                        label='New Password'
                    />
                    <FormInput 
                        type='password'
                        name='passwordConfirm'
                        id='passwordConfirm'
                        label='Confirm Password'
                    />
                    <FormButton 
                        value='Change Password'
                        btnClass='primary'
                    />
                </form>
            </div>
        </div>
    )
}

export default Settings;
