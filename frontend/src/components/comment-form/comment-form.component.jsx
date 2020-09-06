import React from 'react';
import './comment-form.styles.scss';

import FormInput from '../form-input/form-input.component';
import FormButton from '../form-button/form-button.component';

const CommentForm = () => {
    return (
        <form className='form-comment'>
            <FormInput 
                type='text'
                name='content'
                id='content'
                placeholder='Write a comment...'
            />
            <FormButton 
                value='comment'
                btnClass='primary'
            />
        </form>
    )
}

export default CommentForm
