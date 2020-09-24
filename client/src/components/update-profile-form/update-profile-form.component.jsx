import React, { useState } from 'react';
import { connect } from 'react-redux';

import { updateProfile } from '../../actions/auth.action';

import FormButton from '../form-button/form-button.component';
import FormInput from '../form-input/form-input.component';
import ToastMessage from '../toast-message/toast-message.component';

const AccountInfoForm = ({ updateProfile, auth: { errors, user, success } }) => {
    const [formData, setFormData] = useState({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        hobby: user.hobby,
        bio: user.bio,
        image: user.image
    });

    const { firstname, lastname, email, image, bio, hobby } = formData;
    
    const handleInput = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        const profileFormData = new FormData();
        profileFormData.append('firstname', firstname);
        profileFormData.append('lastname', lastname);
        profileFormData.append('email', email);
        profileFormData.append('bio', bio);
        profileFormData.append('hobby', hobby);
        profileFormData.append('image', image);
        
        updateProfile(profileFormData)
    }

    const handleFileChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] })
    }

    return (
        <form className='form-info' onSubmit={handleSubmit}>
            <h2>Account Info</h2>
            { errors.err && errors.type === 'profile' ? <ToastMessage msg={errors.err} /> : null }
            { success ? <ToastMessage msg={success} /> : null }
            <FormInput 
                type='text'
                name='firstname'
                id='firstname'
                label='Firstname'
                value={firstname}
                fullWidth={true}
                onChange={handleInput}
            />
            <FormInput 
                type='text'
                name='lastname'
                id='lastname'
                label='Lastname'
                value={lastname}
                fullWidth={true}
                onChange={handleInput}
            />
            <FormInput 
                type='email'
                name='email'
                id='email'
                label='Email'
                value={email}
                fullWidth={true}
                onChange={handleInput}
            />
            <FormInput 
                type='text'
                name='hobby'
                id='hobby'
                label='Hobby'
                placeholder='Make people laugh.....'
                value={hobby}
                fullWidth={true}
                onChange={handleInput}
            />
            <FormInput 
                type='text'
                name='bio'
                id='bio'
                label='Bio'
                placeholder='I always hope for a better world.....'
                value={bio}
                fullWidth={true}
                onChange={handleInput}
            />
            <FormInput 
                type='file'
                name='image'
                id='image'
                image={image}
                label='Profile Image'
                onChange={handleFileChange}
            />
            <FormButton 
                value='Update Account'
                btnClass='primary'
            />
        </form>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {updateProfile})(AccountInfoForm);
