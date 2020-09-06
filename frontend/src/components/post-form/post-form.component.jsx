import React, { Fragment } from 'react';
import './post-form.styles.scss';

const PostForm = () => {
    return (
        <Fragment>
            <form className='form'>
                <div className="form-group-container">
                    <textarea name="content" id="content" className="content" placeholder="Write something..."></textarea>
                    <div className="group-buttons">
                        <input type="file" name='image' className='file' />
                        <input type="button" value="Post" className='button' />
                    </div>
                </div>
            </form>  
        </Fragment>
    )
}

export default PostForm;