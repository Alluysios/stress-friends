import React, { useState } from 'react';
import { connect } from 'react-redux';
import './comment-reply-form.styles.scss';

import FormInput from '../form-input/form-input.component';

import { createReply } from '../../actions/posts.action';

const CommentReplyForm = ({ show, createReply, cid, pid }) => {
    const [formData, setFormData] = useState({
        content: ''
    });

    const handleInput = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        setFormData({ ...formData, content: '' });
        createReply(formData, pid, cid);
    }

    return (
        <form className={`form--reply ${!show && 'hidden'}`} onSubmit={handleSubmit}>
            <FormInput 
                type='text'
                id='content'
                name='content'
                placeholder='write a reply...'
                value={formData.content}
                onChange={handleInput}
            />
        </form>
    )
}

export default connect(null, { createReply })(CommentReplyForm);