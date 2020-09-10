import React from 'react';
import './settings.styles.scss';

import UpdateProfileForm from '../../components/update-profile-form/update-profile-form.component';
import UpdatePasswordForm from '../../components/update-password-form/update-password-form.component';

const Settings = () => {
    return (
        <div className='setting'>
            <div className='setting-info'>
                <UpdateProfileForm />
            </div>
            <div className='setting-password'>
                <UpdatePasswordForm />
            </div>
        </div>
    )
}

export default Settings;
