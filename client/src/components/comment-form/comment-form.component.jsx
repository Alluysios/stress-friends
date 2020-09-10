import React, { useState } from 'react';
import { connect } from 'react-redux';
import './comment-form.styles.scss';

import FormInput from '../form-input/form-input.component';

import { createComment } from '../../actions/posts.action';

const CommentForm = ({ createComment, pid }) => {
    /* match.params.pid = postId */

    const [formData, setFormData] = useState({
        content: ''
    });
    const handleInput = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    
    const handleSubmit = e => {
        setFormData({ ...formData, content: '' });
        e.preventDefault();
        createComment(formData, pid);
    }

    return (
        <form className='form-comment' onSubmit={handleSubmit}>
            <FormInput 
                type='text'
                name='content'
                id='content'
                placeholder='Write a comment...'
                value={formData.content}
                onChange={handleInput}
            />
        </form>
    )
}

export default connect(null, { createComment })(CommentForm)
