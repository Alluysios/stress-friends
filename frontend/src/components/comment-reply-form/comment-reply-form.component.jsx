import React from 'react';
import './comment-reply-form.styles.scss';

import FormButton from '../form-button/form-button.component';
import FormInput from '../form-input/form-input.component';

const CommentReplyForm = ({ show }) => {
    return (
        <form className={`form--reply ${!show && 'hidden'}`}>
            <FormInput 
                type='text'
                id='content'
                name='content'
                placeholder='write a reply...'
            />
        </form>
    )
}

export default CommentReplyForm;