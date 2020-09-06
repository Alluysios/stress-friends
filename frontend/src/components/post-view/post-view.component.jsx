import React from 'react';
import image from './happy.jpg';
import { Link } from 'react-router-dom';

import './post-view.styles.scss';

import CommentItem from '../comment-item/comment-item.component';

const PostView = () => {
    return (
        <div className='post'>
            <Link to='/' className='back-btn'>&larr; Back</Link>
            <div className="post-box">
                <img src={image} alt="Sanoke image" className="post-image"/>
            </div>
            <div className="post-box-2">
                <div className="post-user">
                    <img src="/me.jpg" alt="post user image" className='post-user-image' />
                    <div>
                        <div className="post-user-name">Alluysios Arriba</div>
                        <div className="post-user-date">Posted: January 19, 1997</div>
                    </div>
                    <p className='post-user-content'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora distinctio, aliquid in eveniet ex ipsa, excepturi necessitatibus nobis reprehenderit mollitia fugit facere exercitationem.
                    </p>
                </div>
                <div className="post-comments">
                    <CommentItem />
                </div>
            </div>
        </div>
    )
}

export default PostView;
