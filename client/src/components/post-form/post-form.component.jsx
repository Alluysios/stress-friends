import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import './post-form.styles.scss';

import { createPost } from '../../actions/posts.action';

import FormButton from '../form-button/form-button.component';

const PostForm = ({ createPost }) => {
    const [formData, setFormData] = useState({
        content: '',
        images: []
    });

    const handleInput = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    
    const handleSubmit = e => {
        const postFormData = new FormData();
        postFormData.append('content', formData.content);
        for(const key of Object.keys(formData.images)) {
            postFormData.append('images', formData.images[key])
        }
        e.preventDefault();
        createPost(postFormData);
    }

    const handleFileChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.files })
    }

    return (
        <Fragment>
            <form className='form' onSubmit={handleSubmit}>
                <div className="form-group-container">
                    <textarea name="content" id="content" className="content" placeholder="Write something..." onChange={handleInput}></textarea>
                    <div className="group-buttons">
                        <input type="file" name='images' className='file' onChange={handleFileChange} multiple />
                        <FormButton 
                            value='Post'
                            btnClass='primary'
                        />
                    </div>
                </div>
            </form>  
        </Fragment>
    )
}

export default connect(null, { createPost })(PostForm);